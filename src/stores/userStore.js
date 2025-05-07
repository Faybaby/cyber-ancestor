import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null,
    visitCount: 0,
    lastVisit: null,
    preferences: {
      ancestorTypePreference: null,
      interactionPreference: null
    },
    activityLevel: 'new' // new, casual, active, devoted
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.userId,
    userProfile: (state) => ({
      userId: state.userId,
      visitCount: state.visitCount,
      activityLevel: state.activityLevel,
      preferences: state.preferences
    })
  },
  
  actions: {
    // 游客登录 - 自动生成UUID并存储到localStorage
    guestLogin() {
      // 检查localStorage中是否已有用户ID
      const storedUserId = localStorage.getItem('cyber_ancestor_userId')
      
      if (storedUserId) {
        this.userId = storedUserId
      } else {
        // 生成新的UUID
        this.userId = uuidv4()
        localStorage.setItem('cyber_ancestor_userId', this.userId)
      }
      
      // 更新访问次数和最后访问时间
      this.visitCount++
      this.lastVisit = new Date().toISOString()
      
      // 保存状态到localStorage
      this.saveState()
      
      return this.userId
    },
    
    // 更新用户偏好
    updatePreferences(preferences) {
      this.preferences = { ...this.preferences, ...preferences }
      this.saveState()
    },
    
    // 更新活跃度标签
    updateActivityLevel() {
      if (this.visitCount >= 20) {
        this.activityLevel = 'devoted'
      } else if (this.visitCount >= 10) {
        this.activityLevel = 'active'
      } else if (this.visitCount >= 3) {
        this.activityLevel = 'casual'
      }
      this.saveState()
    },
    
    // 保存状态到localStorage
    saveState() {
      const state = {
        userId: this.userId,
        visitCount: this.visitCount,
        lastVisit: this.lastVisit,
        preferences: this.preferences,
        activityLevel: this.activityLevel
      }
      localStorage.setItem('cyber_ancestor_userState', JSON.stringify(state))
    },
    
    // 从localStorage加载状态
    loadState() {
      const storedState = localStorage.getItem('cyber_ancestor_userState')
      if (storedState) {
        const state = JSON.parse(storedState)
        this.userId = state.userId
        this.visitCount = state.visitCount
        this.lastVisit = state.lastVisit
        this.preferences = state.preferences
        this.activityLevel = state.activityLevel
      }
    },
    
    // 重置用户状态（用于测试）
    resetState() {
      localStorage.removeItem('cyber_ancestor_userId')
      localStorage.removeItem('cyber_ancestor_userState')
      this.userId = null
      this.visitCount = 0
      this.lastVisit = null
      this.preferences = {
        ancestorTypePreference: null,
        interactionPreference: null
      }
      this.activityLevel = 'new'
    }
  }
})