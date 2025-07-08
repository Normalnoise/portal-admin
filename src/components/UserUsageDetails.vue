<template>
  <div class="main-content" id="user-usage-details">
    <!-- Navigation Bar -->
    <div class="navbar">
      <h1>
        <router-link to="/dashboard" class="breadcrumb-link">Dashboard</router-link>
        <span class="breadcrumb-separator"> &gt; </span>
        <span class="breadcrumb-current">User Usage Details</span>
      </h1>
      <div class="admin-dropdown">
        ADMIN
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m6 8 4 4 4-4" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </svg>
      </div>
    </div>
    
    <!-- User Stats Summary -->
    <div class="metrics-section">
      <div class="metric-card">
        <div class="metric-title">Total Users</div>
        <div class="metric-value">152</div>
        <div class="metric-change positive">↑5%</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">Active Users</div>
        <div class="metric-value">87</div>
        <div class="metric-change positive">↑8%</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">Total Requests</div>
        <div class="metric-value">23,541</div>
        <div class="metric-change positive">↑15%</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">Avg Daily Requests</div>
        <div class="metric-value">789</div>
        <div class="metric-change positive">↑12%</div>
      </div>
    </div>
    
    <!-- Filter Area -->
    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-group">
          <span class="filter-label">User:</span>
          <div class="user-filter">
            <input 
              type="text" 
              class="user-input" 
              placeholder="Enter user ID or email" 
              v-model="userFilter"
            />
            <div class="dropdown-icon" @click="toggleUserDropdown">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m6 8 4 4 4-4" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
              </svg>
            </div>
            <div class="user-dropdown" v-if="showUserDropdown">
              <div class="dropdown-item" @click="selectUser('')">All Users</div>
              <div 
                class="dropdown-item" 
                v-for="user in uniqueUsers" 
                :key="user.email" 
                @click="selectUser(user.email)"
              >
                {{ user.email }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="filter-group">
          <span class="filter-label">Model:</span>
          <select class="dropdown">
            <option value="">All Models</option>
            <option v-for="model in modelOptions" :key="model" :value="model">{{ model }}</option>
          </select>
        </div>
        
        <div class="filter-group">
          <span class="filter-label">Date Range:</span>
          <div class="date-input-wrapper">
            <input type="date" class="date-input" v-model="startDate">
            <svg class="date-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 5V3m8 2V3m-9 4h10M5 7v8a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2z" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            </svg>
          </div>
          <span class="to-label">to</span>
          <div class="date-input-wrapper">
            <input type="date" class="date-input" v-model="endDate">
            <svg class="date-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 5V3m8 2V3m-9 4h10M5 7v8a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2z" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            </svg>
          </div>
        </div>
        
        <div class="filter-buttons">
          <button class="search-button">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 5px;">
              <path d="M8.5 3a5.5 5.5 0 0 1 4.383 8.823l4.147 4.147a.75.75 0 0 1-1.06 1.06l-4.147-4.147A5.5 5.5 0 1 1 8.5 3Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" fill="white"/>
            </svg>
            Search
          </button>
          <button class="reset-button">Reset</button>
        </div>
      </div>
    </div>
    
    <!-- User Usage Table -->
    <div class="user-table-wrapper">
      <table class="user-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Total Requests</th>
            <th>Total Tokens</th>
            <th>Most Used Models</th>
            <th>Last Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userList" :key="index">
            <td>{{ user.email }}</td>
            <td>{{ user.requests }}</td>
            <td>{{ user.tokens }}</td>
            <td>{{ user.models }}</td>
            <td>{{ user.lastActivity }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <div class="pagination-info">
          Showing 1-15 / Total 152
        </div>
        <div class="pagination-buttons">
          <button class="pagination-button" disabled>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4l-6 6 6 6" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <button class="pagination-button active">1</button>
          <button class="pagination-button">2</button>
          <button class="pagination-button">3</button>
          <span>...</span>
          <button class="pagination-button">10</button>
          
          <button class="pagination-button">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4l6 6-6 6" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <select class="dropdown" style="margin-left: 10px; width: 100px;">
            <option value="15">15/page</option>
            <option value="30">30/page</option>
            <option value="50">50/page</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- User Activity Charts -->
    <div class="charts-container">
      <div class="chart-row">
        <div class="chart-column">
          <h3 class="chart-title">Daily Active Users</h3>
          <div class="chart-container" ref="activeUsersChart">
            <!-- Chart will be rendered here -->
          </div>
        </div>
        
        <div class="chart-column">
          <h3 class="chart-title">Top 5 Users by Token Usage</h3>
          <div class="chart-container" ref="topUsersChart">
            <!-- Chart will be rendered here -->
          </div>
        </div>
      </div>
      
      <div class="chart-row">
        <div class="chart-column">
          <h3 class="chart-title">Model Popularity</h3>
          <div class="chart-container" ref="modelPopularityChart">
            <!-- Chart will be rendered here -->
          </div>
        </div>
        
        <div class="chart-column">
          <h3 class="chart-title">Hourly Usage Pattern</h3>
          <div class="chart-container" ref="hourlyUsageChart">
            <!-- Chart will be rendered here -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'UserUsageDetails',
  setup() {
    const startDate = ref('2023-01-01');
    const endDate = ref('2023-01-31');
    const userFilter = ref('');
    const showUserDropdown = ref(false);
    
    // User dropdown functions
    const toggleUserDropdown = () => {
      showUserDropdown.value = !showUserDropdown.value;
    };
    
    const selectUser = (email) => {
      userFilter.value = email;
      showUserDropdown.value = false;
    };
    
    // Chart references
    const activeUsersChart = ref(null);
    const topUsersChart = ref(null);
    const modelPopularityChart = ref(null);
    const hourlyUsageChart = ref(null);
    
    // Sample data
    const modelOptions = [
      'Llama-3',
      'Mistral',
      'Claude',
      'GPT-4',
      'DALL-E',
      'Stable Diffusion',
      'Midjourney'
    ];
    
    const uniqueUsers = [
      { email: 'user1@x.com' },
      { email: 'user2@x.com' },
      { email: 'user3@x.com' },
      { email: 'user4@x.com' },
      { email: 'user5@x.com' },
      { email: 'user6@x.com' },
      { email: 'user7@x.com' },
      { email: 'user8@x.com' },
      { email: 'user9@x.com' },
      { email: 'user10@x.com' }
    ];
    
    const userList = [
      { email: 'user1@x.com', requests: '534', tokens: '120K', models: 'Llama-3, Claude', lastActivity: '2023-01-30' },
      { email: 'user2@x.com', requests: '423', tokens: '98K', models: 'Mistral, GPT-4', lastActivity: '2023-01-30' },
      { email: 'user3@x.com', requests: '287', tokens: '76K', models: 'Llama-3', lastActivity: '2023-01-29' },
      { email: 'user4@x.com', requests: '198', tokens: '54K', models: 'Claude, DALL-E', lastActivity: '2023-01-28' },
      { email: 'user5@x.com', requests: '156', tokens: '42K', models: 'GPT-4, Mistral', lastActivity: '2023-01-30' },
      { email: 'user6@x.com', requests: '143', tokens: '38K', models: 'GPT-4', lastActivity: '2023-01-29' },
      { email: 'user7@x.com', requests: '128', tokens: '31K', models: 'Llama-3', lastActivity: '2023-01-27' },
      { email: 'user8@x.com', requests: '117', tokens: '28K', models: 'Mistral, DALL-E', lastActivity: '2023-01-29' },
      { email: 'user9@x.com', requests: '95', tokens: '22K', models: 'Claude', lastActivity: '2023-01-28' },
      { email: 'user10@x.com', requests: '82', tokens: '19K', models: 'GPT-4, Llama-3', lastActivity: '2023-01-26' },
      { email: 'user11@x.com', requests: '78', tokens: '18K', models: 'Mistral', lastActivity: '2023-01-30' },
      { email: 'user12@x.com', requests: '65', tokens: '15K', models: 'Llama-3', lastActivity: '2023-01-29' },
      { email: 'user13@x.com', requests: '59', tokens: '14K', models: 'DALL-E', lastActivity: '2023-01-28' },
      { email: 'user14@x.com', requests: '54', tokens: '13K', models: 'Mistral', lastActivity: '2023-01-27' },
      { email: 'user15@x.com', requests: '48', tokens: '11K', models: 'GPT-4', lastActivity: '2023-01-29' }
    ];
    
    // Initialize charts on component mount
    onMounted(() => {
      // 确保页面滚动到顶部
      window.scrollTo(0, 0);
      
      // 添加点击外部关闭下拉菜单的事件监听
      document.addEventListener('click', (event) => {
        const userFilterElement = document.querySelector('.user-filter');
        if (userFilterElement && !userFilterElement.contains(event.target)) {
          showUserDropdown.value = false;
        }
      });
      
      // Daily Active Users Chart
      const activeUsersCtx = activeUsersChart.value.getContext('2d');
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
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
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
      });
      
      // Top 5 Users by Token Usage Chart
      const topUsersCtx = topUsersChart.value.getContext('2d');
      new Chart(topUsersCtx, {
        type: 'bar',
        data: {
          labels: ['user1@x.com', 'user2@x.com', 'user3@x.com', 'user4@x.com', 'user5@x.com'],
          datasets: [
            {
              label: 'Token Usage (K)',
              data: [120, 98, 76, 54, 42],
              backgroundColor: '#4C6EF5'
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
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
      });
      
      // Model Popularity Chart
      const modelPopularityCtx = modelPopularityChart.value.getContext('2d');
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
      });
      
      // Hourly Usage Pattern Chart
      const hourlyUsageCtx = hourlyUsageChart.value.getContext('2d');
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
      });
    });
    
    return {
      startDate,
      endDate,
      modelOptions,
      uniqueUsers,
      userList,
      activeUsersChart,
      topUsersChart,
      modelPopularityChart,
      hourlyUsageChart,
      userFilter,
      showUserDropdown,
      toggleUserDropdown,
      selectUser
    };
  }
};
</script>

