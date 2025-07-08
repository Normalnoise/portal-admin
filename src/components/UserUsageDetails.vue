<template>
  <div class="main-content" id="user-usage-details">
    <!-- Navigation Bar -->
    <div class="navbar">
      <h1>
        <router-link to="/dashboard" class="breadcrumb-link">Dashboard</router-link>
        <span class="breadcrumb-separator"> &gt; </span>
        <span class="breadcrumb-current">User Usage Details</span>
      </h1>
      <el-dropdown>
        <span class="el-dropdown-link">
          ADMIN
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Profile</el-dropdown-item>
            <el-dropdown-item>Settings</el-dropdown-item>
            <el-dropdown-item divided>Sign Out</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    
    <!-- User Stats Summary -->
    <el-row :gutter="20" class="metrics-row">
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="metric-card" shadow="hover">
          <div class="metric-header">
            <span class="metric-title">Total Users</span>
          </div>
          <div class="metric-value">152</div>
          <div class="metric-change positive">
            <el-icon><top /></el-icon>
            5%
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="metric-card" shadow="hover">
          <div class="metric-header">
            <span class="metric-title">Active Users</span>
          </div>
          <div class="metric-value">87</div>
          <div class="metric-change positive">
            <el-icon><top /></el-icon>
            8%
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="metric-card" shadow="hover">
          <div class="metric-header">
            <span class="metric-title">Total Requests</span>
          </div>
          <div class="metric-value">23,541</div>
          <div class="metric-change positive">
            <el-icon><top /></el-icon>
            15%
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="metric-card" shadow="hover">
          <div class="metric-header">
            <span class="metric-title">Avg Daily Requests</span>
          </div>
          <div class="metric-value">789</div>
          <div class="metric-change positive">
            <el-icon><top /></el-icon>
            12%
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- Filter Area -->
    <el-card class="filter-card" shadow="hover">
      <div class="filter-row">
        <div class="filter-item">
          <span class="filter-label">User:</span>
          <el-select 
            v-model="userFilter" 
            filterable 
            clearable 
            placeholder="Enter user ID or email"
            style="width: 200px"
          >
            <el-option 
              v-for="user in sampleData" 
              :key="user.email" 
              :label="user.email" 
              :value="user.email"
            />
          </el-select>
        </div>
        
        <div class="filter-item">
          <span class="filter-label">Model:</span>
          <el-select 
            v-model="modelFilter" 
            placeholder="All Models" 
            clearable
            style="width: 150px"
          >
            <el-option label="All Models" value=""></el-option>
            <el-option 
              v-for="model in modelOptions" 
              :key="model" 
              :label="model" 
              :value="model"
            />
          </el-select>
        </div>
        
        <div class="filter-item">
          <span class="filter-label">Date Range:</span>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="to"
            start-placeholder="Start date"
            end-placeholder="End date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 290px"
          />
        </div>
        
        <div class="filter-buttons">
          <el-button type="primary" @click="handleSearch">
            <el-icon><search /></el-icon>
            Search
          </el-button>
          <el-button @click="handleReset" plain>Reset</el-button>
        </div>
      </div>
    </el-card>
    
    <!-- User Usage Table -->
    <el-card class="table-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="card-title">User Usage Details</span>
          <span class="data-info">Showing {{ sampleData.length }} users</span>
        </div>
      </template>
      
      <el-table 
        :data="sampleData" 
        style="width: 100%" 
        stripe 
        :border="true"
        highlight-current-row
      >
        <el-table-column prop="email" label="User" width="180" />
        <el-table-column prop="successRequests" label="Success Requests">
          <template #default="{ row }">
            <span class="success-text">{{ row.successRequests }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="failedRequests" label="Failed Requests">
          <template #default="{ row }">
            <span class="failed-text">{{ row.failedRequests }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tokens" label="Tokens" />
        <el-table-column prop="avgResponse" label="Avg Response" />
        <el-table-column prop="models" label="Models" />
      </el-table>
      
      <div class="pagination-wrapper">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:pageSize="pageSize"
          :page-sizes="[5, 10, 15, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="sampleData.length"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- User Activity Charts -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">Daily Active Users</span>
            </div>
          </template>
          <div class="chart-container" ref="activeUsersChart"></div>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">Top 5 Users by Token Usage</span>
            </div>
          </template>
          <div class="chart-container" ref="topUsersChart"></div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">Model Popularity</span>
            </div>
          </template>
          <div class="chart-container" ref="modelPopularityChart"></div>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">Hourly Usage Pattern</span>
            </div>
          </template>
          <div class="chart-container" ref="hourlyUsageChart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

export default {
  name: 'UserUsageDetails',
  setup() {
    // 基础状态
    const userFilter = ref('')
    const modelFilter = ref('')
    const dateRange = ref(['2023-01-01', '2023-01-31'])
    const currentPage = ref(1)
    const pageSize = ref(10)
    
    // 图表引用
    const activeUsersChart = ref(null)
    const topUsersChart = ref(null)
    const modelPopularityChart = ref(null)
    const hourlyUsageChart = ref(null)
    
    // 模型选项
    const modelOptions = [
      'Llama-3',
      'Mistral',
      'Claude',
      'GPT-4',
      'DALL-E',
      'Stable Diffusion',
      'Midjourney'
    ]
    
    // 示例数据 - 使用更有代表性的数据
    const sampleData = [
      { email: 'john.doe@example.com', successRequests: '1,234', failedRequests: '12', tokens: '150K', avgResponse: '220ms', models: 'GPT-4, Claude', lastActivity: '2023-01-30' },
      { email: 'alice.smith@example.com', successRequests: '987', failedRequests: '8', tokens: '120K', avgResponse: '185ms', models: 'Llama-3', lastActivity: '2023-01-30' },
      { email: 'bob.wilson@example.com', successRequests: '756', failedRequests: '15', tokens: '98K', avgResponse: '245ms', models: 'Mistral', lastActivity: '2023-01-29' },
      { email: 'emma.brown@example.com', successRequests: '543', failedRequests: '5', tokens: '76K', avgResponse: '195ms', models: 'Claude', lastActivity: '2023-01-28' },
      { email: 'james.miller@example.com', successRequests: '432', failedRequests: '7', tokens: '65K', avgResponse: '210ms', models: 'GPT-4', lastActivity: '2023-01-27' },
      { email: 'sophia.jones@example.com', successRequests: '398', failedRequests: '9', tokens: '58K', avgResponse: '230ms', models: 'Llama-3', lastActivity: '2023-01-30' },
      { email: 'william.davis@example.com', successRequests: '345', failedRequests: '6', tokens: '52K', avgResponse: '200ms', models: 'Mistral', lastActivity: '2023-01-29' },
      { email: 'olivia.taylor@example.com', successRequests: '312', failedRequests: '4', tokens: '45K', avgResponse: '175ms', models: 'Claude', lastActivity: '2023-01-28' },
      { email: 'noah.thomas@example.com', successRequests: '287', failedRequests: '10', tokens: '38K', avgResponse: '225ms', models: 'DALL-E', lastActivity: '2023-01-27' },
      { email: 'ava.roberts@example.com', successRequests: '256', failedRequests: '3', tokens: '32K', avgResponse: '190ms', models: 'GPT-4', lastActivity: '2023-01-30' }
    ]
    
    // 方法
    const handleSearch = () => {
      console.log('Search with:', {
        user: userFilter.value,
        model: modelFilter.value,
        dateRange: dateRange.value
      })
      // 重置到第一页
      currentPage.value = 1
    }
    
    const handleReset = () => {
      userFilter.value = ''
      modelFilter.value = ''
      dateRange.value = ['2023-01-01', '2023-01-31']
      // 重置到第一页
      currentPage.value = 1
    }
    
    const handleSizeChange = (val) => {
      pageSize.value = val
      currentPage.value = 1
    }
    
    const handleCurrentChange = (val) => {
      currentPage.value = val
    }
    
    // 在组件挂载时初始化图表
    onMounted(() => {
      // 确保页面滚动到顶部
      window.scrollTo(0, 0)
      
      // 初始化所有图表
      initCharts()
    })
    
    // 初始化图表的方法
    const initCharts = () => {
      // 每日活跃用户图表
      const activeUsersCtx = activeUsersChart.value.getContext('2d')
      new Chart(activeUsersCtx, {
        type: 'line',
        data: {
          labels: ['1/1', '1/5', '1/10', '1/15', '1/20', '1/25', '1/30'],
          datasets: [
            {
              label: 'Active Users',
              data: [65, 75, 85, 95, 90, 85, 95],
              borderColor: '#4C6EF5',
              backgroundColor: 'rgba(76, 110, 245, 0.1)',
              tension: 0.3,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              title: {
                display: true,
                text: 'Number of Users'
              },
              beginAtZero: true
            }
          }
        }
      })
      
      // 前5名用户按令牌使用量排序的图表
      const topUsersCtx = topUsersChart.value.getContext('2d')
      new Chart(topUsersCtx, {
        type: 'bar',
        data: {
          labels: sampleData.slice(0, 5).map(user => user.email),
          datasets: [
            {
              label: 'Token Usage (K)',
              data: sampleData.slice(0, 5).map(user => parseInt(user.tokens.replace('K', ''))),
              backgroundColor: '#4C6EF5'
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Tokens (K)'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      })
      
      // 模型流行度图表
      const modelPopularityCtx = modelPopularityChart.value.getContext('2d')
      new Chart(modelPopularityCtx, {
        type: 'bar',
        data: {
          labels: ['Llama-3', 'Mistral', 'GPT-4', 'Claude', 'DALL-E', 'Others'],
          datasets: [
            {
              label: 'Usage Percentage',
              data: [42, 25, 15, 10, 5, 3],
              backgroundColor: [
                '#4C6EF5',
                '#34D399',
                '#EC4899',
                '#F59E0B',
                '#8B5CF6',
                '#9CA3AF'
              ]
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Percentage (%)'
              }
            }
          }
        }
      })
      
      // 每小时使用模式图表
      const hourlyUsageCtx = hourlyUsageChart.value.getContext('2d')
      new Chart(hourlyUsageCtx, {
        type: 'bar',
        data: {
          labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
          datasets: [
            {
              label: 'Requests per Hour',
              data: [10, 5, 3, 2, 5, 15, 30, 45, 60, 75, 95, 85, 105, 120, 100, 90, 85, 75, 65, 55, 40, 30, 20, 15],
              backgroundColor: '#4C6EF5'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'Number of Requests'
              },
              beginAtZero: true
            },
            x: {
              title: {
                display: true,
                text: 'Hour of Day'
              }
            }
          }
        }
      })
    }
    
    return {
      userFilter,
      modelFilter,
      dateRange,
      currentPage,
      pageSize,
      sampleData,
      modelOptions,
      activeUsersChart,
      topUsersChart,
      modelPopularityChart,
      hourlyUsageChart,
      handleSearch,
      handleReset,
      handleSizeChange,
      handleCurrentChange
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
  margin-bottom: 20px;
  height: 70px;
  border-bottom: 1px solid #ebeef5;
  padding: 0 0 20px 0;
}

.navbar h1 {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
}

.breadcrumb-link {
  color: #3490dc;
  text-decoration: none;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #64748b;
}

.breadcrumb-current {
  color: #1e293b;
}

.el-dropdown-link {
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.metrics-row {
  margin-bottom: 20px;
}

.metric-card {
  height: 140px;
  border-radius: 8px;
  transition: all 0.3s;
}

.metric-card:hover {
  transform: translateY(-5px);
}

.metric-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.metric-title {
  font-size: 16px;
  font-weight: 500;
  margin-right: 5px;
  color: #606266;
}

.metric-value {
  font-size: 28px;
  font-weight: 600;
  margin: 10px 0;
  color: #303133;
}

.metric-change {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.positive {
  color: #34D399;
}

.negative {
  color: #F56C6C;
}

.filter-card {
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
  gap: 10px;
}

.table-card {
  margin-bottom: 20px;
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

.data-info {
  font-size: 14px;
  color: #909399;
}

.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.chart-row {
  margin-bottom: 20px;
}

.chart-card {
  border-radius: 8px;
}

.chart-container {
  height: 300px;
  margin-bottom: 10px;
  padding: 10px;
}

.success-text {
  color: #67C23A;
  font-weight: 500;
}

.failed-text {
  color: #F56C6C;
  font-weight: 500;
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