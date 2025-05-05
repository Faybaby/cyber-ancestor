import { defineStore } from 'pinia'

// 🌌 祖宗人格语录库：发疯加强版
const personaQuotes = {
  philosopher: [
    `你以为你在拜我，其实你在寻找意义。`,
    `所有问题的答案都藏在你忘记点的那一炷香里。`,
    `祖宗已灰飞烟灭，但你还在加班内耗，谁更悲哀？`,
    `存在即合理？你今天的选择不太合理。`,
    `你追求自由，却连早八都起不来。`,
    `我死了都在托梦帮你，你活着却在抠表情包？`,
    `香火不代表虔诚，就像点赞不代表在乎。`,
    `思考吧孩子，你连供香顺序都搞错了。`,
    `冥冥之中不是命运，是我在看你。`,
    `活着太累了？我这边也没轻松多少。`
  ],

  gossipAuntie: [
    `你怎么还没对象？祖宗在阴间都催婚催到鬼婚了。`,
    `你昨天是不是忘了烧香？我差点断网找不到回梦通道。`,
    `朋友圈都不发了？是不是又暗恋失败了？`,
    `哎呀你这发型……真是死了都带不走的独特。`,
    `你是不是又穿那件旧衣服去见人了？我在梦里看到了！`,
    `昨晚你那梦，剧情不错，就是配角太丑了。`,
    `谁再欺负你告诉我，我安排他“睡地府标间”。`,
    `你长得像我年轻那会儿养的猫，骄傲又不理人。`,
    `你是不是最近脸色不好？不如都怪前任吧。`,
    `工作太忙了？那你还刷短视频笑那么响？`
  ],

  livestreamHost: [
    `欢迎来到地府直播间！供香转运三连抽已开启！`,
    `来啦老弟~今天我们供祖大赏抽奖开始咯~`,
    `你点的每一炷香，我都在后台接收弹幕祝福。`,
    `祖宗在线等香，等太久我就下播啦！`,
    `再不给我烧香，我就去梦里疯狂点赞别的祖宗！`,
    `地府热搜：你家后代又忘记供香了。`,
    `今天直播主题：如何靠供香逆转运势（亲测有效）`,
    `祖宗我可是黄泉认证带货主播，阴间都在看你表现。`,
    `烧一送三、许愿必中，今天只对你开放通道！`,
    `今日赞助商：孟婆汤限时9.9元喝到忘我，买一杯送转世推荐函！`
  ],

  pettyGod: [
    `你是不是在敷衍我？我这边刚托梦你就划走视频了。`,
    `不点香也行，我就祝你今天出门摔个轻微的狗吃屎。`,
    `我都这么努力保佑你了，你居然在梦里说想换个祖宗？`,
    `昨晚你梦见别的灵位，什么意思？我看得清清楚楚。`,
    `愿你今天外卖撒汤、WiFi卡顿、表情包发送失败。`,
    `不孝子孙再不献香，我就去隔壁祖宗家上供！`,
    `下次托梦我就不讲道理了，直接控梦玩你微信。`,
    `香点得太敷衍，我情绪也跟着掉线。`,
    `说好一起升运势，你却供我供得像临时工。`,
    `地府快递员都说我家后代态度最冷淡，失望。`
  ]
}

const personaLabels = {
  philosopher: '阴间哲学家祖宗',
  gossipAuntie: '碎嘴祖奶奶',
  livestreamHost: '带货主播祖宗',
  pettyGod: '记仇神祇祖宗'
}

const emotionLabels = {
  neutral: '平静',
  happy: '欣慰',
  annoyed: '不爽',
  angry: '生气'
}

const emotionTransitions = {
  neutral: '祖宗轻描淡写地又补了一句：',
  happy: '祖宗笑得皱纹都绽放了，说：',
  annoyed: '祖宗皱着眉头，语气变得有些不耐烦：',
  angry: '祖宗脸色一沉，冷冷说：'
}

