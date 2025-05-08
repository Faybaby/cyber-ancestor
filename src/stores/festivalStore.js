import { defineStore } from 'pinia'
import { useAncestorStore } from './ancestorStore'
import { useUserStore } from './userStore'

export const useFestivalStore = defineStore('festival', {
  state: () => ({
    // 当前节日模式
    currentFestival: null, // null, 'qingming', 'zhongyuan'
    
    // 节日特效状态
    festivalEffects: {
      enabled: false,
      type: null, // 'smoke', 'lantern', 'ghostfire'
    },
    
    // 节日皮肤
    festivalTheme: {
      enabled: false,
      type: null, // 'blackwhite', 'night'
    },
    
    // 节日任务
    festivalTasks: [],
    
    // 连续祭拜记录
    consecutiveWorshipDays: 0,
    lastWorshipDate: null,
    
    // 解锁的隐藏内容
    unlockedSecrets: [],
    
    // 节日日历 - 预设的节日日期
    festivalCalendar: [
      {
        id: 'qingming-2023',
        type: 'qingming',
        name: '清明节',
        startDate: '2023-04-05T00:00:00.000Z',
        endDate: '2023-04-07T23:59:59.999Z',
        active: false
      },
      {
        id: 'zhongyuan-2023',
        type: 'zhongyuan',
        name: '中元节',
        startDate: '2023-08-30T00:00:00.000Z',
        endDate: '2023-09-01T23:59:59.999Z',
        active: false
      },
      {
        id: 'qingming-2024',
        type: 'qingming',
        name: '清明节',
        startDate: '2024-04-04T00:00:00.000Z',
        endDate: '2024-04-06T23:59:59.999Z',
        active: false
      },
      {
        id: 'zhongyuan-2024',
        type: 'zhongyuan',
        name: '中元节',
        startDate: '2024-08-19T00:00:00.000Z',
        endDate: '2024-08-21T23:59:59.999Z',
        active: false
      }
    ]
  }),
  
  getters: {
    // 是否处于节日模式
    isInFestivalMode: (state) => !!state.currentFestival,
    
    // 获取当前节日信息
    getCurrentFestival: (state) => {
      if (!state.currentFestival) return null
      return state.festivalCalendar.find(f => f.type === state.currentFestival && f.active)
    },
    
    // 获取活跃的节日任务
    getActiveTasks: (state) => state.festivalTasks.filter(task => !task.completed),
    
    // 获取已完成的节日任务
    getCompletedTasks: (state) => state.festivalTasks.filter(task => task.completed),
    
    // 检查是否解锁了特定秘密
    hasUnlockedSecret: (state) => (secretId) => state.unlockedSecrets.some(s => s.id === secretId),
    
    // 获取所有解锁的秘密
    getAllUnlockedSecrets: (state) => state.unlockedSecrets,
    
    // 获取连续祭拜天数
    getConsecutiveWorshipDays: (state) => state.consecutiveWorshipDays
  },
  
  actions: {
    // 检查并更新当前节日状态
    checkFestivalStatus() {
      const now = new Date()
      let activeFestival = null
      
      // 检查当前日期是否在任何节日范围内
      for (const festival of this.festivalCalendar) {
        const startDate = new Date(festival.startDate)
        const endDate = new Date(festival.endDate)
        
        if (now >= startDate && now <= endDate) {
          activeFestival = festival
          festival.active = true
        } else {
          festival.active = false
        }
      }
      
      // 更新当前节日状态
      if (activeFestival) {
        this.currentFestival = activeFestival.type
        this.enableFestivalEffects(activeFestival.type)
        this.generateFestivalTasks(activeFestival.type)
      } else if (this.currentFestival) {
        // 如果之前有节日但现在没有，则关闭节日模式
        this.disableFestivalMode()
      }
      
      this.saveState()
      return this.currentFestival
    },
    
    // 启用节日特效
    enableFestivalEffects(festivalType) {
      this.festivalEffects.enabled = true
      
      if (festivalType === 'qingming') {
        // 清明节特效
        this.festivalEffects.type = 'smoke'
        this.festivalTheme.enabled = true
        this.festivalTheme.type = 'blackwhite'
      } else if (festivalType === 'zhongyuan') {
        // 中元节特效
        this.festivalEffects.type = 'ghostfire'
        this.festivalTheme.enabled = true
        this.festivalTheme.type = 'night'
      }
      
      this.saveState()
      return this.festivalEffects
    },
    
    // 关闭节日模式
    disableFestivalMode() {
      this.currentFestival = null
      this.festivalEffects.enabled = false
      this.festivalEffects.type = null
      this.festivalTheme.enabled = false
      this.festivalTheme.type = null
      
      // 保留未完成的任务，但不再生成新任务
      this.saveState()
    },
    
    // 生成节日任务
    generateFestivalTasks(festivalType) {
      // 如果已经有任务，不重复生成
      if (this.festivalTasks.some(task => task.festivalType === festivalType && !task.completed)) {
        return this.festivalTasks
      }
      
      const tasks = []
      
      if (festivalType === 'qingming') {
        // 清明节任务
        tasks.push(
          {
            id: `qingming-task1-${Date.now()}`,
            festivalType: 'qingming',
            title: '三献礼',
            description: '在一天内完成点香、献花和叩首各一次',
            progress: 0,
            target: 3,
            reward: '解锁清明特殊语录',
            completed: false,
            createdAt: new Date().toISOString()
          },
          {
            id: `qingming-task2-${Date.now()}`,
            festivalType: 'qingming',
            title: '连续祭拜',
            description: '清明节期间连续三天祭拜祖宗',
            progress: 0,
            target: 3,
            reward: '解锁特殊祖宗形象',
            completed: false,
            createdAt: new Date().toISOString()
          },
          {
            id: `qingming-task3-${Date.now()}`,
            festivalType: 'qingming',
            title: '祖训传承',
            description: '收藏5条祖宗语录',
            progress: 0,
            target: 5,
            reward: '解锁隐藏祖宗身份',
            completed: false,
            createdAt: new Date().toISOString()
          }
        )
      } else if (festivalType === 'zhongyuan') {
        // 中元节任务
        tasks.push(
          {
            id: `zhongyuan-task1-${Date.now()}`,
            festivalType: 'zhongyuan',
            title: '午夜祭拜',
            description: '在晚上10点至凌晨2点之间祭拜祖宗',
            progress: 0,
            target: 1,
            reward: '解锁中元特殊语录',
            completed: false,
            createdAt: new Date().toISOString()
          },
          {
            id: `zhongyuan-task2-${Date.now()}`,
            festivalType: 'zhongyuan',
            title: '阴阳对话',
            description: '向祖宗发送一条异界留言',
            progress: 0,
            target: 1,
            reward: '解锁特殊回信',
            completed: false,
            createdAt: new Date().toISOString()
          },
          {
            id: `zhongyuan-task3-${Date.now()}`,
            festivalType: 'zhongyuan',
            title: '冥府传说',
            description: '在中元节期间完成3次祖训翻译游戏',
            progress: 0,
            target: 3,
            reward: '解锁隐藏祖宗身份',
            completed: false,
            createdAt: new Date().toISOString()
          }
        )
      }
      
      this.festivalTasks = [...this.festivalTasks, ...tasks]
      this.saveState()
      
      return tasks
    },
    
    // 更新任务进度
    updateTaskProgress(taskId, increment = 1) {
      const task = this.festivalTasks.find(t => t.id === taskId)
      if (!task || task.completed) return null
      
      task.progress += increment
      
      // 检查任务是否完成
      if (task.progress >= task.target) {
        task.completed = true
        task.completedAt = new Date().toISOString()
        
        // 发放奖励
        this.grantTaskReward(task)
      }
      
      this.saveState()
      return task
    },
    
    // 发放任务奖励
    grantTaskReward(task) {
      const ancestorStore = useAncestorStore()
      
      // 根据任务奖励类型解锁不同内容
      if (task.reward.includes('语录')) {
        // 解锁特殊语录
        const festivalQuotes = this.generateFestivalQuotes(task.festivalType)
        if (ancestorStore.currentAncestor && festivalQuotes) {
          ancestorStore.currentAncestor.quotes.custom = [
            ...ancestorStore.currentAncestor.quotes.custom,
            ...festivalQuotes
          ]
          ancestorStore.saveState()
        }
      } else if (task.reward.includes('形象')) {
        // 解锁特殊形象
        const secretId = `${task.festivalType}-special-avatar`
        this.unlockSecret(secretId, `${task.festivalType}特殊形象`, 'avatar')
      } else if (task.reward.includes('身份')) {
        // 解锁隐藏身份
        const secretId = `${task.festivalType}-hidden-identity`
        this.unlockSecret(secretId, `${task.festivalType}隐藏身份`, 'identity')
      } else if (task.reward.includes('回信')) {
        // 解锁特殊回信
        const secretId = `${task.festivalType}-special-reply`
        this.unlockSecret(secretId, `${task.festivalType}特殊回信`, 'reply')
      }
      
      return task.reward
    },
    
    // 解锁秘密内容
    unlockSecret(secretId, name, type) {
      // 检查是否已解锁
      if (this.unlockedSecrets.some(s => s.id === secretId)) return null
      
      const secret = {
        id: secretId,
        name,
        type,
        unlockedAt: new Date().toISOString(),
        content: this.getSecretContent(secretId, type)
      }
      
      this.unlockedSecrets.push(secret)
      this.saveState()
      
      return secret
    },
    
    // 获取秘密内容
    getSecretContent(secretId, type) {
      // 根据秘密ID和类型返回对应内容
      const secretContents = {
        'qingming-special-avatar': '/assets/ancestors/special/qingming_avatar.svg',
        'zhongyuan-special-avatar': '/assets/ancestors/special/zhongyuan_avatar.svg',
        'qingming-hidden-identity': '前朝大学士，因直言进谏被贬，精通诗词歌赋',
        'zhongyuan-hidden-identity': '阴间判官，专管阳间善恶，暗中观察后人行为',
        'zhongyuan-special-reply': '吾乃阴司判官，今日特开冥府之门，聆听汝之心声。阳寿有定，善恶有报，切记勿造业障，好自为之。'
      }
      
      return secretContents[secretId] || '内容未定义'
    },
    
    // 生成节日特殊语录
    generateFestivalQuotes(festivalType) {
      if (festivalType === 'qingming') {
        return [
          '清明时节雨纷纷，路上行人欲断魂。借问酒家何处有，牧童遥指杏花村。',
          '慎终追远，民德归厚矣。祭祀祖先，不忘根本，方能枝叶茂盛。',
          '清明祭祖，慎终追远。吾虽已逝，然汝心中吾永存。',
          '一缕香烟寄哀思，清明时节忆先人。子孙后代皆安好，九泉之下我欣慰。',
          '人生如白驹过隙，转眼即逝。惟有德行流芳百世，功业传之千秋。'
        ]
      } else if (festivalType === 'zhongyuan') {
        return [
          '中元节至，阴阳两界门户大开，吾得以归来看看尔等后辈。',
          '冥府之中，日月无光。唯有尔等心中一点烛火，照亮吾前行之路。',
          '阴司有簿，善恶分明。勿以恶小而为之，勿以善小而不为。',
          '鬼门开，百鬼夜行。然吾自顾血脉，不使尔等受惊扰。',
          '生者且珍重，死者已无忧。莫要过度思念，徒增哀伤。'
        ]
      }
      
      return null
    },
    
    // 记录祭拜
    recordWorship() {
      const today = new Date().toDateString()
      const lastWorship = this.lastWorshipDate ? new Date(this.lastWorshipDate).toDateString() : null
      
      // 检查是否是连续祭拜
      if (lastWorship) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayString = yesterday.toDateString()
        
        if (lastWorship === yesterdayString) {
          // 连续祭拜
          this.consecutiveWorshipDays++
        } else if (lastWorship !== today) {
          // 不是连续的，也不是今天已经记录过的，重置计数
          this.consecutiveWorshipDays = 1
        }
      } else {
        // 第一次祭拜
        this.consecutiveWorshipDays = 1
      }
      
      this.lastWorshipDate = new Date().toISOString()
      
      // 检查连续祭拜任务
      this.checkConsecutiveWorshipTasks()
      
      this.saveState()
      return this.consecutiveWorshipDays
    },
    
    // 检查连续祭拜任务
    checkConsecutiveWorshipTasks() {
      // 查找连续祭拜相关的任务并更新
      const consecutiveTasks = this.festivalTasks.filter(task => 
        task.title.includes('连续') && !task.completed
      )
      
      for (const task of consecutiveTasks) {
        // 更新任务进度为当前连续天数
        task.progress = this.consecutiveWorshipDays
        
        // 检查是否完成
        if (task.progress >= task.target) {
          task.completed = true
          task.completedAt = new Date().toISOString()
          
          // 发放奖励
          this.grantTaskReward(task)
        }
      }
    },
    
    // 保存状态到localStorage
    saveState() {
      const state = {
        currentFestival: this.currentFestival,
        festivalEffects: this.festivalEffects,
        festivalTheme: this.festivalTheme,
        festivalTasks: this.festivalTasks,
        consecutiveWorshipDays: this.consecutiveWorshipDays,
        lastWorshipDate: this.lastWorshipDate,
        unlockedSecrets: this.unlockedSecrets,
        festivalCalendar: this.festivalCalendar
      }
      localStorage.setItem('cyber_ancestor_festivalState', JSON.stringify(state))
    },
    
    // 从localStorage加载状态
    loadState() {
      const storedState = localStorage.getItem('cyber_ancestor_festivalState')
      if (storedState) {
        const state = JSON.parse(storedState)
        this.currentFestival = state.currentFestival
        this.festivalEffects = state.festivalEffects || { enabled: false, type: null }
        this.festivalTheme = state.festivalTheme || { enabled: false, type: null }
        this.festivalTasks = state.festivalTasks || []
        this.consecutiveWorshipDays = state.consecutiveWorshipDays || 0
        this.lastWorshipDate = state.lastWorshipDate
        this.unlockedSecrets = state.unlockedSecrets || []
        this.festivalCalendar = state.festivalCalendar || this.festivalCalendar
      }
      
      // 检查当前是否处于节日期间
      this.checkFestivalStatus()
    },
    
    // 重置状态（用于测试）
    resetState() {
      localStorage.removeItem('cyber_ancestor_festivalState')
      this.currentFestival = null
      this.festivalEffects = { enabled: false, type: null }
      this.festivalTheme = { enabled: false, type: null }
      this.festivalTasks = []
      this.consecutiveWorshipDays = 0
      this.lastWorshipDate = null
      this.unlockedSecrets = []
      // 不重置festivalCalendar，保留预设的节日日期
    }
  }
})