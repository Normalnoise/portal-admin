<template>
  <el-container class="app">
    <Sidebar />
    <el-container direction="vertical" class="content-area">
      <router-view :key="$route.fullPath"></router-view>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Sidebar
  }
}
</script>

<style>
.app {
  min-height: 100vh;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  background-color: #f9fafb;
}
</style> 