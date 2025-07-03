<template>
  <div class="main-content">
    <!-- 导航栏 -->
    <div class="navbar">
      <h1>OverView</h1>
      <div class="admin-dropdown">
        ADMIN
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m6 8 4 4 4-4" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </svg>
      </div>
    </div>
    
    <!-- 搜索部分 -->
    <div class="search-section">
      <span class="search-label">User:</span>
      <input type="text" class="search-input" placeholder="Search by username or email">
      
      <span class="search-label">Account Status:</span>
      <select class="dropdown">
        <option>All</option>
        <option>Active</option>
        <option>Suspended</option>
      </select>
      
      <button class="search-button">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 5px;">
          <path d="M8.5 3a5.5 5.5 0 0 1 4.383 8.823l4.147 4.147a.75.75 0 0 1-1.06 1.06l-4.147-4.147A5.5 5.5 0 1 1 8.5 3Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" fill="white"/>
        </svg>
        Search
      </button>
      
      <button class="clear-button">Clear</button>
    </div>
    
    <!-- 数据表格，调整列宽和对齐方式 -->
    <div class="data-table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Primary Email</th>
            <th>Register Time</th>
            <th>Current Credits</th>
            <th>Total Spend</th>
            <th>Total Deposit</th>
            <th>Running Instances</th>
            <th>Deleted Instances</th>
            <th>Token Usage</th>
            <th>Image Usage</th>
            <th>Total Storage</th>
            <th>Total Referrals</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.registerTime }}</td>
            <td>$ {{ user.currentCredits }}</td>
            <td class="green-text">$ {{ user.totalSpend }}</td>
            <td>$ {{ user.totalDeposit }}</td>
            <td>{{ user.runningInstances }}</td>
            <td>{{ user.deletedInstances }}</td>
            <td>{{ user.tokenUsage }}</td>
            <td>{{ user.imageUsage }}</td>
            <td>{{ user.totalStorage }}</td>
            <td>{{ user.totalReferrals }}</td>
            <td>
              <router-link :to="`/users/${index + 1}`" class="view-details-btn">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" fill="#3490dc"/>
                  <path d="M10 4C5.5 4 2 8 2 10c0 2 3.5 6 8 6s8-4 8-6c0-2-3.5-6-8-6z" stroke="#3490dc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                View
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- 分页，实现点击功能 -->
    <div class="pagination">
      <div class="pagination-info">
        Showing {{ startItem }}-{{ endItem }} / Total {{ totalItems }}
      </div>
      <div class="pagination-buttons">
        <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4l-6 6 6 6" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <button 
          v-for="page in visiblePageNumbers" 
          :key="page" 
          class="pagination-button" 
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        
        <span v-if="showEllipsis">...</span>
        
        <button 
          v-if="totalPages > 5" 
          class="pagination-button" 
          @click="goToPage(totalPages)"
        >
          {{ totalPages }}
        </button>
        
        <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4l6 6-6 6" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <select class="dropdown" style="margin-left: 10px; width: 100px;" v-model="itemsPerPage" @change="updateItemsPerPage">
          <option :value="5">5/page</option>
          <option :value="10">10/page</option>
          <option :value="20">20/page</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverviewPage',
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 239,
      allUsers: [
        {
          name: 'liang yiming',
          email: 'arisejosiah@gmail.com',
          registerTime: '2025-01-27 14:30:12',
          currentCredits: '-27,096.58',
          totalSpend: '37,757.21',
          totalDeposit: '0',
          runningInstances: 0,
          deletedInstances: 0,
          tokenUsage: 0,
          imageUsage: 0,
          totalStorage: '0 B',
          totalReferrals: 0
        },
        {
          name: '',
          email: 'super.eightwha@gmail.com',
          registerTime: '2025-01-30 05:34:17',
          currentCredits: '-2,587.58',
          totalSpend: '26,242.52',
          totalDeposit: '0',
          runningInstances: 1,
          deletedInstances: 0,
          tokenUsage: 0,
          imageUsage: 0,
          totalStorage: '0 B',
          totalReferrals: 0
        },
        {
          name: '',
          email: 'yiming.dev@gmail.com',
          registerTime: '2024-07-22 18:12:51',
          currentCredits: '982.83',
          totalSpend: '10,180.15',
          totalDeposit: '410',
          runningInstances: 0,
          deletedInstances: 18,
          tokenUsage: 4948,
          imageUsage: 7,
          totalStorage: '0 B',
          totalReferrals: 0
        },
        {
          name: 'Zihang Chen',
          email: 'zhchennbai@gmail.com',
          registerTime: '2025-04-14 19:25:36',
          currentCredits: '99,980.07',
          totalSpend: '3,662.81',
          totalDeposit: '0',
          runningInstances: 0,
          deletedInstances: 103,
          tokenUsage: 0,
          imageUsage: 0,
          totalStorage: '0 B',
          totalReferrals: 0
        },
        {
          name: '',
          email: 'test3@126.com',
          registerTime: '2025-01-30 03:42:45',
          currentCredits: '-823.88',
          totalSpend: '1,839.05',
          totalDeposit: '0',
          runningInstances: 0,
          deletedInstances: 0,
          tokenUsage: 23331,
          imageUsage: 0,
          totalStorage: '0 B',
          totalReferrals: 0
        }
      ]
    };
  },
  computed: {
    // 计算总页数
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    
    // 当前显示的用户数据
    users() {
      return this.allUsers.slice(0, this.itemsPerPage);
    },
    
    // 计算显示的页码按钮
    visiblePageNumbers() {
      if (this.totalPages <= 5) {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
      }
      
      // 当当前页靠近开始时
      if (this.currentPage <= 3) {
        return [1, 2, 3, 4];
      }
      
      // 当当前页靠近结束时
      if (this.currentPage > this.totalPages - 3) {
        return Array.from(
          { length: 4 },
          (_, i) => this.totalPages - 3 + i
        );
      }
      
      // 当当前页在中间时
      return [
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        this.currentPage + 2
      ];
    },
    
    // 是否显示省略号
    showEllipsis() {
      return this.totalPages > 5;
    },
    
    // 当前显示的起始项
    startItem() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    
    // 当前显示的结束项
    endItem() {
      const end = this.currentPage * this.itemsPerPage;
      return end > this.totalItems ? this.totalItems : end;
    }
  },
  methods: {
    // 前往指定页
    goToPage(page) {
      this.currentPage = page;
    },
    
    // 前往上一页
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    
    // 前往下一页
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    
    // 更新每页显示的数量
    updateItemsPerPage() {
      this.currentPage = 1; // 重置到第一页
    }
  }
}
</script>

<style scoped>
.view-details-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 4px;
  background-color: #f0f9ff;
  color: #3490dc;
  text-decoration: none;
  font-size: 14px;
  border: 1px solid #e6f2fb;
}
.view-details-btn:hover {
  background-color: #e6f2fb;
}
</style> 