<style scoped>
.filter-section {
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
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

.filter-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
}

.filter-group {
  display: flex;
  align-items: center;
  margin-right: 0;
  margin-bottom: 0;
}

.filter-label {
  font-weight: 500;
  margin-right: 12px;
  color: #333;
  font-size: 16px;
}

.to-label {
  margin: 0 10px;
  font-size: 16px;
}

.date-input {
  padding: 10px 35px 10px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 150px;
  font-size: 14px;
  appearance: none;
  background-color: white;
}

.date-input-wrapper {
  position: relative;
  display: inline-block;
}

.date-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.dropdown {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 150px;
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 10px center;
  background-repeat: no-repeat;
  background-size: 16px 16px;
  padding-right: 35px;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  margin-left: auto;
}

.search-button {
  padding: 10px 20px;
  background-color: #3490dc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.search-button:hover {
  background-color: #2779bd;
}

.reset-button {
  padding: 10px 20px;
  background-color: #f1f5f9;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.reset-button:hover {
  background-color: #e2e8f0;
}

.metrics-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: #f9fafb;
}

.metric-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.metric-title {
  font-size: 16px;
  color: #64748b;
  margin-bottom: 10px;
}

.metric-value {
  font-size: 32px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.metric-change {
  font-size: 16px;
  font-weight: 500;
  color: #10b981;
}

.metric-change.positive {
  color: #10b981;
}

.metric-change.negative {
  color: #ef4444;
}

.user-table-wrapper {
  padding: 20px;
  background-color: white;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th {
  background-color: #f8fafc;
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
  color: #64748b;
}

.user-table td {
  padding: 12px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination-info {
  color: #64748b;
}

.pagination-buttons {
  display: flex;
  align-items: center;
}

.pagination-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  background-color: white;
  margin: 0 2px;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-button.active {
  background-color: #3490dc;
  color: white;
  border-color: #3490dc;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.charts-container {
  padding: 0 20px 20px;
}

.chart-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-column {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 15px;
}

.chart-container {
  height: 300px;
  position: relative;
}

.user-filter {
  position: relative;
  min-width: 200px;
}

.user-input {
  padding: 10px 35px 10px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  font-size: 14px;
}

.dropdown-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 2px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}
</style> 