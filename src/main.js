import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'

const app = createApp(App)

// 注册全局组件和插件
app.use(router)
app.use(pinia)
app.use(ElementPlus)

// 初始化应用
app.mount('#app')