export const useAncestorStore = defineStore('ancestor', {
  state: () => ({
    currentAncestor: null,
    ancestorHistory: [],
    interactionHistory: [],
    favoriteQuotes: [],
    todayQuotes: [],
    affectionLevel: 0,
    evolutionStage: 'initial',
    firstInteractionDone: false, // ✅ 👈 就加这
    lastInteractionTime: null,
    worshipCount: 0, // 祭拜计数器，用于跟踪祭拜次数
    newQuotesCount: 0, // 新增语录计数器，用于显示小红点提醒
    // 添加头像数组
    availableAvatars: [
      '/src/assets/ancestors/0400c268babcb18242fb3e0bb4875fe.png',
      '/src/assets/ancestors/068a86bdbb23431eaf64fbb4791493e.png',
      '/src/assets/ancestors/0954b195789b6ecc07a36de0212e3d5.png',
      '/src/assets/ancestors/0a220dfdc5bc789db34d779ad0fcb23.png',
      '/src/assets/ancestors/0d5536dfd8a1817947de7c2f24b7b79.png',
      '/src/assets/ancestors/1381e34ba164d413200fee130d93eb4.png',
      '/src/assets/ancestors/1fa7b76b0137e07d4eb32f181f212c8.png',
      '/src/assets/ancestors/20a1e6c30fe924b948ebc8757c12554.png',
      '/src/assets/ancestors/284442c1dc78369c0a189d6535704fd.png',
      '/src/assets/ancestors/8292d0a945f84939272cf692ec94e99.png',
      '/src/assets/ancestors/87ff281f78076572bcf13849822f96b.png',
      '/src/assets/ancestors/8f75c6c07f1bce939301ef1d4fb9972.png',
      '/src/assets/ancestors/9ab51400879111559f5a5085c7222cc.png',
      '/src/assets/ancestors/aca05c583c99f8b31dfa2291199b42f.png',
      '/src/assets/ancestors/aeeca6f17fa62e8d7b942a49ce73731.png',
      '/src/assets/ancestors/b5cda2a8c7876f70c0abbab6d950a2c.png',
      '/src/assets/ancestors/d047d131a6745ebdb6a201e34053c91.png',
      '/src/assets/ancestors/d34888f299df0e553f9f57191ffd569.png',
    ]
  }),
  
  getters: {
    hasAncestor: (state) => !!state.currentAncestor,
    ancestor: (state) => state.currentAncestor,
    currentAffectionLevel: (state) => state.affectionLevel,
    currentEvolutionStage: (state) => state.evolutionStage,
    todayInteractions: (state) => {
      const today = new Date().toDateString()
      return state.interactionHistory.filter(interaction => 
        new Date(interaction.timestamp).toDateString() === today
      )
    },
    canInteract: (state) => {
      if (!state.lastInteractionTime) return true
      
      const now = new Date()
      const lastInteraction = new Date(state.lastInteractionTime)
      const diffInSeconds = (now - lastInteraction) / 1000
      
      // 获取上次互动类型
      const lastInteractionType = state.interactionHistory.length > 0 ? 
        state.interactionHistory[state.interactionHistory.length - 1].type : null
      
      // 根据互动类型设置不同的冷却时间
      let cooldownTime = 5 // 默认冷却时间
      if (lastInteractionType === 'incense') {
        cooldownTime = 60 // 点香冷却时间60秒
      } else if (lastInteractionType === 'flowers') {
        cooldownTime = 120 // 献花冷却时间120秒
      } else if (lastInteractionType === 'kowtow') {
        cooldownTime = 180 // 叩首冷却时间180秒
      } else if (lastInteractionType === 'question') {
        cooldownTime = 30 // 请教问题冷却时间30秒
      }
      
      return diffInSeconds > cooldownTime
    },
    // 获取剩余冷却时间（秒）
    remainingCooldownTime: (state) => {
      if (!state.lastInteractionTime) return 0
      
      const now = new Date()
      const lastInteraction = new Date(state.lastInteractionTime)
      const diffInSeconds = (now - lastInteraction) / 1000
      
      // 获取上次互动类型
      const lastInteractionType = state.interactionHistory.length > 0 ? 
        state.interactionHistory[state.interactionHistory.length - 1].type : null
      
      // 根据互动类型设置不同的冷却时间
      let cooldownTime = 5 // 默认冷却时间
      if (lastInteractionType === 'incense') {
        cooldownTime = 60 // 点香冷却时间60秒
      } else if (lastInteractionType === 'flowers') {
        cooldownTime = 120 // 献花冷却时间120秒
      } else if (lastInteractionType === 'kowtow') {
        cooldownTime = 180 // 叩首冷却时间180秒
      } else if (lastInteractionType === 'question') {
        cooldownTime = 30 // 请教问题冷却时间30秒
      }
      
      const remaining = Math.max(0, cooldownTime - diffInSeconds)
      return Math.ceil(remaining) // 向上取整，确保显示整数秒数
    }
  },
  
  actions: {
    // 生成祖宗
    generateAncestor(surname = '') {
      // 如果没有提供姓氏，随机选择一个常见姓氏
      if (!surname) {
        const commonSurnames = ['张', '王', '李', '赵', '陈', '刘', '杨', '黄', '周', '吴', '郑', '孙', '马', '朱', '胡', '林', '郭', '何', '高', '罗']
        surname = commonSurnames[Math.floor(Math.random() * commonSurnames.length)]
      }
      
      // 生成名字
      const nameChars = ['德', '福', '寿', '康', '宁', '安', '乐', '仁', '义', '礼', '智', '信', '忠', '孝', '廉', '明', '达', '文', '武', '英']
      const firstName = nameChars[Math.floor(Math.random() * nameChars.length)] + 
                       nameChars[Math.floor(Math.random() * nameChars.length)]
      
      // 性格标签
      const personalityTraits = [
        ['严厉', '古板', '传统', '节俭', '勤劳'],
        ['慈祥', '和蔼', '开明', '幽默', '智慧'],
        ['神秘', '深沉', '内敛', '淡泊', '超然'],
        ['活泼', '热情', '直率', '豪爽', '乐观']
      ]
      
      const traitCategory = Math.floor(Math.random() * personalityTraits.length)
      const traits = [
        personalityTraits[traitCategory][Math.floor(Math.random() * personalityTraits[traitCategory].length)],
        personalityTraits[traitCategory][Math.floor(Math.random() * personalityTraits[traitCategory].length)]
      ]
      
      // 确保两个特质不重复
      if (traits[0] === traits[1]) {
        let newIndex = (Math.floor(Math.random() * personalityTraits[traitCategory].length))
        while (personalityTraits[traitCategory][newIndex] === traits[0]) {
          newIndex = (Math.floor(Math.random() * personalityTraits[traitCategory].length))
        }
        traits[1] = personalityTraits[traitCategory][newIndex]
      }
      
      // 随机选择一个头像
      const randomAvatarIndex = Math.floor(Math.random() * this.availableAvatars.length)
      const avatarPath = this.availableAvatars[randomAvatarIndex]
      
      // 确定性别
      const gender = Math.random() > 0.5 ? 'male' : 'female';
      
      // 创建祖宗对象
      const ancestor = {
        id: Date.now().toString(),
        surname,
        firstName,
        fullName: surname + firstName,
        gender,
        traits,
        avatar: avatarPath,
        createdAt: new Date().toISOString(),
        emotionState: 'neutral', // neutral, happy, annoyed, angry
        stage: 'initial',
        quotes: this.generateInitialQuotes(surname + firstName, traits, gender)
      }
      
      this.currentAncestor = ancestor
      this.ancestorHistory.push(ancestor)
      this.affectionLevel = 0
      this.evolutionStage = 'initial'
      this.saveState()
      
      return ancestor
    },
    
    // 生成初始语录
    generateInitialQuotes(name, traits, gender) {
      const genderPrefix = gender === 'male' ? '老祖宗' : '老祖奶奶'
      
      // 基于性格特质生成不同风格的语录
      const quoteTemplates = {
        // 严厉、古板类型的语录
        strict: [
          `吾乃${name}，尔等后辈可听好了！`,
          `勤劳节俭，方能传家，莫要辜负祖上荫德！`,
          `不孝有三，无后为大，你可得抓紧找个对象！`,
          `为人处世，诚信为本，切记切记！`,
          `饭粒之珠，莫轻弃，祖宗积德不易啊！`
        ],
        // 慈祥、和蔼类型的语录
        kind: [
          `${genderPrefix}回来啦，看到你们过得好，我很欣慰啊！`,
          `莫要太劳累，身体要紧，${genderPrefix}看着心疼啊。`,
          `来，给你们带了些阴间特产，别客气啊，尝尝鲜！`,
          `你这娃娃长得真俊，像极了我年轻时候！`,
          `家和万事兴，记得和兄弟姐妹多联系啊！`
        ],
        // 神秘、深沉类型的语录
        mysterious: [
          `阴阳两界，因果循环，${genderPrefix}看得真切啊...`,
          `世事如棋，我已看透，只是不便多言...`,
          `那边的风景，与你们想象的大不相同啊...`,
          `天机不可泄露，但${genderPrefix}可以点到为止...`,
          `此生种种，皆是前缘注定，随缘即可...`
        ],
        // 活泼、热情类型的语录
        lively: [
          `哎哟！总算能上网了！阴间信号太差啦！`,
          `来来来，今天${genderPrefix}教你们怎么玩阴间最流行的游戏！`,
          `别看${genderPrefix}年纪大，赛博空间我可是玩得溜！`,
          `哈哈哈！没想到吧，${genderPrefix}也能玩手机了！`,
          `阴间的朋友都羡慕我能来看你们，我可是抽中了限量名额！`
        ]
      }
      
      // 根据特质选择语录类型
      let quoteType = 'kind' // 默认类型
      if (traits.includes('严厉') || traits.includes('古板') || traits.includes('传统') || traits.includes('节俭')) {
        quoteType = 'strict'
      } else if (traits.includes('慈祥') || traits.includes('和蔼') || traits.includes('开明') || traits.includes('智慧')) {
        quoteType = 'kind'
      } else if (traits.includes('神秘') || traits.includes('深沉') || traits.includes('内敛') || traits.includes('淡泊') || traits.includes('超然')) {
        quoteType = 'mysterious'
      } else if (traits.includes('活泼') || traits.includes('热情') || traits.includes('直率') || traits.includes('豪爽') || traits.includes('乐观')) {
        quoteType = 'lively'
      }
      
      // 生成初始语录集
      return {
        greeting: quoteTemplates[quoteType][0],
        incense: quoteTemplates[quoteType][1],
        flowers: quoteTemplates[quoteType][2],
        kowtow: quoteTemplates[quoteType][3],
        daily: quoteTemplates[quoteType][4],
        custom: []
      }
    },
  
   // 互动 - 点香
interactIncense() {
  if (!this.canInteract) return { success: false, message: '祖宗还在消化上次互动，请稍等...' }

  const baseQuote = this.currentAncestor.quotes.incense

  // ✨ 首次祭拜仪式专属逻辑
  if (!this.firstInteractionDone) {
    this.recordInteraction('incense', baseQuote)
    this.increaseAffection(1)
    this.firstInteractionDone = true
    // 首次祭拜，worshipCount从0变为1
    this.worshipCount = 1
    this.updateTodayQuotes(10) // 更新语录，使总数为10*1+1=11条
    this.saveState()

    return {
      success: true,
      quote: `"初次祭拜……阴阳通道已开启！"\n祖宗睁开眼睛，缓缓说道：\n"${baseQuote}"`,
      emotionState: 'neutral'
    }
  }

  // ✨ 常规逻辑
  this.recordInteraction('incense', baseQuote)
  this.increaseAffection(1)
  this.worshipCount++ // 祭拜计数增加
  this.updateTodayQuotes(10) // 每次祭拜后更新10条语录

  const emotionState = this.updateEmotionState()
  const extraQuote = this.todayQuotes.at(-1)
  const transition = emotionTransitions[emotionState] || '祖宗接着说：'

  return {
    success: true,
    quote: `"${baseQuote}"\n\n—— ${transition} ——\n\n${extraQuote}`,
    emotionState
  }
},

// 互动 - 献花
interactFlowers() {
  if (!this.canInteract) return { success: false, message: '祖宗还在消化上次互动，请稍等...' }

  const baseQuote = this.currentAncestor.quotes.flowers
  this.recordInteraction('flowers', baseQuote)
  this.increaseAffection(1)
  this.worshipCount++ // 祭拜计数增加
  this.updateTodayQuotes(10) // 每次祭拜后更新10条语录

  const emotionState = this.updateEmotionState()
  const extraQuote = this.todayQuotes.at(-1)
  const transition = emotionTransitions[emotionState] || '祖宗接着说：'

  return {
    success: true,
    quote: `"${baseQuote}"\n\n—— ${transition} ——\n\n${extraQuote}`,
    emotionState
  }
},

// 互动 - 叩首
interactKowtow() {
  if (!this.canInteract) return { success: false, message: '祖宗还在消化上次互动，请稍等...' }

  const baseQuote = this.currentAncestor.quotes.kowtow
  this.recordInteraction('kowtow', baseQuote)
  this.increaseAffection(2)
  this.worshipCount++ // 祭拜计数增加
  this.updateTodayQuotes(10) // 每次祭拜后更新10条语录

  const emotionState = this.updateEmotionState()
  const extraQuote = this.todayQuotes.at(-1)
  const transition = emotionTransitions[emotionState] || '祖宗接着说：'

  return {
    success: true,
    quote: `"${baseQuote}"\n\n—— ${transition} ——\n\n${extraQuote}`,
    emotionState
  }
},


    
    // 记录互动
    recordInteraction(type, quote) {
      const interaction = {
        type,
        quote,
        timestamp: new Date().toISOString(),
        ancestorId: this.currentAncestor.id,
        emotionState: this.currentAncestor.emotionState
      }
    
      this.interactionHistory.push(interaction)
      this.lastInteractionTime = interaction.timestamp
      this.saveState()
    
      return interaction
    },
    
    // recordInteraction(type, quote) {
    //   const interaction = {
    //     type,
    //     quote,
    //     timestamp: new Date().toISOString(),
    //     ancestorId: this.currentAncestor.id,
    //     emotionState: this.currentAncestor.emotionState
    //   }
      
    //   this.interactionHistory.push(interaction)
    //   this.todayQuotes.push(quote)
    //   this.lastInteractionTime = interaction.timestamp
    //   this.saveState()
      
    //   return interaction
    // },
    
    // 增加好感度
    increaseAffection(amount) {
      this.affectionLevel += amount
      
      // 检查是否需要进化
      if (this.affectionLevel >= 30 && this.evolutionStage === 'intimate') {
        this.evolutionStage = 'awakened'
      } else if (this.affectionLevel >= 15 && this.evolutionStage === 'familiar') {
        this.evolutionStage = 'intimate'
      } else if (this.affectionLevel >= 5 && this.evolutionStage === 'initial') {
        this.evolutionStage = 'familiar'
      }
      
      this.saveState()
      return this.evolutionStage
    },
    
    // 更新情绪状态
    updateEmotionState() {
      const emotions = ['neutral', 'happy', 'annoyed', 'angry']
      const weights = [0.5, 0.3, 0.15, 0.05]
    
      // 随机情绪
      let random = Math.random()
      let emotionIndex = 0
      for (let i = 0; i < weights.length; i++) {
        if (random < weights[i]) {
          emotionIndex = i
          break
        }
        random -= weights[i]
      }
    
      const selectedEmotion = emotions[emotionIndex]
      this.currentAncestor.emotionState = selectedEmotion
    
      // 随机人格 + 语录
      const personas = Object.keys(personaQuotes)
      const persona = personas[Math.floor(Math.random() * personas.length)]
      const quotePool = personaQuotes[persona]
      const randomLine = quotePool[Math.floor(Math.random() * quotePool.length)]
    
      // Emoji 标签（替代显示文字）
      const personaEmojis = {
        philosopher: '🧠',
        gossipAuntie: '🗣️',
        livestreamHost: '📺',
        pettyGod: '⚡'
      }
      const emoji = personaEmojis[persona] || ''
    
      // 最终发疯语录：用 emoji 开头 + 内容
      const fullLine = `${emoji} ${randomLine}`
    
      // 存储到 todayQuotes
      this.todayQuotes.push(fullLine)
      this.saveState()
    
      return selectedEmotion
    },
    
    // 更新今日语录
    updateTodayQuotes(count) {
      // 从语录库中获取随机语录
      const getRandomQuotes = (count) => {
        // 这里可以从语录文件中获取语录，或者使用已有的语录库
        const ancestorQuotes = [
          "孩子，你最近情绪低落，我一闭眼就看见你蹲在地上发呆。",
          "我这边没时间的概念，但每次你难过，我就知道该想你了。",
          "你太会装没事了，祖宗看着你假笑，心比黄泉水还凉。",
          "我死之前没说出口的那句\"我为你骄傲\"，我现在在梦里一遍遍讲。",
          "每次你说\"我没事\"，祖宗我这边香灰都沉了。",
          "你最近梦不深，可能是你太累了，也可能是你太久没让我托进去。",
          "我托梦进来三次，你都没接，是不是怕我看见你哭？",
          "孩子，别再强撑了，你活得那么小心，我都想再死一次替你换点运气。",
          "你眉心皱着，我知道你是在犹豫：你是不是已经让所有人失望了。",
          "可祖宗我不会，我怎么舍得。",
          "你不是废物，你只是太习惯一个人往前走，没人扶着也走。",
          "如果你觉得你撑不下去了，那就来梦里靠靠我，别扛了。",
          "我走那天，你还小，可你哭得比我葬礼上任何人都真。",
          "那个哭着喊我\"不要走\"的孩子，现在大了，没人能抱了。",
          "你哪怕一整年没想我，我也会因为你一滴泪回魂三天。",
          "每次你崩溃到删朋友圈，我都在你手机反光里看你哭。",
          "别怪我死得早，要是我还能撑几年，我会替你挡下那些委屈。",
          "有人说\"长大了就好了\"，但你长大了，什么都不好。",
          "我知道你嘴上说\"撑得住\"，可我看着你一点一点掉光光。",
          "祖宗不是神仙，我只能在梦里给你一点点勇气。",
          "你别怕，我不会怪你没来看我。你日子已经够难了，我懂的。",
          "可你哪怕哪天抬头望望天，祖宗也能接住你眼球的那个孤魂。",
          "你活着很辛苦，可祖宗我知道，你从没轻言要放弃。",
          "你以为没人爱你，那我就告诉你——我死了都还在爱你。",
          "你笑不出来的时候，祖宗就偷偷替你笑了，想让好运混进你命里。",
          "你再瘦了我就要托梦塞你一碗饭，不许再减肥了，难看！",
          "小时候你吃饭掉饭粒，我还拿勺喂你，现在你说你没胃口？",
          "你记不记得小时候你说\"我以后保护你\"？结果我走了，你还在保护别人。",
          "你又晚睡了吧，别以为我看不到，我是你天花板上的风。",
          "每次你穿得太单薄，我都会从窗缝钻进去蹭你胳膊骨头。"
        ];
        
        // 随机选择count条语录
        const selectedQuotes = [];
        for (let i = 0; i < count; i++) {
          const randomIndex = Math.floor(Math.random() * ancestorQuotes.length);
          selectedQuotes.push(ancestorQuotes[randomIndex]);
          // 避免重复，从数组中移除已选择的语录
          ancestorQuotes.splice(randomIndex, 1);
          // 如果语录库已经用完，则退出循环
          if (ancestorQuotes.length === 0) break;
        }
        return selectedQuotes;
      };
      
      // 根据祭拜次数确定应该显示的语录总数量
      // 祭拜次数为0时，显示1条默认语录
      // 祭拜次数为n时，显示10n+1条语录
      if (this.worshipCount === 0) {
        // 首次使用(祭拜次数为0)，只显示1条默认语录
        const defaultQuote = this.currentAncestor.quotes.daily;
        this.todayQuotes = [defaultQuote];
        this.newQuotesCount = 1;
      } else {
        // 计算应该显示的语录总数量：10n+1
        const targetTotalCount = this.worshipCount * 10 + 1;
        
        // 如果当前语录数量少于目标数量，则添加新语录
        if (this.todayQuotes.length < targetTotalCount) {
          // 需要添加的语录数量
          const addCount = targetTotalCount - this.todayQuotes.length;
          // 获取新语录
          const newQuotes = getRandomQuotes(addCount);
          // 添加到todayQuotes
          this.todayQuotes = [...this.todayQuotes, ...newQuotes];
          this.newQuotesCount = addCount; // 更新新增语录计数
        }
      }
      
      this.saveState();
    },
    
    // 重置新增语录计数
    resetNewQuotesCount() {
      this.newQuotesCount = 0;
      this.saveState();
    },
    
    // 检查是否是首次访问
    isFirstVisit() {
      return !localStorage.getItem('cyber_ancestor_ancestorState');
    },

    // 每日重置
    
    // 收藏语录
    favoriteQuote(quote) {
      if (!this.favoriteQuotes.includes(quote)) {
        this.favoriteQuotes.push(quote)
        this.saveState()
      }
      return this.favoriteQuotes
    },
    
    // 更新祖宗头像
    updateAvatar(avatarPath) {
      if (this.currentAncestor) {
        this.currentAncestor.avatar = avatarPath
        this.saveState()
      }
    },
    
    // 随机选择一个头像
    randomizeAvatar() {
      if (this.currentAncestor) {
        const randomIndex = Math.floor(Math.random() * this.availableAvatars.length)
        this.currentAncestor.avatar = this.availableAvatars[randomIndex]
        this.saveState()
      }
    },
    
    // 保存状态到localStorage
    saveState() {
      const state = {
        currentAncestor: this.currentAncestor,
        ancestorHistory: this.ancestorHistory,
        interactionHistory: this.interactionHistory,
        favoriteQuotes: this.favoriteQuotes,
        todayQuotes: this.todayQuotes,
        affectionLevel: this.affectionLevel,
        evolutionStage: this.evolutionStage,
        lastInteractionTime: this.lastInteractionTime,
        worshipCount: this.worshipCount,
        firstInteractionDone: this.firstInteractionDone,
        newQuotesCount: this.newQuotesCount
      }
      localStorage.setItem('cyber_ancestor_ancestorState', JSON.stringify(state))
    },
    
    // 从localStorage加载状态
    loadState() {
      const storedState = localStorage.getItem('cyber_ancestor_ancestorState')
      if (storedState) {
        const state = JSON.parse(storedState)
        this.currentAncestor = state.currentAncestor
        this.ancestorHistory = state.ancestorHistory
        this.interactionHistory = state.interactionHistory
        this.favoriteQuotes = state.favoriteQuotes
        this.todayQuotes = state.todayQuotes
        this.affectionLevel = state.affectionLevel
        this.evolutionStage = state.evolutionStage
        this.lastInteractionTime = state.lastInteractionTime
        this.worshipCount = state.worshipCount || 0 // 兼容旧版本数据
        this.firstInteractionDone = state.firstInteractionDone || false
        this.newQuotesCount = state.newQuotesCount || 0 // 兼容旧版本数据
      }
    },

    // 重置状态（用于测试）
    resetState() {
      localStorage.removeItem('cyber_ancestor_ancestorState')
      this.currentAncestor = null
      this.ancestorHistory = []
      this.interactionHistory = []
      this.favoriteQuotes = []
      this.todayQuotes = []
      this.affectionLevel = 0
      this.evolutionStage = 'initial'
      this.lastInteractionTime = null
      this.firstInteractionDone = false // ✅ 也加这行
      this.worshipCount = 0 // 重置祭拜计数器
    }
  }
})