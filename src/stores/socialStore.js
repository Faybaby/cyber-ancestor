import { defineStore } from 'pinia'
import { useAncestorStore } from './ancestorStore'
import { useUserStore } from './userStore'

export const useSocialStore = defineStore('social', {
  state: () => ({
    // 祖宗邀请系统
    invitations: [],
    
    // 他人留言/点香/留手印记录
    visitorInteractions: [],
    
    // 祖宗PK系统
    pkBattles: [],
    pkVotes: [],
    
    // 家族排行榜
    familyRankings: {
      weekly: [],
      monthly: []
    },
    
    // 异界留言信箱
    messages: [],
    pendingReplies: [],
    
    // 祖宗朋友圈
    ancestorMoments: []
  }),
  
  getters: {
    // 获取所有邀请
    getInvitations: (state) => state.invitations,
    
    // 获取访客互动记录
    getVisitorInteractions: (state) => state.visitorInteractions,
    
    // 获取PK战斗记录
    getPkBattles: (state) => state.pkBattles,
    
    // 获取家族排行榜
    getWeeklyRankings: (state) => state.familyRankings.weekly,
    getMonthlyRankings: (state) => state.familyRankings.monthly,
    
    // 获取异界留言
    getMessages: (state) => state.messages,
    getPendingReplies: (state) => state.pendingReplies,
    
    // 获取祖宗朋友圈动态
    getAncestorMoments: (state) => state.ancestorMoments
  },
  
  actions: {
    // 创建祭拜邀请链接
    createInvitation(message = '') {
      const ancestorStore = useAncestorStore()
      const userStore = useUserStore()
      
      if (!ancestorStore.currentAncestor) return null
      
      const invitationId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
      const invitation = {
        id: invitationId,
        ancestorId: ancestorStore.currentAncestor.id,
        userId: userStore.userId,
        message: message,
        createdAt: new Date().toISOString(),
        visits: 0,
        interactions: []
      }
      
      this.invitations.push(invitation)
      this.saveState()
      
      // 返回可分享的邀请ID
      return invitationId
    },
    
    // 记录访客互动
    recordVisitorInteraction(invitationId, visitorId, type, message = '') {
      const invitation = this.invitations.find(inv => inv.id === invitationId)
      if (!invitation) return null
      
      const interaction = {
        id: Date.now().toString(),
        invitationId,
        visitorId,
        type, // 'incense', 'flowers', 'kowtow', 'message'
        message,
        timestamp: new Date().toISOString()
      }
      
      invitation.visits++
      invitation.interactions.push(interaction)
      this.visitorInteractions.push(interaction)
      
      // 更新排行榜
      this.updateRankings(invitation.ancestorId, invitation.userId)
      
      this.saveState()
      return interaction
    },
    
    // 创建祖宗PK
    createPkBattle(opponentId, quoteId) {
      const ancestorStore = useAncestorStore()
      const userStore = useUserStore()
      
      if (!ancestorStore.currentAncestor) return null
      
      const pkId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
      const battle = {
        id: pkId,
        creatorId: userStore.userId,
        creatorAncestorId: ancestorStore.currentAncestor.id,
        opponentId,
        opponentAncestorId: null, // 需要对方接受后填充
        creatorQuoteId: quoteId,
        opponentQuoteId: null, // 需要对方接受后填充
        status: 'pending', // pending, active, completed
        createdAt: new Date().toISOString(),
        completedAt: null,
        votes: {
          creator: 0,
          opponent: 0
        },
        winner: null
      }
      
      this.pkBattles.push(battle)
      this.saveState()
      
      return pkId
    },
    
    // 投票给PK中的一方
    votePkBattle(pkId, targetType, voterId) {
      const battle = this.pkBattles.find(b => b.id === pkId && b.status === 'active')
      if (!battle) return null
      
      // 检查是否已经投过票
      const existingVote = this.pkVotes.find(v => v.pkId === pkId && v.voterId === voterId)
      if (existingVote) return null
      
      // 记录投票
      const vote = {
        id: Date.now().toString(),
        pkId,
        voterId,
        targetType, // 'creator' or 'opponent'
        timestamp: new Date().toISOString()
      }
      
      this.pkVotes.push(vote)
      
      // 更新战斗投票计数
      battle.votes[targetType]++
      
      // 检查是否结束战斗
      const totalVotes = battle.votes.creator + battle.votes.opponent
      if (totalVotes >= 10) { // 假设10票为结束条件
        battle.status = 'completed'
        battle.completedAt = new Date().toISOString()
        battle.winner = battle.votes.creator > battle.votes.opponent ? 'creator' : 'opponent'
      }
      
      this.saveState()
      return vote
    },
    
    // 更新家族排行榜
    updateRankings(ancestorId, userId) {
      const ancestorStore = useAncestorStore()
      
      // 获取当前周和月
      const now = new Date()
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      
      // 更新周榜
      let weeklyEntry = this.familyRankings.weekly.find(r => r.userId === userId)
      if (!weeklyEntry) {
        weeklyEntry = {
          userId,
          ancestorId,
          ancestorName: ancestorStore.currentAncestor?.fullName || '未知祖宗',
          points: 0,
          interactions: 0,
          weekOf: weekStart.toISOString()
        }
        this.familyRankings.weekly.push(weeklyEntry)
      }
      
      weeklyEntry.points += 1
      weeklyEntry.interactions += 1
      
      // 更新月榜
      let monthlyEntry = this.familyRankings.monthly.find(r => r.userId === userId)
      if (!monthlyEntry) {
        monthlyEntry = {
          userId,
          ancestorId,
          ancestorName: ancestorStore.currentAncestor?.fullName || '未知祖宗',
          points: 0,
          interactions: 0,
          monthOf: monthStart.toISOString()
        }
        this.familyRankings.monthly.push(monthlyEntry)
      }
      
      monthlyEntry.points += 1
      monthlyEntry.interactions += 1
      
      // 排序排行榜
      this.familyRankings.weekly.sort((a, b) => b.points - a.points)
      this.familyRankings.monthly.sort((a, b) => b.points - a.points)
      
      this.saveState()
    },
    
    // 发送异界留言
    sendMessage(content) {
      const userStore = useUserStore()
      const ancestorStore = useAncestorStore()
      
      if (!content || content.trim().length < 10) return null
      
      const message = {
        id: Date.now().toString(),
        userId: userStore.userId,
        ancestorId: ancestorStore.currentAncestor?.id,
        content: content.trim(),
        sentAt: new Date().toISOString(),
        status: 'pending', // pending, replied
        replyId: null,
        scheduledReplyTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() // 48小时后回复
      }
      
      this.messages.push(message)
      this.pendingReplies.push({
        messageId: message.id,
        scheduledTime: message.scheduledReplyTime
      })
      
      this.saveState()
      return message
    },
    
    // 生成祖宗回信（模拟AI生成）
    generateAncestorReply(messageId) {
      const message = this.messages.find(m => m.id === messageId)
      if (!message || message.status !== 'pending') return null
      
      const ancestorStore = useAncestorStore()
      const ancestor = ancestorStore.currentAncestor
      
      if (!ancestor) return null
      
      // 模拟AI生成回复（实际项目中可以接入OpenAI或其他AI服务）
      const replyTemplates = [
        `${ancestor.fullName}听闻你的烦恼，深感欣慰你能向祖上倾诉。切记，人生如棋，落子无悔，但棋盘永远可以重新摆放。`,
        `老祖宗我活了这么多年，什么大风大浪没见过？你这点事啊，不过是人生长河中的一朵小浪花。放宽心，顺其自然。`,
        `你的心事，祖宗已悉知。阴阳两界虽隔，但祖宗的智慧可跨越时空。记住，困难如同砂砾，经历摩擦才能成为珍珠。`,
        `哎呀，现在的年轻人啊！祖宗年轻时比你经历的困难多多了！但也正是这些困难，锻造了不屈的精神。去吧，勇敢面对！`,
        `祖宗收到你的心声，甚是欣慰。记住，家族的血脉里流淌着不屈的勇气，任何困难都难不倒我们家的子孙！`
      ]
      
      const replyIndex = Math.floor(Math.random() * replyTemplates.length)
      const replyContent = replyTemplates[replyIndex]
      
      const reply = {
        id: Date.now().toString(),
        originalMessageId: message.id,
        content: replyContent,
        generatedAt: new Date().toISOString(),
        ancestorId: ancestor.id,
        ancestorName: ancestor.fullName
      }
      
      // 更新原消息状态
      message.status = 'replied'
      message.replyId = reply.id
      
      // 从待回复列表中移除
      this.pendingReplies = this.pendingReplies.filter(pr => pr.messageId !== message.id)
      
      // 添加到祖宗朋友圈
      this.addAncestorMoment(ancestor.id, replyContent)
      
      this.saveState()
      return reply
    },
    
    // 添加祖宗朋友圈动态
    addAncestorMoment(ancestorId, content, type = 'quote') {
      const ancestorStore = useAncestorStore()
      const ancestor = ancestorStore.currentAncestor
      
      if (!ancestor) return null
      
      const moment = {
        id: Date.now().toString(),
        ancestorId,
        ancestorName: ancestor.fullName,
        content,
        type, // quote, reply, festival
        postedAt: new Date().toISOString(),
        likes: 0,
        comments: []
      }
      
      this.ancestorMoments.push(moment)
      this.saveState()
      
      return moment
    },
    
    // 保存状态到localStorage
    saveState() {
      const state = {
        invitations: this.invitations,
        visitorInteractions: this.visitorInteractions,
        pkBattles: this.pkBattles,
        pkVotes: this.pkVotes,
        familyRankings: this.familyRankings,
        messages: this.messages,
        pendingReplies: this.pendingReplies,
        ancestorMoments: this.ancestorMoments
      }
      localStorage.setItem('cyber_ancestor_socialState', JSON.stringify(state))
    },
    
    // 从localStorage加载状态
    loadState() {
      const storedState = localStorage.getItem('cyber_ancestor_socialState')
      if (storedState) {
        const state = JSON.parse(storedState)
        this.invitations = state.invitations || []
        this.visitorInteractions = state.visitorInteractions || []
        this.pkBattles = state.pkBattles || []
        this.pkVotes = state.pkVotes || []
        this.familyRankings = state.familyRankings || { weekly: [], monthly: [] }
        this.messages = state.messages || []
        this.pendingReplies = state.pendingReplies || []
        this.ancestorMoments = state.ancestorMoments || []
      }
    },
    
    // 重置状态（用于测试）
    resetState() {
      localStorage.removeItem('cyber_ancestor_socialState')
      this.invitations = []
      this.visitorInteractions = []
      this.pkBattles = []
      this.pkVotes = []
      this.familyRankings = { weekly: [], monthly: [] }
      this.messages = []
      this.pendingReplies = []
      this.ancestorMoments = []
    }
  }
})