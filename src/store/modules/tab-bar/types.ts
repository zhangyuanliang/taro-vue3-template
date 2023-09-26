export interface TabbarItem {
  pagePath: string
  selectedIconPath: string
  iconPath: string
  text: string
}

export interface TabbarState {
  activeTab: number
  tabVisible: boolean
  tabList: TabbarItem[]
}
