import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/main.css'

// 引入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入页面组件
import OverviewPage from './components/OverviewPage.vue'
import UserDetailPage from './components/UserDetailPage.vue'
import Dashboard from './components/Dashboard.vue'
import UserUsageDetails from './components/UserUsageDetails.vue'

// 创建路由配置
const routes = [
  { path: '/', component: OverviewPage },
  { path: '/users/:id', component: UserDetailPage, props: true },
  { path: '/dashboard', component: Dashboard },
  { path: '/user-usage-details', component: UserUsageDetails }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  // 添加滚动行为配置
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // 如果有锚点，滚动到锚点位置
      return { 
        el: to.hash,
        top: 0,
        behavior: 'smooth'
      }
    } else if (savedPosition) {
      // 如果有保存的位置（如浏览器前进/后退），使用保存的位置
      return savedPosition
    } else {
      // 默认滚动到顶部
      return { top: 0 }
    }
  }
})

// 创建Vue应用实例并使用路由
const app = createApp(App)

// 注册Element Plus
app.use(ElementPlus)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.mount('#app') 