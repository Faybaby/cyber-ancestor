import { defineStore } from 'pinia'
import html2canvas from 'html2canvas'

export const useShareStore = defineStore('share', {
  state: () => ({
    shareHistory: [],
    currentShareImage: null,
    shareLinks: [],
    shareTemplates: [
      {
        id: 'quote-card',
        name: '今日祖宗语录卡',
        description: '分享祖宗的金句智慧'
      },
      {
        id: 'ancestor-card',
        name: '我的祖宗名片',
        description: '展示你的专属祖宗'
      },
      {
        id: 'interaction-card',
        name: '祭拜互动卡',
        description: '邀请好友来给你的祖宗上香'
      }
    ]
  }),
  
  getters: {
    getShareTemplates: (state) => state.shareTemplates,
    getShareHistory: (state) => state.shareHistory
  },
  
  actions: {
    // 生成分享图片
    async generateShareImage(elementId, templateId) {
      try {
        const element = document.getElementById(elementId)
        if (!element) {
          throw new Error(`Element with id ${elementId} not found`)
        }
        
        const canvas = await html2canvas(element, {
          useCORS: true,
          scale: 2, // 提高清晰度
          backgroundColor: null // 透明背景
        })
        
        const imageUrl = canvas.toDataURL('image/png')
        this.currentShareImage = imageUrl
        
        // 记录分享历史
        const shareRecord = {
          id: Date.now().toString(),
          templateId,
          imageUrl,
          timestamp: new Date().toISOString()
        }
        
        this.shareHistory.push(shareRecord)
        this.saveState()
        
        return imageUrl
      } catch (error) {
        console.error('生成分享图片失败:', error)
        return null
      }
    },
    
    // 生成分享链接
    generateShareLink(ancestorId, type = 'invite') {
      const baseUrl = window.location.origin
      const shareId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
      
      const shareLink = `${baseUrl}?share=${type}&ancestor=${ancestorId}&id=${shareId}`
      
      const linkRecord = {
        id: shareId,
        ancestorId,
        type,
        url: shareLink,
        createdAt: new Date().toISOString(),
        visits: 0
      }
      
      this.shareLinks.push(linkRecord)
      this.saveState()
      
      return shareLink
    },
    
    // 下载分享图片
    downloadShareImage(filename = 'cyber-ancestor-share.png') {
      if (!this.currentShareImage) return false
      
      const link = document.createElement('a')
      link.href = this.currentShareImage
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      return true
    },
    
    // 分享到社交媒体（模拟）
    shareToSocialMedia(platform, content) {
      // 这里只是模拟分享功能，实际项目中需要接入真实的社交媒体API
      console.log(`分享到${platform}:`, content)
      
      // 记录分享行为
      const shareAction = {
        platform,
        content,
        timestamp: new Date().toISOString()
      }
      
      // 实际项目中可以发送分析事件
      return shareAction
    },
    
    // 保存状态到localStorage
    saveState() {
      const state = {
        shareHistory: this.shareHistory,
        shareLinks: this.shareLinks
      }
      localStorage.setItem('cyber_ancestor_shareState', JSON.stringify(state))
    },
    
    // 从localStorage加载状态
    loadState() {
      const storedState = localStorage.getItem('cyber_ancestor_shareState')
      if (storedState) {
        const state = JSON.parse(storedState)
        this.shareHistory = state.shareHistory
        this.shareLinks = state.shareLinks
      }
    },
    
    // 重置状态（用于测试）
    resetState() {
      localStorage.removeItem('cyber_ancestor_shareState')
      this.shareHistory = []
      this.currentShareImage = null
      this.shareLinks = []
    }
  }
})