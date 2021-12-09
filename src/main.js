import { createApp } from 'vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)

app.use(router).use(store).mount('#app')

// 注册全局组件
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key])
})
