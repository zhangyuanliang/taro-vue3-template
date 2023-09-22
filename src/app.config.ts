export default defineAppConfig({
  pages: ['pages/home/index', 'pages/message/index', 'pages/mine/index', 'pages/product/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    custom: true,
    color: '#B4B5B7',
    selectedColor: '#FB750D',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        selectedIconPath: '/assets/icon/home-a.png',
        iconPath: '/assets/icon/home.png',
        text: '首页',
      },
      {
        pagePath: 'pages/product/index',
        selectedIconPath: '/assets/icon/product-a.png',
        iconPath: '/assets/icon/product.png',
        text: '产品',
      },
      {
        pagePath: 'pages/message/index',
        selectedIconPath: '/assets/icon/message-a.png',
        iconPath: '/assets/icon/message.png',
        text: '消息',
      },
      {
        pagePath: 'pages/mine/index',
        selectedIconPath: '/assets/icon/mine-a.png',
        iconPath: '/assets/icon/mine.png',
        text: '我的',
      },
    ],
  },
})
