import { digitize, showTipsModal, get } from '@/utils'
import NP from 'number-precision'
import { useUserStore, useAppStore } from '@/store'
import { APP_VERSION } from '@/vars'

export function useCommon() {
  const computeHeight = (data, step = 50, max = 10) => {
    if (!data?.length) return 0
    if (data.length > max) {
      return 500
    } else {
      return step * data.length
    }
  }

  const parseAmountW = (amount) => {
    return digitize(NP.divide(amount || 0, 10000), 2)
  }

  const parseRatio = (ratio) => {
    if (ratio === undefined || ratio === null) return '--'
    return ratio > 0 ? `+${NP.times(ratio, 100)}%` : `${NP.times(ratio, 100)}%`
  }

  const getLastSysVersionInfo = () => {
    return new Promise((resolve, reject) => {
      get(`/supervision/sysVersion/getLastSysVersionInfo.do`, {
        hospitalId: useUserStore().hospital?.hospitalId,
      })
        .then((res) => {
          resolve(res)
        })
        .catch((res) => {
          reject()
        })
    })
  }

  return {
    computeHeight,
    parseAmountW,
    parseRatio,
  }
}
