import { request, addInterceptor } from '@tarojs/taro'
import { useUserStore, useAppStore } from '@/store'
import { jwtInterceptor } from './interceptor'
import { TOKEN_KEY, REFRESH_TOKEN_KEY, API_URL, REQUEST_TIMEOUT } from '@/vars'
import { showToast, removeToken } from '@/utils'

function isTimeout(resp) {
  return resp?.errMsg === 'request:fail timeout'
}

function isApi401(resp) {
  return resp?.code === 401
}

function isApi500(resp) {
  return typeof resp?.errMsg === 'string' && resp.errMsg.trim() === 'request:fail'
}

addInterceptor(jwtInterceptor)

let refreshed = {}
let afterRefreshHook = {} // { token: [hook1, hook2] }

export function refreshToken(token) {
  return new Promise((resolve) => {
    const fallback = () => {
      removeToken()
      resolve()
    }

    try {
      const refresh = wx.getStorageSync(REFRESH_TOKEN_KEY)

      if (refresh) {
        if (token !== undefined) {
          // token is refreshed
          if (refreshed[token]) {
            return resolve(refreshed[token])
          } else if (Object.values(refreshed).indexOf(token) > -1) {
            return resolve(token)
          }
          // store after refresh hooks
          if (Array.isArray(afterRefreshHook[token])) {
            return afterRefreshHook[token].push((refreshedToken) => resolve(refreshedToken))
          }
          // first refreshed
          afterRefreshHook[token] = []
        }

        return request({
          url: `${API_URL}/refresh_token`,
          method: 'GET',
          timeout: REQUEST_TIMEOUT,
          data: { token: refresh },
          success({ data, statusCode }) {
            if (statusCode === 200 && data?.code === 200) {
              const { token: newToken, refresh_token } = data.data || {}
              let hook

              if (newToken) wx.setStorageSync(TOKEN_KEY, newToken)
              if (refresh_token) wx.setStorageSync(REFRESH_TOKEN_KEY, refresh_token)
              if (Array.isArray(afterRefreshHook[token])) {
                while ((hook = afterRefreshHook[token].shift())) hook(newToken)
                delete afterRefreshHook[token]
              }

              return resolve((refreshed[token] = newToken))
            }
            fallback()
          },
          fail: fallback,
        })
      }
    } catch (err) {}

    fallback()
  })
}

function resolveCallback(resolve) {
  return ({ data, statusCode }) => {
    if (statusCode === 200) {
      if (data?.code === 200) {
        return resolve(data.data)
      } else if (isApi401(data)) {
        removeToken()
      } else if (data?.code === -2) {
        return resolve(data)
      } else if (data?.msg) {
        showToast(data.msg)
        resolve(false)
      }
    }
    resolve()
  }
}

let rejectCallbackCount = 0

const tracker = (actionType, error = {}) => {
  // const store = useUserStore()

  try {
    error = JSON.stringify(error)
  } catch (e) {}

  // track({
  //   actionType,
  //   error,
  //   user_id: store.userInfo?.id
  // })

  wx.hideLoading()
}

function rejectCallback(resolve) {
  return (errResp) => {
    if (isApi500(errResp) || rejectCallbackCount > 5) {
      tracker('api500', errResp)
      rejectCallbackCount = 0
      return wx.showToast({
        title: '服务维护中',
        icon: 'error',
        duration: 1e6,
        mask: true,
      })
    }
    if (isTimeout(errResp)) {
      resolve({ code: 'time_out', msg: '请求超时' })
      // tracker('timeout', errResp)
      // return wx.showModal({
      //   content: '当前网络不佳，是否重新加载',
      //   showCancel: false,
      //   success(resp) {
      //     rejectCallbackCount += 1
      //     if (resp.confirm) {
      //       reload() || resolve()
      //     }
      //   },
      // })
    }
    resolve()
  }
}

export function get(url, data, header = {}, withCredentials = true) {
  return new Promise((resolve) => {
    request({
      url: url.indexOf('http') === 0 ? url : API_URL + url,
      method: 'GET',
      timeout: REQUEST_TIMEOUT,
      data,
      header,
    })
      .then(resolveCallback(resolve))
      .catch(rejectCallback(resolve))
  })
}

export function post(url, data, queryParams = {}, header = {}, timeout) {
  return new Promise((resolve) => {
    if (queryParams) {
      const params = []

      Object.keys(queryParams).forEach((key) => params.push([key, encodeURIComponent(queryParams[key])].join('=')))

      if (params.length) {
        url = `${url}?${params.join('&')}`
      }
    }

    request({
      url: url.indexOf('http') === 0 ? url : API_URL + url,
      method: 'POST',
      timeout: timeout || REQUEST_TIMEOUT,
      data,
      header,
    })
      .then(resolveCallback(resolve))
      .catch(rejectCallback(resolve))
  })
}
