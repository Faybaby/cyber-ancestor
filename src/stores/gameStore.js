import { defineStore } from 'pinia'
import { useAncestorStore } from './ancestorStore'
import { useUserStore } from './userStore'

export const useGameStore = defineStore('game', {
  state: () => ({
    // 游戏记录
    gameHistory: [],
    
    // 祖训翻译战游戏数据
    translationGame: {
      questions: [],
      currentQuestion: null,
      score: 0,
      highScore: 0,
      gamesPlayed: 0
    },
    
    // 灵魂压岁钱游戏数据
    redPacketGame: {
      rewards: [],
      lastReward: null,
      totalRewards: 0,
      gamesPlayed: 0
    },
    
    // 祖宗辩论游戏数据
    debateGame: {
      debates: [],
      currentDebate: null,
      wins: 0,
      losses: 0,
      gamesPlayed: 0
    }
  }),
  
  getters: {
    // 获取游戏历史记录
    getGameHistory: (state) => state.gameHistory,
    
    // 获取祖训翻译战数据
    getTranslationGameData: (state) => state.translationGame,
    
    // 获取灵魂压岁钱数据
    getRedPacketGameData: (state) => state.redPacketGame,
    
    // 获取祖宗辩论数据
    getDebateGameData: (state) => state.debateGame,
    
    // 获取总游戏次数
    getTotalGamesPlayed: (state) => 
      state.translationGame.gamesPlayed + 
      state.redPacketGame.gamesPlayed + 
      state.debateGame.gamesPlayed
  },
  
  actions: {
    // 初始化祖训翻译战游戏
    initTranslationGame() {
      // 重置当前游戏状态
      this.translationGame.currentQuestion = null
      this.translationGame.score = 0
      
      // 生成问题
      this.translationGame.questions = this.generateTranslationQuestions()
      
      // 记录游戏开始
      const gameSession = {
        id: Date.now().toString(),
        type: 'translation',
        startTime: new Date().toISOString(),
        endTime: null,
        score: 0,
        completed: false
      }
      
      this.gameHistory.push(gameSession)
      this.saveState()
      
      return {
        sessionId: gameSession.id,
        questions: this.translationGame.questions
      }
    },
    
    // 生成祖训翻译问题
    generateTranslationQuestions() {
      // 预设的祖训翻译问题
      const questions = [
        {
          id: 'q1',
          question: '"勿以恶小而为之，勿以善小而不为"的现代含义是？',
          options: [
            '不要因为恶事小就去做，不要因为善事小就不做',
            '小恶不为，小善必为',
            '恶事做小点，善事做大点',
            '恶人做小事，善人做大事'
          ],
          correctAnswer: 0
        },
        {
          id: 'q2',
          question: '"己所不欲，勿施于人"的现代含义是？',
          options: [
            '自己不喜欢的东西，不要送给别人',
            '自己不想要的，就别强加给别人',
            '不要把自己不愿意的事情强加给别人',
            '己所欲，亦施于人'
          ],
          correctAnswer: 2
        },
        {
          id: 'q3',
          question: '"近朱者赤，近墨者黑"的现代含义是？',
          options: [
            '喜欢红色的人靠近朱砂，喜欢黑色的人靠近墨水',
            '环境对人的影响很大',
            '人容易被身边的事物染色',
            '交友需谨慎，环境会影响一个人的行为和思想'
          ],
          correctAnswer: 3
        },
        {
          id: 'q4',
          question: '"学而不思则罔，思而不学则殆"的现代含义是？',
          options: [
            '学习和思考要平衡',
            '只学习不思考是没用的，只思考不学习是危险的',
            '学习不努力就会迷茫，思考不深入就会疲惫',
            '学习需要方法，思考需要技巧'
          ],
          correctAnswer: 1
        },
        {
          id: 'q5',
          question: '"人无远虑，必有近忧"的现代含义是？',
          options: [
            '人如果不为未来做打算，就会有眼前的忧愁',
            '不要考虑太远的事情，以免带来烦恼',
            '近忧可解，远虑难决',
            '活在当下，不必忧虑未来'
          ],
          correctAnswer: 0
        },
        {
          id: 'q6',
          question: '"三思而后行"的现代含义是？',
          options: [
            '做事前先考虑三个方面',
            '思考三次再行动',
            '做事前要仔细思考，不要冲动行事',
            '行动前需要征求三个人的意见'
          ],
          correctAnswer: 2
        },
        {
          id: 'q7',
          question: '"良药苦口利于病，忠言逆耳利于行"的现代含义是？',
          options: [
            '好药都是苦的，好建议都是难听的',
            '批评虽然难听，但对改正错误有好处',
            '苦口良药治病，逆耳忠言改过',
            '有益的东西往往不那么容易接受'
          ],
          correctAnswer: 1
        },
        {
          id: 'q8',
          question: '"不入虎穴，不得虎子"的现代含义是？',
          options: [
            '不冒险就得不到回报',
            '想要成功必须面对困难和危险',
            '不进老虎洞，就抓不到小老虎',
            '有付出才有收获'
          ],
          correctAnswer: 1
        },
        {
          id: 'q9',
          question: '"一日之计在于晨，一年之计在于春"的现代含义是？',
          options: [
            '早上和春天是最好的计划时间',
            '做事要把握好时机，及时规划',
            '一天的计划在早晨制定，一年的计划在春天制定',
            '时间管理很重要，要合理安排'
          ],
          correctAnswer: 1
        },
        {
          id: 'q10',
          question: '"千里之行，始于足下"的现代含义是？',
          options: [
            '再长的路也要一步步走完',
            '再远的旅程也是从脚下开始的',
            '做任何事情都要从基础做起',
            '以上都是'
          ],
          correctAnswer: 3
        }
      ]
      
      // 随机选择5个问题
      const selectedQuestions = [...questions]
      for (let i = selectedQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[selectedQuestions[i], selectedQuestions[j]] = [selectedQuestions[j], selectedQuestions[i]]
      }
      
      return selectedQuestions.slice(0, 5)
    },
    
    // 回答祖训翻译问题
    answerTranslationQuestion(sessionId, questionId, answerIndex) {
      const gameSession = this.gameHistory.find(g => g.id === sessionId && g.type === 'translation')
      if (!gameSession || gameSession.completed) return null
      
      const question = this.translationGame.questions.find(q => q.id === questionId)
      if (!question) return null
      
      const isCorrect = answerIndex === question.correctAnswer
      
      // 更新分数
      if (isCorrect) {
        this.translationGame.score += 20 // 每题20分，满分100分
      }
      
      // 生成祖宗评语
      const ancestorStore = useAncestorStore()
      let ancestorComment = ''
      
      if (isCorrect) {
        const correctComments = [
          '不错，看来祖宗的教诲没有白费！',
          '回答正确，祖宗甚是欣慰！',
          '孺子可教也！祖宗血脉果然不凡！',
          '答得好！祖宗在九泉之下也会为你骄傲！',
          '不愧是我的后人，聪明伶俐！'
        ]
        ancestorComment = correctComments[Math.floor(Math.random() * correctComments.length)]
      } else {
        const wrongComments = [
          '哎呀，差了点意思，再好好想想！',
          '错了错了，看来要多读读祖训啊！',
          '祖宗的脸都被你丢尽了！再学习学习！',
          '唉，现在的年轻人，都不读书了吗？',
          '差强人意，下次用点心！'
        ]
        ancestorComment = wrongComments[Math.floor(Math.random() * wrongComments.length)]
      }
      
      // 检查是否是最后一个问题
      const answeredQuestions = this.translationGame.questions.filter(q => q.answered)
      if (answeredQuestions.length >= this.translationGame.questions.length - 1) {
        // 游戏结束
        gameSession.completed = true
        gameSession.endTime = new Date().toISOString()
        gameSession.score = this.translationGame.score
        
        // 更新最高分
        if (this.translationGame.score > this.translationGame.highScore) {
          this.translationGame.highScore = this.translationGame.score
        }
        
        // 增加游戏次数
        this.translationGame.gamesPlayed++
        
        // 增加祖宗好感度
        if (this.translationGame.score >= 60) {
          ancestorStore.increaseAffection(2)
        } else {
          ancestorStore.increaseAffection(1)
        }
      }
      
      // 标记问题已回答
      question.answered = true
      question.userAnswer = answerIndex
      
      this.saveState()
      
      return {
        isCorrect,
        score: this.translationGame.score,
        ancestorComment,
        gameCompleted: gameSession.completed
      }
    },
    
    // 初始化灵魂压岁钱游戏
    initRedPacketGame() {
      // 重置当前游戏状态
      this.redPacketGame.lastReward = null
      
      // 记录游戏开始
      const gameSession = {
        id: Date.now().toString(),
        type: 'redpacket',
        startTime: new Date().toISOString(),
        endTime: null,
        reward: null,
        completed: false
      }
      
      this.gameHistory.push(gameSession)
      this.saveState()
      
      return {
        sessionId: gameSession.id
      }
    },
    
    // 打开灵魂压岁钱
    openRedPacket(sessionId) {
      const gameSession = this.gameHistory.find(g => g.id === sessionId && g.type === 'redpacket')
      if (!gameSession || gameSession.completed) return null
      
      const ancestorStore = useAncestorStore()
      
      // 随机生成奖励
      const rewards = [
        { icon: '🧧', amount: '666', message: '恭喜发财，吉祥如意！', type: 'good' },
        { icon: '🧧', amount: '888', message: '财源广进，八方来财！', type: 'good' },
        { icon: '🧧', amount: '1', message: '象征性给你一点，别太贪心！', type: 'bad' },
        { icon: '🧧', amount: '999', message: '久久久，长长久久！', type: 'good' },
        { icon: '🧧', amount: '123', message: '一二三，祖宗保佑你步步高升！', type: 'good' },
        { icon: '🧧', amount: '520', message: '祖宗爱你，好好努力！', type: 'good' },
        { icon: '🧧', amount: '8', message: '八八八，祝你发发发！', type: 'good' },
        { icon: '🧧', amount: '0', message: '你最近做了什么亏心事？祖宗很不满意！', type: 'bad' },
        { icon: '🧧', amount: '66', message: '六六大顺，一切顺利！', type: 'good' },
        { icon: '🧧', amount: '233', message: '笑口常开，好运连连！', type: 'good' }
      ]
      
      // 随机选择一个奖励
      const rewardIndex = Math.floor(Math.random() * rewards.length)
      const reward = rewards[rewardIndex]
      
      // 生成祖宗评语
      let comment = ''
      if (reward.type === 'good') {
        const goodComments = [
          '祖宗保佑你，好运连连！',
          '这是祖宗的一点心意，收好了！',
          '好好用这笔钱，别乱花！',
          '祖宗看你最近表现不错，特意奖励你！',
          '阴间钱庄刚发了利息，分你一点！'
        ]
        comment = goodComments[Math.floor(Math.random() * goodComments.length)]
      } else {
        const badComments = [
          '最近没好好祭拜祖宗吧？小心我罚你！',
          '这是给你的教训，好好反省！',
          '祖宗的钱不好拿，下次好好表现！',
          '阴间通货膨胀，祖宗也不容易啊！',
          '别不知足，有总比没有强！'
        ]
        comment = badComments[Math.floor(Math.random() * badComments.length)]
      }
      
      reward.comment = comment
      
      // 更新游戏状态
      this.redPacketGame.lastReward = reward
      this.redPacketGame.rewards.push(reward)
      this.redPacketGame.totalRewards += parseInt(reward.amount) || 0
      
      // 更新游戏会话
      gameSession.completed = true
      gameSession.endTime = new Date().toISOString()
      gameSession.reward = reward
      
      // 增加游戏次数
      this.redPacketGame.gamesPlayed++
      
      // 增加祖宗好感度
      if (reward.type === 'good') {
        ancestorStore.increaseAffection(1)
      }
      
      this.saveState()
      
      return {
        reward,
        totalRewards: this.redPacketGame.totalRewards,
        gamesPlayed: this.redPacketGame.gamesPlayed
      }
    },
    
    // 初始化祖宗辩论游戏
    initDebateGame() {
      // 重置当前游戏状态
      this.debateGame.currentDebate = null
      
      // 生成辩题
      const topics = [
        '年轻人应该啃老吗？',
        '婚姻中应该先成家后立业吗？',
        '子女应该赡养父母吗？',
        '传统文化还有必要传承吗？',
        '现代社会是否应该遵循"孝道"？',
        '人生应该追求稳定还是冒险？',
        '金钱和幸福哪个更重要？',
        '现代教育是否应该保留应试制度？',
        '年轻人应该回乡发展还是留在大城市？',
        '传统节日是否还有存在的必要？'
      ]
      
      // 随机选择一个辩题
      const topicIndex = Math.floor(Math.random() * topics.length)
      const topic = topics[topicIndex]
      
      // 创建辩论
      const debate = {
        id: Date.now().toString(),
        topic,
        playerPosition: Math.random() > 0.5 ? 'support' : 'oppose',
        ancestorPosition: null, // 会在选择后设置为相反立场
        playerArguments: [],
        ancestorArguments: [],
        currentRound: 0,
        maxRounds: 3,
        winner: null,
        startTime: new Date().toISOString(),
        endTime: null
      }
      
      this.debateGame.currentDebate = debate
      
      // 记录游戏开始
      const gameSession = {
        id: debate.id,
        type: 'debate',
        startTime: debate.startTime,
        endTime: null,
        topic: debate.topic,
        playerPosition: debate.playerPosition,
        winner: null,
        completed: false
      }
      
      this.gameHistory.push(gameSession)
      this.debateGame.debates.push(debate)
      this.saveState()
      
      return {
        sessionId: debate.id,
        topic: debate.topic,
        playerPosition: debate.playerPosition,
        maxRounds: debate.maxRounds
      }
    },
    
    // 提交辩论论点
    submitDebateArgument(sessionId, argument) {
      const debate = this.debateGame.debates.find(d => d.id === sessionId)
      if (!debate || debate.winner) return null
      
      // 添加玩家论点
      debate.playerArguments.push({
        round: debate.currentRound + 1,
        content: argument,
        timestamp: new Date().toISOString()
      })
      
      // 设置祖宗立场（与玩家相反）
      if (debate.ancestorPosition === null) {
        debate.ancestorPosition = debate.playerPosition === 'support' ? 'oppose' : 'support'
      }
      
      // 生成祖宗反驳
      const ancestorArgument = this.generateAncestorArgument(debate)
      debate.ancestorArguments.push({
        round: debate.currentRound + 1,
        content: ancestorArgument,
        timestamp: new Date().toISOString()
      })
      
      // 更新回合
      debate.currentRound++
      
      // 检查是否结束辩论
      if (debate.currentRound >= debate.maxRounds) {
        this.concludeDebate(debate)
      }
      
      this.saveState()
      
      return {
        ancestorArgument,
        currentRound: debate.currentRound,
        maxRounds: debate.maxRounds,
        completed: debate.winner !== null
      }
    },
    
    // 生成祖宗论点（模拟AI生成）
    generateAncestorArgument(debate) {
      const ancestorStore = useAncestorStore()
      const ancestor = ancestorStore.currentAncestor
      
      // 根据祖宗性格和辩题生成不同风格的论点
      const supportArguments = {
        '年轻人应该啃老吗？': [
          '家族血脉相连，父母养育子女不易，子女成年后父母适当帮助是天经地义。',
          '现代社会竞争激烈，年轻人面临高房价高物价，父母提供支持是家庭责任。',
          '啃老不是单向索取，而是代际互助，年轻人未来也会赡养父母，形成良性循环。'
        ],
        '婚姻中应该先成家后立业吗？': [
          '成家能给人稳定的后盾，有了家庭的支持，立业才能更加专注和坚定。',
          '先成家可以避免年龄大了找不到合适伴侣的风险，生育也有保障。',
          '家庭和事业可以相互促进，不必非此即彼，成家后夫妻共同奋斗更有动力。'
        ],
        '子女应该赡养父母吗？': [
          '赡养父母是中华民族的传统美德，是对养育之恩的回报。',
          '父母年老需要照顾，子女有责任和义务提供物质和精神上的支持。',
          '赡养不仅是法律规定，更是道德要求，体现了社会的伦理价值。'
        ],
        '传统文化还有必要传承吗？': [
          '传统文化是民族的根和魂，传承传统文化是保持民族特性的必要途径。',
          '传统文化中蕴含着丰富的智慧和价值观，对现代人的精神生活有重要指导意义。',
          '传统文化是历史的积淀，是祖先留给我们的宝贵财富，理应珍视和传承。'
        ],
        '现代社会是否应该遵循"孝道"？': [
          '孝道是中华文化的核心价值，体现了家庭和谐和社会稳定的基础。',
          '现代社会更需要孝道来平衡快节奏生活带来的代际隔阂。',
          '孝道可以与时俱进，不是盲目服从，而是尊重、关爱和责任的体现。'
        ],
        '人生应该追求稳定还是冒险？': [
          '稳定是人生的基础，有了稳定才有安全感和幸福感。',
          '稳定的生活更有利于长远规划和持续发展，避免大起大落的风险。',
          '中国传统智慧讲求中庸之道，稳中求进比冒险更符合可持续发展理念。'
        ],
        '金钱和幸福哪个更重要？': [
          '金钱是幸福的基础，没有基本的物质保障，谈幸福是空中楼阁。',
          '金钱能解决很多问题，减少生活中的烦恼和压力，为幸福创造条件。',
          '适度的财富追求是理性的，可以为家人提供更好的生活和教育环境。'
        ],
        '现代教育是否应该保留应试制度？': [
          '应试教育虽有不足，但提供了相对公平的竞争环境，特别是对农村和贫困地区的学生。',
          '考试是检验学习成果的重要手段，培养了学生的毅力和抗压能力。',
          '中国国情复杂，应试制度是现阶段最适合的选拔人才的方式，不能一味否定。'
        ],
        '年轻人应该回乡发展还是留在大城市？': [
          '回乡发展可以照顾父母，传承家族事业，维系家乡情感纽带。',
          '家乡发展潜力大，政策支持多，竞争压力小，生活成本低，性价比高。',
          '叶落归根是中国人的传统观念，最终回归家乡是情感的归宿。'
        ],
        '传统节日是否还有存在的必要？': [
          '传统节日承载着丰富的文化内涵和民族记忆，是文化传承的重要载体。',
          '节日仪式感增强家庭凝聚力和社会认同感，对维系亲情和社会和谐有重要作用。',
          '传统节日是民族文化的象征，体现了中华文明的独特魅力和生命力。'
        ]
      }
      
      const opposeArguments = {
        '年轻人应该啃老吗？': [
          '独立自主是成年人的基本素养，过度依赖父母会阻碍个人成长和能力发展。',
          '啃老会加重父母晚年负担，影响他们的退休生活质量。',
          '自力更生才能锻炼意志，培养解决问题的能力，实现人生价值。'
        ],
        '婚姻中应该先成家后立业吗？': [
          '现代社会竞争激烈，应该先立业有所成就，才能给家庭提供稳定保障。',
          '没有经济基础的婚姻容易因生活压力而产生矛盾，影响婚姻质量。',
          '个人发展和事业成就是现代人的重要追求，不应被过早的家庭责任所限制。'
        ],
        '子女应该赡养父母吗？': [
          '父母应该为自己的养老做规划，不应该成为子女的负担。',
          '现代社会应该建立完善的社会保障体系，而不是依赖家庭养老。',
          '子女有自己的生活和家庭，强制赡养可能导致代际矛盾和资源分配不均。'
        ],
        '传统文化还有必要传承吗？': [
          '传统文化中有许多不符合现代价值观的内容，盲目传承可能阻碍社会进步。',
          '现代社会需要创新和开放的思维，过度强调传统可能导致思想保守。',
          '全球化背景下，应该吸收各种文化的精华，而不是固守传统。'
        ],
        '现代社会是否应该遵循"孝道"？': [
          '现代社会应该建立平等的家庭关系，而不是单向的孝道要求。',
          '盲目遵循孝道可能导致个人权利被忽视，甚至造成精神压力。',
          '社会发展需要新的伦理观念，传统孝道应该与时俱进，而非照搬古训。'
        ],
        '人生应该追求稳定还是冒险？': [
          '冒险能带来更多机遇和可能性，过于稳定容易错失人生精彩。',
          '创新和突破往往来自冒险精神，这是社会进步和个人成长的动力。',
          '年轻时不冒险，老了会后悔，应该在有能力承担风险时勇于尝试。'
        ],
        '金钱和幸福哪个更重要？': [
          '过度追求金钱会忽视精神需求，真正的幸福来自内心的满足和人际关系。',
          '金钱买不到健康、爱情和真情，这些才是幸福的真正源泉。',
          '简单的生活方式往往带来更多幸福感，物质丰富不等于精神富足。'
        ],
        '现代教育是否应该保留应试制度？': [
          '应试教育扼杀创造力和个性发展，不利于培养全面发展的人才。',
          '过度强调考试成绩导致学生学习负担过重，身心健康受到影响。',
          '世界先进教育理念强调能力培养和兴趣引导，应试教育已经落后于时代。'
        ],
        '年轻人应该回乡发展还是留在大城市？': [
          '大城市提供更多机会和资源，有利于个人能力提升和视野拓展。',
          '现代通讯技术发达，可以远程关心父母，不必局限于地理位置。',
          '个人发展应该追随自己的兴趣和专业所需，而不是被家乡情感所束缚。'
        ],
        '传统节日是否还有存在的必要？': [
          '现代生活节奏快，传统节日仪式繁琐，增加了生活负担。',
          '许多传统节日习俗已经商业化，失去了原有的文化内涵。',
          '年轻人应该有自由选择庆祝方式的权利，而不是被传统所束缚。'
        ]
      }
      
      // 根据辩题和立场选择合适的论点
      const argumentPool = debate.ancestorPosition === 'support' ? supportArguments[debate.topic] : opposeArguments[debate.topic]
      
      if (!argumentPool || argumentPool.length === 0) {
        // 如果没有预设论点，生成通用论点
        const genericArguments = {
          support: [
            '从传统文化角度看，这是符合我国国情的选择。',
            '这种做法有利于家庭和谐和社会稳定。',
            '我们祖先的智慧告诉我们，这是正确的道路。'
          ],
          oppose: [
            '时代在变化，不能固守旧观念而不思进取。',
            '个人发展和自由选择更为重要。',
            '现代社会需要新的思维方式来应对挑战。'
          ]
        }
        
        const genericPool = genericArguments[debate.ancestorPosition]
        return genericPool[Math.floor(Math.random() * genericPool.length)]
      }
      
      // 根据回合数选择不同的论点
      const roundIndex = debate.currentRound % argumentPool.length
      return argumentPool[roundIndex]
    },
    
    // 结束辩论并评判结果
    concludeDebate(debate) {
      const ancestorStore = useAncestorStore()
      const userStore = useUserStore()
      
      // 简单的评判逻辑：随机决定胜负，但玩家有更高概率获胜
      // 实际应用中可以接入更复杂的评判逻辑或AI评分
      const playerWinProbability = 0.6 + (userStore.debateSkill * 0.05)
      const playerWins = Math.random() < playerWinProbability
      
      debate.winner = playerWins ? 'player' : 'ancestor'
      debate.endTime = new Date().toISOString()
      
      // 更新游戏会话
      const gameSession = this.gameHistory.find(g => g.id === debate.id && g.type === 'debate')
      if (gameSession) {
        gameSession.completed = true
        gameSession.endTime = debate.endTime
        gameSession.winner = debate.winner
      }
      
      // 更新游戏统计
      this.debateGame.gamesPlayed++
      if (playerWins) {
        this.debateGame.wins++
        // 增加祖宗好感度（即使玩家赢了，祖宗也欣赏其辩才）
        ancestorStore.increaseAffection(1)
        // 增加辩论技能
        userStore.increaseDebateSkill(1)
      } else {
        this.debateGame.losses++
        // 祖宗赢了更高兴
        ancestorStore.increaseAffection(2)
      }
      
      this.saveState()
      
      return {
        winner: debate.winner,
        playerWins,
        stats: {
          wins: this.debateGame.wins,
          losses: this.debateGame.losses,
          gamesPlayed: this.debateGame.gamesPlayed
        }
      }
    },
    
    // 获取辩论结果评语
    getDebateConclusion(sessionId) {
      const debate = this.debateGame.debates.find(d => d.id === sessionId)
      if (!debate || !debate.winner) return null
      
      const playerWins = debate.winner === 'player'
      
      // 生成结论评语
      let conclusion = ''
      if (playerWins) {
        const winConclusions = [
          '你的论点很有说服力，祖宗甘拜下风！',
          '不愧是我的后人，辩才了得！',
          '你的思维很有现代性，祖宗自愧不如。',
          '论辩之道，后生可畏！祖宗认可你的观点。',
          '你赢了这场辩论，祖宗为你的智慧感到骄傲！'
        ]
        conclusion = winConclusions[Math.floor(Math.random() * winConclusions.length)]
      } else {
        const loseConclusions = [
          '祖宗经历沧桑，见多识广，这次就让你长长见识吧！',
          '辩论之道需勤加练习，下次再接再厉！',
          '祖宗的智慧不是白来的，好好学习吧！',
          '输给祖宗不丢人，传承千年的智慧岂是易与之辈？',
          '年轻人还需多读书，多思考，祖宗等着你的进步！'
        ]
        conclusion = loseConclusions[Math.floor(Math.random() * loseConclusions.length)]
      }
      
      return {
        conclusion,
        playerWins,
        topic: debate.topic,
        playerPosition: debate.playerPosition
      }
    },
    
    // 保存状态到本地存储
    saveState() {
      localStorage.setItem('gameStore', JSON.stringify({
        gameHistory: this.gameHistory,
        translationGame: this.translationGame,
        redPacketGame: this.redPacketGame,
        debateGame: this.debateGame
      }))
    },
    
    // 从本地存储加载状态
    loadState() {
      const savedState = localStorage.getItem('gameStore')
      if (savedState) {
        const state = JSON.parse(savedState)
        this.gameHistory = state.gameHistory || []
        this.translationGame = state.translationGame || {
          questions: [],
          currentQuestion: null,
          score: 0,
          highScore: 0,
          gamesPlayed: 0
        }
        this.redPacketGame = state.redPacketGame || {
          rewards: [],
          lastReward: null,
          totalRewards: 0,
          gamesPlayed: 0
        }
        this.debateGame = state.debateGame || {
          debates: [],
          currentDebate: null,
          wins: 0,
          losses: 0,
          gamesPlayed: 0
        }
      }
    }
  }
})