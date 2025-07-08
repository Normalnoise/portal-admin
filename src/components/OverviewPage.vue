<template>
  <div class="main-content">
    <!-- 导航栏 -->
    <div class="navbar">
      <h1>OverView</h1>
      <el-dropdown>
        <span class="el-dropdown-link">
          ADMIN
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    
    <!-- 搜索部分 -->
    <el-card class="search-card" shadow="hover">
      <div class="filter-row">
        <div class="filter-item">
          <span class="filter-label">User:</span>
          <el-input 
            v-model="searchUser" 
            placeholder="Search by username or email" 
            clearable
            style="width: 220px"
          ></el-input>
        </div>
        
        <div class="filter-item">
          <span class="filter-label">Account Status:</span>
          <el-select 
            v-model="accountStatus" 
            placeholder="All" 
            style="width: 120px"
          >
            <el-option label="All" value=""></el-option>
            <el-option label="Active" value="active"></el-option>
            <el-option label="Suspended" value="suspended"></el-option>
          </el-select>
        </div>
        
        <div class="filter-buttons">
          <el-button type="primary" @click="handleSearch">
            <el-icon><search /></el-icon>
            Search
          </el-button>
          <el-button @click="handleClear" plain>Clear</el-button>
          
          <el-button link type="primary">
            <el-icon><plus /></el-icon>
            Advanced Options
          </el-button>
        </div>
      </div>
    </el-card>
    
    <!-- 数据表格 -->
    <el-card class="table-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">User List</span>
          <div>
            <el-button type="primary" size="small" plain>
              <el-icon><plus /></el-icon>
              Add User
            </el-button>
            <el-button type="success" size="small" plain>
              <el-icon><download /></el-icon>
              Export Data
            </el-button>
          </div>
        </div>
      </template>
      <el-table
        :data="users"
        style="width: 100%"
        :border="true"
        stripe
        highlight-current-row
      >
        <el-table-column prop="name" label="User Name" min-width="120">
          <template #default="{ row, $index }">
            <el-link type="primary" :underline="false" :href="`#/users/${$index + 1}`">
              {{ row.name || row.email }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="Primary Email" min-width="150"></el-table-column>
        <el-table-column prop="registerTime" label="Register Time" min-width="150"></el-table-column>
        <el-table-column prop="currentCredits" label="Current Credits" min-width="130">
          <template #default="{ row }">
            $ {{ row.currentCredits }}
          </template>
        </el-table-column>
        <el-table-column prop="totalSpend" label="Total Spend" min-width="120">
          <template #default="{ row }">
            <span class="green-text">$ {{ row.totalSpend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalDeposit" label="Total Deposit" min-width="120">
          <template #default="{ row }">
            $ {{ row.totalDeposit }}
          </template>
        </el-table-column>
        <el-table-column prop="runningInstances" label="Running Instances" min-width="130"></el-table-column>
        <el-table-column prop="deletedInstances" label="Deleted Instances" min-width="130"></el-table-column>
        <el-table-column prop="tokenUsage" label="Token Usage" min-width="100"></el-table-column>
        <el-table-column prop="imageUsage" label="Image Usage" min-width="100"></el-table-column>
        <el-table-column prop="totalStorage" label="Total Storage" min-width="100"></el-table-column>
        <el-table-column prop="totalReferrals" label="Total Referrals" min-width="120"></el-table-column>
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default>
            <el-button link type="primary" size="small">查看</el-button>
            <el-button link type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="itemsPerPage"
          :page-sizes="[5, 10, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalItems"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'OverviewPage',
  data() {
    return {
      searchUser: '',
      accountStatus: '',
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
    // 当前显示的用户数据
    users() {
      return this.allUsers.slice(0, this.itemsPerPage);
    }
  },
  methods: {
    handleSearch() {
      // 实现搜索逻辑
      console.log('搜索:', this.searchUser, this.accountStatus);
    },
    handleClear() {
      this.searchUser = '';
      this.accountStatus = '';
    },
    handleSizeChange(val) {
      this.itemsPerPage = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
}
</script>

<style scoped>
.main-content {
  padding: 20px;
  background-color: #f5f7fa;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 20px 0;
  height: 70px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
}

.navbar h1 {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

.el-dropdown-link {
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.search-card {
  margin-bottom: 20px;
  border-radius: 8px;
  padding: 8px 0;
}

.filter-row {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 20px;
}

.filter-item {
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: 8px;
}

.filter-label {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.filter-buttons {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

.table-card {
  border-radius: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.green-text {
  color: #34d399;
}

.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

:deep(.el-table th) {
  background-color: #f5f7fa;
  font-weight: 600;
  color: #606266;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #409EFF;
}

:deep(.el-card__body) {
  padding: 15px 20px;
}
</style>