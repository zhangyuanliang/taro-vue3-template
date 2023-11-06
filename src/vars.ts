export const env = (function checkEnv() {
  const { platform } = wx?.getSystemInfoSync?.() || {}
  const { miniProgram } = wx?.getAccountInfoSync?.() || {}

  return {
    IS_IOS: 'ios' === platform,
    IS_ANDROID: 'android' === platform,
    IS_PC: ['mac', 'windows'].includes(platform),
    IS_DEVTOOLS: 'devtools' === platform,
    IS_RELEASE: miniProgram?.envVersion === 'release',
  }
})()

// 测试环境：https://spd-xcx.gate.bjknrt.com
// 正式环境：https://bi.dbhs.com.cn
export const BASE_URL = env.IS_RELEASE ? 'https://bi.dbhs.com.cn' : 'https://spd-xcx.gate.bjknrt.com'
export const API_URL = `${BASE_URL}`
export const UPLOAD_URL = `${API_URL}/upload`
export const TOKEN_KEY = 'TOKEN'
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN'
export const REQUEST_TIMEOUT = 2e4
export const CURRENT_HOSPITAL_KEY = 'CURRENT_HOSPITAL'
export const ALIYUN_URL = 'https://dbwebapp.oss-cn-beijing.aliyuncs.com'
export const APP_VERSION = 'v1.9.0'
