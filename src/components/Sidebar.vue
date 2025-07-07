<template>
  <div class="sidebar">
    <div class="sidebar-logo">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 3L27 9.75V20.25L15 27L3 20.25V9.75L15 3Z" fill="white"/>
      </svg>
      <span style="margin-left: 10px; font-weight: bold; font-size: 16px;">NEBULA BLOCK</span>
    </div>
    
    <ul class="sidebar-menu">
      <li class="sidebar-menu-item" :class="{ active: $route.path === '/' }">
        <router-link to="/" class="sidebar-menu-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="white" stroke-width="2"/>
          </svg>
          <span>Overview</span>
        </router-link>
      </li>
      <li class="sidebar-menu-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8-2h4v2h-4V4z" stroke="white" stroke-width="2"/>
        </svg>
        <span>Job Postings</span>
      </li>
      <li class="sidebar-menu-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" stroke-width="2"/>
        </svg>
        <span>Promo Codes</span>
      </li>
      <li class="sidebar-menu-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" stroke-width="2"/>
        </svg>
        <span>User Groups</span>
      </li>
      <li class="sidebar-menu-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" stroke-width="2"/>
          <path d="M8 12h8M12 8v8" stroke="white" stroke-width="2"/>
        </svg>
        <span>Reserved Instances</span>
      </li>
      <li class="sidebar-menu-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 7h-9M14 17H5M20 12H5" stroke="white" stroke-width="2"/>
        </svg>
        <span>Vendor Product</span>
      </li>
      <li class="sidebar-menu-item" :class="{ active: $route.path === '/dashboard' }">
        <router-link to="/dashboard" class="sidebar-menu-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="9" rx="1" stroke="white" stroke-width="2"/>
            <rect x="3" y="15" width="7" height="6" rx="1" stroke="white" stroke-width="2"/>
            <rect x="14" y="3" width="7" height="6" rx="1" stroke="white" stroke-width="2"/>
            <rect x="14" y="12" width="7" height="9" rx="1" stroke="white" stroke-width="2"/>
          </svg>
          <span>Dashboard</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>
.sidebar-menu-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  width: 100%;
  gap: 10px;
}

.sidebar-menu-item.active .sidebar-menu-link {
  color: #4C6EF5;
  font-weight: bold;
}

.sidebar-menu-item.active svg path,
.sidebar-menu-item.active svg rect {
  stroke: #4C6EF5;
}
</style> 