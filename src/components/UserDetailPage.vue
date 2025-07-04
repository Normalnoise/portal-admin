<template>
  <div class="main-content">
    <!-- 导航栏 -->
    <div class="navbar">
      <h1>User Details</h1>
      <div class="admin-dropdown">
        ADMIN
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m6 8 4 4 4-4" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </svg>
      </div>
    </div>
    
    <!-- 用户详情内容 -->
    <div class="user-detail-container">
      <div class="page-header">
        <div class="header-left">
          <router-link to="/" class="back-button">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h16" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Back to Overview
          </router-link>
        </div>
      </div>
      
      <!-- Account Information Section -->
      <div class="detail-section">
        <div class="section-header">Account Information</div>
        <div class="section-content">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">User Name</div>
              <div class="info-value">{{ user.name || 'Not Provided' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Email</div>
              <div class="info-value">{{ user.email }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Register Time</div>
              <div class="info-value">{{ user.registerTime }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Role</div>
              <div class="info-value">{{ user.role || 'Standard' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Tier</div>
              <div class="info-value">
                <select v-model="user.tier" class="dropdown tier-dropdown">
                  <option value="">Select Tier</option>
                  <option>Engineer Tier 1</option>
                  <option>Engineer Tier 2</option>
                  <option>Engineer Tier 3</option>
                  <option>Expert Tier 1</option>
                  <option>Expert Tier 2</option>
                </select>
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">Organization</div>
              <div class="info-value">{{ user.organization || 'Not Provided' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Total Referrals</div>
              <div class="info-value">{{ user.totalReferrals }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Financial Information Section -->
      <div class="detail-section">
        <div class="section-header">Financial Information</div>
        <div class="section-content">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Current Credits</div>
              <div class="info-value">$ {{ user.currentCredits }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Total Spend</div>
              <div class="info-value green-text">$ {{ user.totalSpend }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Total Deposit</div>
              <div class="info-value">$ {{ user.totalDeposit }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Resource Usage Section -->
      <div class="detail-section">
        <div class="section-header">Resource Usage</div>
        <div class="section-content">
          <!-- Instances Subsection -->
          <h3 style="margin-bottom: 16px; font-size: 16px; font-weight: 500;">Instances</h3>
          <div class="info-grid" style="margin-bottom: 24px;">
            <div class="info-item">
              <div class="info-label">Running Instances</div>
              <div class="info-value">{{ user.runningInstances }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Deleted Instances</div>
              <div class="info-value">{{ user.deletedInstances }}</div>
            </div>
          </div>
          
          <!-- Usage Subsection -->
          <h3 style="margin-bottom: 16px; font-size: 16px; font-weight: 500;">Usage</h3>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Token Usage</div>
              <div class="info-value">{{ user.tokenUsage }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Image Usage</div>
              <div class="info-value">{{ user.imageUsage }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Total Storage</div>
              <div class="info-value">{{ user.totalStorage }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Login Information Section -->
      <div class="detail-section">
        <div class="section-header">Login Information</div>
        <div class="section-content">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Last Login IP</div>
              <div class="info-value">{{ user.lastLoginIP || '192.168.1.1' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Region</div>
              <div class="info-value">{{ user.region || 'North America' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Country</div>
              <div class="info-value">{{ user.country || 'United States' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">City</div>
              <div class="info-value">{{ user.city || 'San Francisco' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Last Login Time</div>
              <div class="info-value">{{ user.lastLoginTime || '2025-01-30 05:34:17' }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Profile Information Section -->
      <div class="detail-section">
        <div class="section-header">Profile Information</div>
        <div class="section-content">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Usecase</div>
              <div class="info-value">{{ user.usecase || 'Web Development' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Team Size</div>
              <div class="info-value">{{ user.teamSize || '5-10' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Build Goal</div>
              <div class="info-value">{{ user.buildGoal || 'Personal Project' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">How Heard</div>
              <div class="info-value">{{ user.howHeard || 'Social Media' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetailPage',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
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
          totalReferrals: 0,
          role: 'Admin',
          organization: 'Nebula Corp',
          lastLoginIP: '203.0.113.1',
          region: 'Asia',
          country: 'China',
          city: 'Shanghai',
          lastLoginTime: '2025-01-29 08:45:12',
          usecase: 'AI Development',
          teamSize: '10-20',
          buildGoal: 'Enterprise Solution',
          howHeard: 'Conference'
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
    user() {
      const userId = parseInt(this.id) - 1;
      const userObj = this.allUsers[userId] || {};
      // 确保 tier 属性存在，如果不存在则设为空字符串
      if (!userObj.tier) {
        userObj.tier = '';
      }
      return userObj;
    }
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.header-left {
  margin-right: auto;
}

.tier-dropdown {
  width: 180px;
  min-width: 180px;
}
</style>