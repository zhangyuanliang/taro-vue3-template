import { createApp } from 'vue'
import store from './store'
import './app.less'
import { appUpdate } from '@/utils'

const App = createApp({
  onShow(options) {
    // 检测更新
    appUpdate()
  },
})

App.use(store)

export default App
