<template>
  <div class="app">
    <Sidebar />
    <div class="content-area">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
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
  display: flex;
  min-height: 100vh;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  background-color: #f9fafb;
}
</style> 