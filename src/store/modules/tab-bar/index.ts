import { defineStore } from 'pinia'
import type { TabbarState } from './types'

const useTabbarStore = defineStore('tabBar', {
  state: (): TabbarState => ({
    activeTab: 0,
    tabVisible: true,
    tabList: [
      {
        pagePath: '/pages/home/index',
        selectedIconPath: '/assets/icon/home-a.png',
        iconPath: '/assets/icon/home.png',
        text: '首页',
      },
      {
        pagePath: '/pages/product/index',
        selectedIconPath: '/assets/icon/product-a.png',
        iconPath: '/assets/icon/product.png',
        text: '产品',
      },
      {
        pagePath: '/pages/message/index',
        selectedIconPath: '/assets/icon/message-a.png',
        iconPath: '/assets/icon/message.png',
        text: '消息',
        isRedDot: false,
      },
      {
        pagePath: '/pages/mine/index',
        selectedIconPath: '/assets/icon/mine-a.png',
        iconPath: '/assets/icon/mine.png',
        text: '我的',
      },
    ],
  }),

  getters: {},

  actions: {
    setActiveTab(index: number) {
      this.activeTab = index
    },
    setTabVisible(visible: Boolean) {
      this.tabVisible = visible
    },
  },
})

export default useTabbarStore
