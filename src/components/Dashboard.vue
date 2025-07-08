<template>
  <div class="main-content">
    <!-- Navigation Bar -->
    <div class="navbar">
      <h1>Dashboard</h1>
      <div class="admin-dropdown">
        ADMIN
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m6 8 4 4 4-4" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </svg>
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
          <select class="dropdown dropdown-sm">
            <option value="">All Models</option>
            <option v-for="model in modelOptions" :key="model" :value="model">{{ model }}</option>
          </select>
        </div>
        
        <div class="filter-group">
          <span class="filter-label">Date Range:</span>
          <input type="date" class="date-input date-input-sm" v-model="startDate">
          <span class="to-label">to</span>
          <input type="date" class="date-input date-input-sm" v-model="endDate">
        </div>
        
        <div class="filter-group">
          <span class="filter-label">Time:</span>
          <select class="dropdown dropdown-sm">
            <option value="hourly">Hourly</option>
            <option value="daily" selected>Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
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
    
    <!-- Key Metrics -->
    <div class="metrics-section">
      <div class="metric-card">
        <div class="metric-title-center">
          Requests
          <span class="tooltip-icon">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
            </svg>
            <span class="tooltip-text">Total number of API calls to LLM services</span>
          </span>
        </div>
        <div class="requests-row">
          <div class="requests-column">
            <div class="metric-big-value success-text">1,148</div>
            <div class="metric-status">Success</div>
            <div class="metric-change positive">↑12%</div>
          </div>
          <div class="requests-divider"></div>
          <div class="requests-column">
            <div class="metric-big-value failed-text">86</div>
            <div class="metric-status">Failed</div>
            <div class="metric-change negative">↑5%</div>
          </div>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-title">
          Input Tokens
          <span class="tooltip-icon">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
            </svg>
            <span class="tooltip-text">Total tokens sent to models as prompts</span>
          </span>
        </div>
        <div class="metric-value">45.6K</div>
        <div class="metric-change positive">↑8%</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">
          Output Tokens
          <span class="tooltip-icon">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
            </svg>
            <span class="tooltip-text">Total tokens generated by models as responses</span>
          </span>
        </div>
        <div class="metric-value">78.9K</div>
        <div class="metric-change positive">↑15%</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">
          Avg Response
          <span class="tooltip-icon">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
            </svg>
            <span class="tooltip-text">Average response time in milliseconds</span>
          </span>
        </div>
        <div class="metric-value">235ms</div>
        <div class="metric-change negative">↓5%</div>
      </div>
    </div>
    
    <!-- Network-wide Model Usage Chart -->
    <div class="chart-section">
      <h3 class="chart-title">Network-wide Model Usage</h3>
      <div class="chart-container" ref="networkModelUsageChart">
        <!-- Chart will be rendered here -->
      </div>
      <div class="chart-legend">
        <div class="legend-item" v-for="(color, model) in modelColors" :key="model">
          <div class="legend-color" :style="{backgroundColor: color}"></div>
          <div class="legend-label">{{ model }}</div>
        </div>
      </div>
    </div>
    
    <!-- Trend Charts Row -->
    <div class="chart-row">
      <div class="chart-column">
        <h3 class="chart-title">LLM/VLM/Embedding Total Requests</h3>
        <div class="chart-container" ref="totalRequestsChart">
          <!-- Chart will be rendered here -->
        </div>
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-line llm"></div>
            <div class="legend-label">LLM</div>
          </div>
          <div class="legend-item">
            <div class="legend-line vlm"></div>
            <div class="legend-label">VLM</div>
          </div>
          <div class="legend-item">
            <div class="legend-line embedding"></div>
            <div class="legend-label">Embedding</div>
          </div>
        </div>
      </div>
      
      <div class="chart-column">
        <h3 class="chart-title">LLM/VLM/Embedding Total Tokens</h3>
        <div class="chart-container" ref="totalTokensChart">
          <!-- Chart will be rendered here -->
        </div>
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-line llm"></div>
            <div class="legend-label">LLM</div>
          </div>
          <div class="legend-item">
            <div class="legend-line vlm"></div>
            <div class="legend-label">VLM</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="chart-row">
      <div class="chart-column">
        <h3 class="chart-title">Image Models Total Requests</h3>
        <div class="chart-container" ref="imageRequestsChart">
          <!-- Chart will be rendered here -->
        </div>
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-line dalle"></div>
            <div class="legend-label">DALL-E</div>
          </div>
          <div class="legend-item">
            <div class="legend-line sd"></div>
            <div class="legend-label">SD</div>
          </div>
          <div class="legend-item">
            <div class="legend-line midjourney"></div>
            <div class="legend-label">Midjourney</div>
          </div>
        </div>
      </div>
      
      <div class="chart-column">
        <h3 class="chart-title">Model Distribution</h3>
        <div class="chart-container" ref="modelDistributionChart">
          <!-- Chart will be rendered here -->
        </div>
        <div class="pie-legend">
          <div class="legend-item" v-for="(percentage, model) in modelDistribution" :key="model">
            <div class="legend-label">{{ model }} {{ percentage }}%</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- User Usage Ranking -->
    <div class="ranking-section">
      <h3 class="section-title">User Usage Ranking</h3>
      <table class="ranking-table">
        <thead>
          <tr>
            <th>
              User
              <span class="table-tooltip" title="User email address">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
                </svg>
              </span>
            </th>
            <th>
              Requests(success|failed)
              <span class="table-tooltip" title="Number of successful and failed API requests">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
                </svg>
              </span>
            </th>
            <th>
              Tokens
              <span class="table-tooltip" title="Total token usage">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
                </svg>
              </span>
            </th>
            <th>
              Images
              <span class="table-tooltip" title="Number of generated images">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
                </svg>
              </span>
            </th>
            <th>
              Avg Response
              <span class="table-tooltip" title="Average response time in milliseconds">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
                </svg>
              </span>
            </th>
            <th>
              Models
              <span class="table-tooltip" title="Most frequently used models">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
                </svg>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in topUsers" :key="index">
            <td>{{ user.email }}</td>
            <td class="requests-simple">
              <span class="success-count">{{ user.successRequests }}</span>
              <span class="separator">|</span>
              <span class="failed-count">{{ user.failedRequests }}</span>
            </td>
            <td>{{ user.tokens }}</td>
            <td>{{ user.images }}</td>
            <td>{{ user.avgResponse }}</td>
            <td>{{ user.models }}</td>
          </tr>
        </tbody>
      </table>
      <div class="view-more">
        <router-link to="/user-usage-details#user-usage-details" class="view-more-button">View More</router-link>
      </div>
    </div>
    
    <!-- Detailed Data Table -->
    <div class="data-table-wrapper">
      <h3 class="section-title">Request Details</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>
              Timestamp
              <span class="table-tooltip" title="Date and time of the request">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
                </svg>
              </span>
            </th>
            <th>
              User
              <span class="table-tooltip" title="User email address">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
                </svg>
              </span>
            </th>
            <th>
              Model
              <span class="table-tooltip" title="AI model used for the request">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
                </svg>
              </span>
            </th>
            <th>
              Status
              <span class="table-tooltip" title="Request success or failure status">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
                </svg>
              </span>
            </th>
            <th>
              In-T
              <span class="table-tooltip" title="Input tokens used">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
                </svg>
              </span>
            </th>
            <th>
              Out-T
              <span class="table-tooltip" title="Output tokens generated">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
                </svg>
              </span>
            </th>
            <th>
              Images
              <span class="table-tooltip" title="Number of images generated">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
                </svg>
              </span>
            </th>
            <th>
              Response
              <span class="table-tooltip" title="Response time in milliseconds">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-9a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" fill="#64748b"/>
                </svg>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(call, index) in recentCalls" :key="index">
            <td>{{ call.timestamp }}</td>
            <td>{{ call.user }}</td>
            <td>{{ call.model }}</td>
            <td :class="call.status === 'Success' ? 'success-text' : 'failed-text'">{{ call.status }}</td>
            <td>{{ call.inputTokens }}</td>
            <td>{{ call.outputTokens }}</td>
            <td>{{ call.images }}</td>
            <td>{{ call.response }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <div class="pagination-info">
          Showing 1-5 / Total 247
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
            <option value="10">10/page</option>
            <option value="20">20/page</option>
            <option value="50">50/page</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'Dashboard',
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
    const networkModelUsageChart = ref(null);
    const totalRequestsChart = ref(null);
    const totalTokensChart = ref(null);
    const imageRequestsChart = ref(null);
    const modelDistributionChart = ref(null);
    
    // Time labels for charts
    const timeLabels = Array.from({ length: 15 }, (_, i) => `1/${i * 2 + 1}`);
    
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
    
    const modelColors = {
      'Llama-3': '#4C6EF5',
      'Mistral': '#34D399',
      'Claude': '#F59E0B',
      'GPT-4': '#EC4899',
      'Others': '#9CA3AF'
    };
    
    const modelDistribution = {
      'Llama-3': 40,
      'Mistral': 25,
      'Claude': 15,
      'GPT-4': 12,
      'Others': 8
    };
    
    const uniqueUsers = [
      { email: 'user1@x.com' },
      { email: 'user2@x.com' },
      { email: 'user3@x.com' },
      { email: 'user4@x.com' },
      { email: 'user5@x.com' }
    ];
    
    const topUsers = [
      { email: 'user1@x.com', successRequests: '498', failedRequests: '36', tokens: '120K', images: '15', avgResponse: '220ms', models: 'Llama-3, Claude' },
      { email: 'user2@x.com', successRequests: '401', failedRequests: '22', tokens: '98K', images: '8', avgResponse: '185ms', models: 'Mistral, GPT-4' },
      { email: 'user3@x.com', successRequests: '264', failedRequests: '23', tokens: '76K', images: '0', avgResponse: '245ms', models: 'Llama-3' },
      { email: 'user4@x.com', successRequests: '182', failedRequests: '16', tokens: '54K', images: '21', avgResponse: '195ms', models: 'Claude, DALL-E' },
      { email: 'user5@x.com', successRequests: '147', failedRequests: '9', tokens: '42K', images: '5', avgResponse: '235ms', models: 'GPT-4, Mistral' },
      { email: 'user6@x.com', successRequests: '130', failedRequests: '15', tokens: '39K', images: '0', avgResponse: '210ms', models: 'Llama-3' },
      { email: 'user7@x.com', successRequests: '115', failedRequests: '17', tokens: '35K', images: '2', avgResponse: '200ms', models: 'Mistral' },
      { email: 'user8@x.com', successRequests: '101', failedRequests: '9', tokens: '31K', images: '0', avgResponse: '255ms', models: 'Claude' },
      { email: 'user9@x.com', successRequests: '92', failedRequests: '6', tokens: '28K', images: '4', avgResponse: '190ms', models: 'GPT-4' },
      { email: 'user10@x.com', successRequests: '78', failedRequests: '7', tokens: '25K', images: '12', avgResponse: '225ms', models: 'DALL-E' }
    ];
    
    const recentCalls = [
      { timestamp: '2023-01-30 14:25:36', user: 'user1@x.com', model: 'Llama-3', status: 'Success', inputTokens: '256', outputTokens: '512', images: '0', response: '210ms' },
      { timestamp: '2023-01-30 12:18:45', user: 'user3@x.com', model: 'Mistral', status: 'Success', inputTokens: '128', outputTokens: '346', images: '0', response: '185ms' },
      { timestamp: '2023-01-30 11:02:19', user: 'user2@x.com', model: 'Llama-3', status: 'Failed', inputTokens: '512', outputTokens: '0', images: '0', response: '245ms' },
      { timestamp: '2023-01-30 10:45:30', user: 'user5@x.com', model: 'Claude', status: 'Success', inputTokens: '345', outputTokens: '678', images: '0', response: '312ms' },
      { timestamp: '2023-01-29 23:15:11', user: 'user4@x.com', model: 'Mistral', status: 'Success', inputTokens: '256', outputTokens: '489', images: '0', response: '205ms' },
      { timestamp: '2023-01-29 20:32:51', user: 'user6@x.com', model: 'GPT-4', status: 'Success', inputTokens: '1024', outputTokens: '2048', images: '0', response: '350ms' },
      { timestamp: '2023-01-29 18:42:07', user: 'user7@x.com', model: 'DALL-E', status: 'Failed', inputTokens: '50', outputTokens: '0', images: '1', response: '500ms' },
      { timestamp: '2023-01-28 16:20:33', user: 'user1@x.com', model: 'Claude', status: 'Success', inputTokens: '400', outputTokens: '800', images: '0', response: '280ms' },
      { timestamp: '2023-01-28 15:10:26', user: 'user8@x.com', model: 'Llama-3', status: 'Success', inputTokens: '300', outputTokens: '600', images: '0', response: '220ms' },
      { timestamp: '2023-01-27 09:55:14', user: 'user9@x.com', model: 'Mistral', status: 'Success', inputTokens: '200', outputTokens: '400', images: '0', response: '190ms' }
    ];
    
    // Initialize charts on component mount
    onMounted(() => {
      document.addEventListener('click', (event) => {
        const userFilterElement = document.querySelector('.user-filter');
        if (userFilterElement && !userFilterElement.contains(event.target)) {
          showUserDropdown.value = false;
        }
      });
      
      // 确保DOM元素已经加载完成
      setTimeout(() => {
        try {
          console.log("开始初始化图表");
          
          // Network-wide Model Usage (Stacked Bar Chart)
          if (networkModelUsageChart.value) {
            console.log("初始化 Network-wide Model Usage 图表");
            const networkModelUsageCtx = networkModelUsageChart.value.getContext('2d');
            new Chart(networkModelUsageCtx, {
              type: 'bar',
              data: {
                labels: timeLabels,
                datasets: [
                  {
                    label: 'Llama-3',
                    data: [45, 52, 49, 60, 55, 58, 62, 65, 59, 63, 68, 64, 70, 67, 72],
                    backgroundColor: modelColors['Llama-3'],
                  },
                  {
                    label: 'Mistral',
                    data: [25, 30, 28, 32, 29, 31, 35, 33, 36, 34, 38, 36, 39, 37, 40],
                    backgroundColor: modelColors['Mistral'],
                  },
                  {
                    label: 'Claude',
                    data: [15, 18, 16, 20, 18, 17, 19, 21, 20, 22, 19, 23, 21, 24, 22],
                    backgroundColor: modelColors['Claude'],
                  },
                  {
                    label: 'GPT-4',
                    data: [10, 12, 11, 13, 12, 14, 15, 14, 16, 15, 17, 16, 18, 17, 19],
                    backgroundColor: modelColors['GPT-4'],
                  },
                  {
                    label: 'Others',
                    data: [5, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12, 11],
                    backgroundColor: modelColors['Others'],
                  }
                ]
              },
              options: {
                plugins: {
                  legend: {
                    display: false
                  },
                  title: {
                    display: false
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false
                  }
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    stacked: true,
                    title: {
                      display: true,
                      text: 'Date'
                    }
                  },
                  y: {
                    stacked: true,
                    title: {
                      display: true,
                      text: 'Number of Requests'
                    }
                  }
                }
              }
            });
          } else {
            console.error("Network-wide Model Usage 图表元素不存在");
          }
          
          // LLM/VLM/Embedding Total Requests
          if (totalRequestsChart.value) {
            console.log("初始化 LLM/VLM/Embedding Total Requests 图表");
            const totalRequestsCtx = totalRequestsChart.value.getContext('2d');
            new Chart(totalRequestsCtx, {
              type: 'bar',
              data: {
                labels: timeLabels,
                datasets: [
                  {
                    label: 'LLM',
                    data: [65, 75, 85, 95, 90, 85, 95, 100, 95, 105, 100, 110, 105, 115, 110],
                    backgroundColor: '#4C6EF5',
                  },
                  {
                    label: 'VLM',
                    data: [40, 45, 55, 60, 55, 50, 60, 65, 60, 70, 65, 75, 70, 80, 75],
                    backgroundColor: '#34D399',
                  },
                  {
                    label: 'Embedding',
                    data: [25, 30, 35, 40, 35, 30, 40, 45, 40, 50, 45, 55, 50, 60, 55],
                    backgroundColor: '#F59E0B',
                  }
                ]
              },
              options: {
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false
                  }
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Date'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Number of Requests'
                    }
                  }
                }
              }
            });
          } else {
            console.error("LLM/VLM/Embedding Total Requests 图表元素不存在");
          }
          
          // LLM/VLM/Embedding Total Tokens
          if (totalTokensChart.value) {
            console.log("初始化 LLM/VLM/Embedding Total Tokens 图表");
            const totalTokensCtx = totalTokensChart.value.getContext('2d');
            new Chart(totalTokensCtx, {
              type: 'bar',
              data: {
                labels: timeLabels,
                datasets: [
                  {
                    label: 'LLM',
                    data: [120, 140, 160, 180, 170, 165, 185, 190, 180, 200, 190, 210, 200, 220, 210],
                    backgroundColor: '#4C6EF5',
                  },
                  {
                    label: 'VLM',
                    data: [80, 95, 110, 125, 115, 105, 120, 130, 120, 135, 125, 140, 130, 145, 135],
                    backgroundColor: '#34D399',
                  }
                ]
              },
              options: {
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false
                  }
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Date'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Number of Tokens (K)'
                    }
                  }
                }
              }
            });
          } else {
            console.error("LLM/VLM/Embedding Total Tokens 图表元素不存在");
          }
          
          // Image Models Total Requests
          if (imageRequestsChart.value) {
            console.log("初始化 Image Models Total Requests 图表");
            const imageRequestsCtx = imageRequestsChart.value.getContext('2d');
            new Chart(imageRequestsCtx, {
              type: 'bar',
              data: {
                labels: timeLabels,
                datasets: [
                  {
                    label: 'DALL-E',
                    data: [30, 35, 40, 45, 40, 35, 45, 50, 45, 55, 50, 60, 55, 65, 60],
                    backgroundColor: '#EC4899',
                  },
                  {
                    label: 'SD',
                    data: [25, 28, 32, 35, 32, 29, 33, 36, 33, 39, 36, 42, 39, 45, 42],
                    backgroundColor: '#8B5CF6',
                  },
                  {
                    label: 'Midjourney',
                    data: [15, 17, 20, 22, 20, 18, 21, 23, 21, 25, 22, 27, 24, 29, 26],
                    backgroundColor: '#10B981',
                  }
                ]
              },
              options: {
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false
                  }
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    stacked: true,
                    title: {
                      display: true,
                      text: 'Date'
                    }
                  },
                  y: {
                    stacked: true,
                    title: {
                      display: true,
                      text: 'Number of Requests'
                    }
                  }
                }
              }
            });
          } else {
            console.error("Image Models Total Requests 图表元素不存在");
          }
          
          // Model Distribution
          if (modelDistributionChart.value) {
            console.log("初始化 Model Distribution 图表");
            const modelDistributionCtx = modelDistributionChart.value.getContext('2d');
            new Chart(modelDistributionCtx, {
              type: 'doughnut',
              data: {
                labels: Object.keys(modelDistribution),
                datasets: [
                  {
                    data: Object.values(modelDistribution),
                    backgroundColor: [
                      modelColors['Llama-3'],
                      modelColors['Mistral'],
                      modelColors['Claude'],
                      modelColors['GPT-4'],
                      modelColors['Others']
                    ],
                    borderWidth: 1
                  }
                ]
              },
              options: {
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.label}: ${context.raw}%`;
                      }
                    }
                  }
                },
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%'
              }
            });
          } else {
            console.error("Model Distribution 图表元素不存在");
          }
          
        } catch (error) {
          console.error("图表初始化错误:", error);
        }
      }, 500); // 延迟500毫秒确保DOM已经渲染
    });
    
    return {
      startDate,
      endDate,
      modelOptions,
      modelColors,
      modelDistribution,
      uniqueUsers,
      topUsers,
      recentCalls,
      networkModelUsageChart,
      totalRequestsChart,
      totalTokensChart,
      imageRequestsChart,
      modelDistributionChart,
      timeLabels,
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
  padding: 18px 20px;
  background-color: white;
  border-bottom: 1px solid #eee;
}

.filter-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
}

.filter-group {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.filter-label {
  font-weight: 500;
  margin-right: 10px;
  color: #333;
  font-size: 14px;
}

.to-label {
  margin: 0 8px;
  font-size: 14px;
}

.date-input {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 150px;
  font-size: 14px;
}

.dropdown {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 120px;
  font-size: 14px;
}

.radio-group {
  display: flex;
  align-items: center;
}

.radio-label {
  margin-right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-label input {
  margin-right: 5px;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  margin-left: auto;
}

.search-button {
  padding: 8px 14px;
  background-color: #3490dc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.reset-button {
  padding: 8px 14px;
  background-color: #e2e8f0;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.navbar {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  background-color: white;
}

.navbar h1 {
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.admin-dropdown {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
}

.metrics-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 24px;
  background-color: white;
}

.metric-card {
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 22px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: relative;
}

.metric-title {
  font-size: 15px;
  color: #64748b;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
}

.tooltip-icon {
  position: relative;
  margin-left: 5px;
  cursor: help;
  display: inline-flex;
}

.tooltip-text {
  visibility: hidden;
  position: absolute;
  z-index: 100;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1e293b;
  color: white;
  text-align: center;
  border-radius: 4px;
  padding: 6px 10px;
  width: 200px;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s;
  white-space: normal;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #1e293b transparent transparent transparent;
}

.tooltip-icon:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

.metric-value {
  font-size: 28px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.metric-change {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
}

.metric-change.positive {
  color: #10b981;
}

.metric-change.negative {
  color: #ef4444;
}

.chart-section {
  background-color: white;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  min-height: 400px;
}

.chart-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 0 20px;
  min-height: 400px;
}

.chart-column {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  min-height: 400px;
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 15px;
}

.chart-container {
  height: 300px;
  position: relative;
  width: 100%;
  min-height: 300px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-right: 15px;
  margin-bottom: 5px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  margin-right: 5px;
}

.legend-line {
  width: 20px;
  height: 3px;
  margin-right: 5px;
}

.legend-line.llm {
  background-color: #4C6EF5;
}

.legend-line.vlm {
  background-color: #34D399;
}

.legend-line.embedding {
  background-color: #F59E0B;
}

.legend-line.dalle {
  background-color: #EC4899;
}

.legend-line.sd {
  background-color: #8B5CF6;
}

.legend-line.midjourney {
  background-color: #10B981;
}

.legend-label {
  font-size: 14px;
  color: #64748b;
}

.pie-legend {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.ranking-section {
  background-color: white;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 18px;
}

.ranking-table {
  width: 100%;
  border-collapse: collapse;
}

.ranking-table th {
  background-color: #f8fafc;
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
  color: #64748b;
  font-size: 15px;
}

.ranking-table td {
  padding: 14px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  font-size: 14px;
}

.view-more {
  text-align: center;
  margin-top: 20px;
}

.view-more-button {
  display: inline-block;
  padding: 10px 18px;
  background-color: #3490dc;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
}

.data-table-wrapper {
  padding: 20px;
  background-color: white;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  background-color: #f8fafc;
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 500;
  color: #64748b;
  font-size: 15px;
}

.data-table td {
  padding: 14px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  font-size: 14px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination-info {
  color: #64748b;
  font-size: 14px;
}

.pagination-buttons {
  display: flex;
  align-items: center;
}

.pagination-button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  background-color: white;
  margin: 0 3px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
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

.dropdown-sm {
  min-width: 120px;
  width: auto;
}

.date-input-sm {
  width: 130px;
}

/* 添加User筛选器的样式 */
.user-filter {
  position: relative;
  min-width: 200px;
}

.user-input {
  padding: 8px 30px 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  font-size: 14px;
}

.dropdown-icon {
  position: absolute;
  right: 8px;
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
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.success-text {
  color: #10b981;
  font-weight: 500;
}

.failed-text {
  color: #ef4444;
  font-weight: 500;
}

.requests-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 12px;
}

.requests-column {
  flex: 1;
  text-align: center;
}

.requests-divider {
  width: 1px;
  height: 80px;
  background-color: #e2e8f0;
  margin: 0 10px;
}

.metric-big-value {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 0;
  line-height: 1.2;
}

.metric-status {
  font-size: 16px;
  color: #64748b;
  margin-bottom: 8px;
}

.metric-title-center {
  font-size: 15px;
  color: #64748b;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.requests-cell {
  display: flex;
  align-items: center;
  padding: 0 10px !important;
}

.success-count {
  color: #10b981;
  font-weight: 500;
  font-size: 14px;
}

.failed-count {
  color: #ef4444;
  font-weight: 500;
  font-size: 14px;
}

.request-type {
  color: #6b7280;
  font-size: 14px;
  font-weight: normal;
  margin-left: 5px;
  display: inline-block;
}

.request-divider {
  width: 1px;
  height: 20px;
  background-color: #e2e8f0;
  margin: 0 15px;
}

.requests-simple {
  white-space: nowrap;
}

.separator {
  margin: 0 4px;
  color: #6b7280;
  font-weight: normal;
}

.table-tooltip {
  position: relative;
  display: inline-flex;
  margin-left: 4px;
  cursor: help;
  vertical-align: middle;
}

.table-tooltip:hover::after {
  content: attr(title);
  position: absolute;
  z-index: 100;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1e293b;
  color: white;
  text-align: center;
  border-radius: 4px;
  padding: 4px 8px;
  width: max-content;
  max-width: 200px;
  font-size: 12px;
  font-weight: normal;
  opacity: 1;
  pointer-events: none;
  white-space: normal;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.table-tooltip:hover::before {
  content: "";
  position: absolute;
  z-index: 100;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: #1e293b transparent transparent transparent;
  margin-bottom: -5px;
  pointer-events: none;
}
</style> 