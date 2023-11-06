import { TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/vars'

export const removeToken = () => {
  wx.removeStorageSync(TOKEN_KEY)
  wx.removeStorageSync(REFRESH_TOKEN_KEY)
}

export const showModal = (content) => {
  wx.showModal({
    title: '温馨提示',
    content,
    showCancel: false,
  })
}

export const showToast = (title, icon = 'none', duration = 3e3) => {
  wx.showToast({
    title,
    icon,
    duration,
  })
}

export const appUpdate = () => {
  const updator = wx.getUpdateManager()
  if (updator) {
    updator.onCheckForUpdate(() => {})
    updator.onUpdateFailed(() => {})
    updator.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          res?.confirm && updator.applyUpdate()
        },
      })
    })
  }
}

export const vibrate = () => {
  wx.vibrateShort({
    type: 'medium',
    success: () => {},
    fail: () => {},
  })
}
