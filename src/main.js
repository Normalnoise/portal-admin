import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/main.css'

// 导入页面组件
import OverviewPage from './components/OverviewPage.vue'
import UserDetailPage from './components/UserDetailPage.vue'

// 创建路由配置
const routes = [
  { path: '/', component: OverviewPage },
  { path: '/users/:id', component: UserDetailPage, props: true }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 创建Vue应用实例并使用路由
const app = createApp(App)
app.use(router)
app.mount('#app') 