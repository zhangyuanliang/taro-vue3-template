import { refreshToken } from './request'
import { API_URL, TOKEN_KEY } from '@/vars'

function isRequest401(resp) {
  return resp?.statusCode === 401 || ~[4000, 4001, 4002].indexOf(resp?.data?.code)
}

export function jwtInterceptor(chain) {
  const { header = {}, ...requestParams } = chain.requestParams

  const token = wx.getStorageSync(TOKEN_KEY)

  if (token && !requestParams.url.startsWith(`${API_URL}/refresh_token`)) {
    header.Authorization = 'Bearer ' + token
  }

  return chain
    .proceed({
      ...requestParams,
      header,
    })
    .then(async (res) => {
      if (isRequest401(res)) {
        const newToken = await refreshToken(token)

        if (newToken) {
          header.Authorization = 'Bearer ' + newToken

          // retry once
          return chain.proceed({
            ...requestParams,
            header,
          })
        }
      } else if (res?.statusCode >= 500) {
        // go to 50x
        console.error(`500: ${res}`)
      }

      return res
    })
}

export function getHeaders() {
  return {
    Authorization: 'Bearer ' + wx.getStorageSync(TOKEN_KEY),
  }
}
