<template>
  <div class="sidebar">
    <div class="sidebar-logo">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 3L27 9.75V20.25L15 27L3 20.25V9.75L15 3Z" fill="white"/>
      </svg>
      <span style="margin-left: 10px; font-weight: bold; font-size: 16px;">NEBULA BLOCK</span>
    </div>
    
    <el-menu
      class="el-menu-vertical"
      background-color="#111"
      text-color="#fff"
      active-text-color="#4C6EF5"
      :default-active="activeIndex"
      router
    >
      <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon>
        <span>Overview</span>
      </el-menu-item>
      
      <el-menu-item index="/job-postings">
        <el-icon><Briefcase /></el-icon>
        <span>Job Postings</span>
      </el-menu-item>
      
      <el-menu-item index="/promo-codes">
        <el-icon><Tickets /></el-icon>
        <span>Promo Codes</span>
      </el-menu-item>
      
      <el-menu-item index="/user-groups">
        <el-icon><UserFilled /></el-icon>
        <span>User Groups</span>
      </el-menu-item>
      
      <el-menu-item index="/reserved-instances">
        <el-icon><Plus /></el-icon>
        <span>Reserved Instances</span>
      </el-menu-item>
      
      <el-menu-item index="/vendor-product">
        <el-icon><Operation /></el-icon>
        <span>Vendor Product</span>
      </el-menu-item>
      
      <el-menu-item index="/dashboard">
        <el-icon><Grid /></el-icon>
        <span>Dashboard</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Sidebar',
  setup() {
    const route = useRoute()
    
    const activeIndex = computed(() => {
      return route.path
    })
    
    return {
      activeIndex
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #111;
  color: white;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
}

.sidebar-logo {
  padding: 0 20px 30px;
  display: flex;
  align-items: center;
}

.el-menu {
  border-right: none;
}

.el-menu-vertical .el-menu-item {
  height: 50px;
  line-height: 50px;
}

:deep(.el-menu-item.is-active) {
  background-color: #232323;
}
</style> 