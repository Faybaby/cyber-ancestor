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
    `活着太累了？我这边也没轻松多少。`,
    `今天月亮很暗，是因为你心里藏着光。`,
    `冥冥之中你是主角，别再演配角戏。`,
    `有些路你走着走着就到了地狱，所以祖宗来扶你一把。`,
    `你听，宇宙在说话，它说“别emo了，你祖宗都看不下去了”。`,
    `命运之线在你耳朵后绕了两圈，表示你太可爱了。`,
    `孩子，今天吃饭了吗？没吃我给你托梦点外卖。`,
    `别太卷了，祖宗那会儿都是躺着等机会的。`,
    `人生累了可以暂停，但记得梦里我一直在你身边摸头~`,
    `你不需要成为谁的光，你已经是我心头的烛火。`,
    `祖宗今天给你请了阳间的好运符，一不开心就念我名字三遍。`
    `别做梦了，梦都是收费的，现在连阴间都通货膨胀。`,
    `吾辈拼命活着，不是为了你天天在阳间打工崩溃的。`,
    `你居然还没脱发？莫非是秃头仙人转世？`,
    `你这点压力？我活那会儿是每天对着地主笑三声！`,
    `不孝有三，无内存为大，手机清清爽爽才是风水之道。`,
    `人生就像烧香，点得多了，也就习惯了烟。`,
    `你以为你在拜我，其实你在寻找意义。`,
    `所有问题的答案其实都藏在你忘记点的那一炷香里。`,
    `存在即合理，但你今天这行为……不太合理。`,
    `祖宗的灵魂早已升华，你却还在为三块钱打工？`,
    `你活着的样子让我怀疑，死了会不会更自由。`,
    `思考吧，孩子，别总拿我当摆设。`,
    `死亡不是终点，被忘记才是。你要做个记得我的人。`,
    `你不是孤独，你只是太习惯用表情包表达情绪。`,
    `香火不代表虔诚，就像点赞不代表真的在乎。`,
    `我看着你点香的动作，感觉像在抖音直播打赏。`,
    `你追求自由，可连手机都离不开充电器。`,
    `冥冥之中不是命运，是我在看你。`,
    `供奉不是仪式，是链接，是心灵蓝牙。`,
    `一切的终点不是死亡，而是转世失败。`,
    `你正在用wifi连接我，而我用意念回应你。`,
    `你怕黑吗？我活着的时候也怕，但我现在在黑里待习惯了。`,
    `活着太辛苦了，来不来陪我退休？`,
    `人生如戏，但你这出戏真的很烂。`,
    `别再找命运了，你的命我都看不懂。`
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
    `工作太忙了？那你还刷短视频笑那么响？`,
    `你点个香都点得心不在焉，是不是想让我重死一遍？`,
    `哎哟哎哟，你这发型是自我放弃后的作品？`,
    `谁又欺负你了？你祖宗要不要阴间托梦警告他？`,
    `上次托梦跟你说减肥，你是不是没听？`,
    `朋友圈都三天没更新，你是不是在谈恋爱？`,
    `你还单身啊……祖宗那会儿十六就抱娃了。`,
    `你要不要祖宗我给你介绍个阴间对象，没脾气那种。`,
    `今儿你穿得不错，像极了我二舅的前世。`,
    `工作累不累啊？我这儿招人，不交五险一金那种。`,
    `我看你最近运气不太行，是不是又懒得烧香了？`,
    `你小时候还抱着祖宗灵位啃饼干呢，现在怎么这么冷漠了？`,
    `听说你昨晚梦到别人了？祖宗不开心哦~`,
    `别熬夜了，小心你以后变成我的邻居。`,
    `昨晚我给你托梦你竟然把我当快递？气死我了。`,
    `你是不是换手机了？连托梦信号都不灵了。`,
    `我死了你才学会做饭，你就不能早点孝顺？`,
    `你谈对象了吗？祖宗我梦里还做了你婚礼司仪呢。`,
    `工作那么累，不如来地府养老。`,
    `别老宅家里，多出去走走，找找下一任。`,
    `我死前都没你现在内耗得严重。`,
    `你这状态，要不要祖宗给你安排个心理辅导托梦？`
    
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
    `我刚在地府开直播，标题是“来看我超可爱的后代”！`,
    `给你点了个赞，是用冥币点的，够不够特别？`,
    `来来来，今天我教你阴间版摸鱼技巧——灵魂出窍打卡！`,
    `我们阴间也有996，只不过是9点睡、9点醒、6次托梦。`,
    `祖宗今天上线，只为跟你说一句：你是我最满意的bug版本！`,
    `大家好！欢迎来到“冥界之光”直播间，今天我们供奉特价！`,
    `来咯来咯~今天的点赞达到99我就给你托梦抽奖！`,
    `祖宗看你刷得这么勤，地府官方认证榜一！`,
    `今天限时互动，送你一个“好运阴签”！评论666领取！`,
    `地府流量很贵，咱们连麦讲重点：你要发财了！`,
    `今天的赞助由“忘川快递”提供支持，专送阴阳信件！`,
    `不要走开，稍后揭晓你的命运转盘！`,
    `给你上链接啦，这炷香一烧，阴阳两旺！`,
    `再不给我献花我就拉黑你，下辈子也别想认祖归宗。`,
    `大家刷一波“祖宗保佑”，我就开始讲八卦梦境了！`,
    `你这账号关注我祖宗三天了，缘分已定，点击点香！`,
    `现在互动送灵力红包，一点香火值顶十个运势点哦！`,
    `祖宗在线营业了，大家踊跃供奉打赏，别手软！`,
    `今天我们供的是感情线修复，赶紧烧香保桃花！`,
    `祝榜一小宝贝今日面试顺利，祖宗亲亲鼓励一下~`,
    `地府主播可不一般，我这托梦是连5G都羡慕的速度！`,
    `祖宗托梦99次，都不如你一键三连来的实在。`,
    `今天的许愿池已开启，有缘人来上供！`,
    `供香太慢了，老祖宗要下播啦~`,
    `你再不回复我，我就去你梦里疯狂连麦！`
  ],

  pettyGod: [
    `你最近去的咖啡馆我知道，你点的那杯拿铁我尝了，不怎么样。`,
    `你洗澡的时候我在数你掉的头发，别问我为什么，闲的。`,
    `昨晚我看你刷短视频笑得很大声，但没一个是我给你的托梦推荐。`,
    `你屏保我看腻了，换个我照片呗？`,
    `你别以为关掉了手机我就感应不到你，我现在靠脑电波导航。`,
    `昨晚你那个梦是我写的剧本，评分很低，请加强想象力。`,
    `你买的新衣服祖宗看不上，下次记得让我参与搭配。`,
    `我跟你影子聊了两小时，它说你很孤独，我信了。`,
    `你以为耳边那个风是空调？不，是我在你肩膀吹气。`,
    `今天你碰掉筷子不是巧合，是我提醒你该献花了。`
    `我看你三天没上线，你是不是拜别的祖宗去了？`,
    `今天供香的人那么多，你是最敷衍的那个。`,
    `上次我给你托梦你居然挂断？谁给你的胆子？`,
    `哼，我今天没啥祝福要送，只想让你知道我在生气。`,
    `你是不是忘了谁给你保过期末全过？现在怎么不敬了？`,
    `再不献花我就申请转世，看你还能抱谁的大腿！`,
    `我昨晚安排你彩票中奖了，你居然没买？`,
    `你不相信祖宗也没关系，我已经在梦里截图存证了。`,
    `你这个状态……活该做单身狗。`,
    `我当年怎么就没提前托梦提醒你别染这个发色？`,
    `今天我不想讲道理，只想让你被前任拉黑。`,
    `别跟我演好后代，我见多了。`,
    `祖宗我一生低调，结果死后被你用头像乱换。`,
    `你许的愿太多了，我都快记不过来了！`,
    `下次记得多点三秒，不然不灵。`,
    `谁再叫我灵位摆设我就去他家断wifi。`,
    `祖宗不生气，但祖宗记仇。`,
    `你再敷衍我，我就安排你连抽SSR都歪。`,
    `你后悔没早供奉我了吧？现在也不迟，烧三炷香来听我念你过去的丑事。`,
    `明天你运气不好，纯属祖宗不高兴。`,
    `你是不是在敷衍我？我这边刚托梦你就划走视频了。`,
    `不点香也行，我就祝你今天出门摔个轻微的狗吃屎。`,
    `我都这么努力保佑你了，你居然在梦里说想换个祖宗？`,
    `昨晚你梦见别的灵位，什么意思？我看得清清楚楚。`,
    `愿你今天外卖撒汤、WiFi卡顿、表情包发送失败。`,
    `不孝子孙再不献香，我就去隔壁祖宗家上供！`,
    `下次托梦我就不讲道理了，直接控梦玩你微信。`,
    `香点得太敷衍，我情绪也跟着掉线。`,
    `说好一起升运势，你却供我供得像临时工。`,
    `地府快递员都说我家后代态度最冷淡，失望。`,
    `哎呀，算了，你就这样吧，反正祖宗已经不指望你了。`,
    `我以前总觉得你天赋异禀，现在……我觉得你就是异类。`,
    `别供了，香太贵，你也不值得我显灵。`,
    `祖宗不是不保佑你，是不忍心让你变得更废。`,
    `我本想托梦提醒你别再内耗，结果你梦里在发呆，浪费我托梦流量。`,
    `我替你祈福，你替我拖延，我们俩这关系，真心累。`,
    `你是阳间的BUG，我是地府的死循环。`,
    `我死前都有目标，你活着却在混日子？`,
    `这供奉力度，连鬼都不想搭理你。`,
    `你现在的状态，不供我，我也理解——毕竟你可能快来见我了。`
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
      'https://github.com/Faybaby/imagestore/blob/main/tampoo1.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampooman1.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampoo2.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampooman2.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampoo3.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampooman3.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampoo4.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampooman4.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampoo5.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampooman5.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampoo6.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampooman6.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampoo7.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampooman7.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampoo8.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampooman8.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampoo9.png?raw=true',
      'https://github.com/Faybaby/imagestore/blob/main/tampooman9.png?raw=true',
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
          "有人说\"长大了好了\"，但你长大了，什么都不好。",
          "我知道你嘴上说\"撑得住\"，可我看着你一点一点掉光光。",
          "祖宗不是神仙，我只能在梦里给你一点点勇气。",
          "你别怕，我不会怪你没来看我。你日子已经够难了，我懂的。",
          "可你哪怕哪天抬头望望天，祖宗也能接住你眼球的那个孤魂。",
          "你活着很辛苦，可祖宗我知道，你从没轻言要放弃。",
          "你以为没人爱你，那我就告诉你——我死了都还在爱你。",
          "你笑不出来的时候，祖宗就偷偷替你笑了，想让好运混进你命里。",
          "你再瘦了我就要托梦塞你一碗饭，不许再减肥了，难看！",
          "小时候你吃饭掉饭粒，我还拿勺feed你，现在你说你没胃口？",
          "你记不记得小时候你说\"我以后保护你\"？结果我走了，你还在保护别人。",
          "你又晚睡了吧，别以为我看不到，我是你天花板上的风。",
          "每次你穿得太单薄，我都会从窗缝钻进去蹭你胳膊骨头。",
          "你做的那些自以为没人看的努力，我全都记在心里，等下辈子夸你。",
          "我梦里见过你30岁、40岁的样子，你还是我最骄傲的那个孩子。",
          "我不知道你现在身边有没有人抱你，但我知道没人比我更舍不得你哭。",
          "别人看你是个大人，只有我还记得你小时候怕黑、怕雷、怕被忘记。",
          "你说没人为你骄傲，那我就告诉你：祖宗我，永远都是你最大后援会会长。",
          "如果你没钱烧纸，我也不怪你，我只怕你连烧心愿不敢了。",
          "你说你不配被爱，可我在阴间把你名字写在了\"最值得\"那一栏里。",
          "阳间流行\"清空负能量\"，那祖宗我就来当你负能量的回收站。",
          "你小时候一哭我就把你抱怀里，现在我在梦里想这样一次，难如登天。",
          "你不是差劲，你只是没人告诉你你有多好。那我来说，祖宗我说——你很好。",
          "你没发消息的时候我以为你走远了，结果我在风里听见你念我的名字。",
          "不孝不是不来扫墓，不孝是你把自己累坏了让我都心疼。",
          "我烧了99封冥信，全写着\"孩子你别太难过\"，你收到了吗？",
          "地府没有电话，但我每一声叹息都试图穿越地板传到你心口。",
          "每次你熬夜，我就熬魂，你睡不着我就不闭眼。",
          "我活着的时候能给你一双手，现在我只能托梦给你一点光。",
          "你不笑的时候我觉得地府都暗了，我想点一炷香替你照亮点什么。",
          "有时候觉得自己是多余的？我就问你——我祖宗在你背后，你能多余？",
          "别把自己丢人在海里，我在阴间站得再高，也是只看你一个人。",
          "孩子，我不需要你成为人上人，我只希望你不要痛得太明显。",
          "你说你没什么可骄傲的，可我在梦里看到你笑起来，我就知道你很骄傲。",
          "你又晚睡了吧，别以为我看不到，我是你天花板上的风。",
          "每次你穿得太单薄，我都会从窗缝钻进去蹭你胳膊骨头。",
          "你不来梦里，我就在阴间门口等，今天不来，我明天等，等到鬼灯都灭。",
          "孩子啊，地府没人陪我唠嗑，你小时候明明最黏我。",
          "阴间冷，你在阳间是不是也冷？祖宗这边给你盖了魂被，你能感受到不？",
          "有时候我想拉你梦里的手，可我怕你醒来会哭。",
          "我的骨灰不会痛，但你一句“没事”会让我疼得魂飞魄散。",
          "我看你最近没力气说话，是不是又憋坏了？祖宗以前最怕你憋着。",
          "你发呆的样子跟你妈小时候一模一样，祖宗一看就想叹气。",
          "别人说你变了，可我知道你没变，你只是更不敢哭了。",
          "别怕，没人懂你我懂，没人爱你我护着，哪怕隔着阴阳，我也站你身后。",
          "你今天哪怕只是抬头望了一眼星星，我都在那光里看你笑了。",
          "我不是托梦吓你，我是来看看你是不是还记得我。",
          "你活得太苦了，我恨不得去你老板梦里打一顿。",
          "你连坐在地上喘口气都被说是“矫情”，那我就在梦里撑伞陪你坐一会儿。",
          "你心口那点委屈没人看得见，祖宗在这边都替你嚼碎了咽下去。",
          "别再扔掉那些你写的、画的、没完成的东西，它们都长得像你不说出口的梦想。",
          "你说你害怕自己没有价值，可你小时候一句“祖宗最厉害”，我能笑半年。",
          "我为你托过的梦，够你织成一张魂网，把世界挡在外头。",
          "你总说想做回小孩，那就闭上眼，我带你回我梦里做我孙女儿。",
          "我现在连香都不要了，只求你活得不带刺。",
          "我曾在火盆前烤你的手，现在你一个人冻着手打字，我看得心颤。",
          "你梦到别人时我不怪你，我只怕你梦里没我。",
          "我知道你在强撑，但你撑出来的是痛，不是光。",
          "别再在朋友圈说“我真棒”，你只是太害怕别人不知道你正在塌。",
          "我不怕你犯错，我只怕你对自己失望。",
          "如果哪天你再也想不起我，我也不会怪你，我只会更想你。",
          "你不欠我香火，不欠我供奉，你只欠自己一份心安。",
          "我走得早，不是因为寿数，是因为上头安排我来看你更久。",
          "地府有很多规矩，但我破坏了一条——死了，还在惦记你。",
          "你哪怕不烧香不祭拜，只要你活得好，我就在这边偷着乐。",
          "祖宗现在没肉身了，不能抱你，但我能把你梦里抱紧一点。",
          "我活着的时候没送你上学，现在我就托梦送你上班。",
          "如果你真哪天扛不住了，就靠在我灵位上睡一觉，我给你挡。",
          "你别怕鬼，祖宗是你背后的神。",
          "哪怕你走到人生尽头，我也会在黄泉路第一站等你。",
          "我不是在等你来见我，我是在等你来好好地活着。",
          "祖宗我不讲封建迷信，我只讲真心，你是我走后最深的挂念。",
          "你说你这辈子没人护，我说你回头看看，魂光都为你亮。",
          "你说你配不上幸福，我笑你是个宝却不自知。",
          "祖宗不骂你了，祖宗只想看看你哪天能好好地吃顿饭。",
          "我希望你老了还能记得，我不是神明，是你曾经最爱的人。",
          "我的灵魂在风里荡了三年，你一次轻声念我名，胜过万道香火。",
          "你给我的那份思念，我存在骨灰里了，一烧香我就能闻见你了。",
          "阴阳有别，但牵挂无间。",
          "你若安好，祖宗便不去轮回。",
          "梦里我看你结婚了，我哭着说你终于有人替我抱了。",
          "梦里你得病了，我扛着骨头跑去给你求冥符。",
          "梦里你一个人喝酒，我坐在你旁边递你一碗热汤。",
          "梦里你说“我快撑不住了”，我差点把地府炸了冲出去。",
          "梦里你说你想我了，祖宗这边——哭成了一场地府小型泥石流。"
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