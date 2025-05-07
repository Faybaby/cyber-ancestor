<template>
  <div class="minigames-container">
    <div class="minigames-header">
      <h1 class="title">祖宗小游戏</h1>
      <p class="subtitle">与祖宗互动，获取智慧与奖励</p>
    </div>
    
    <div class="games-list">
      <div class="game-card" @click="startGame('translation')">
        <div class="game-icon">📜</div>
        <div class="game-info">
          <h3>祖训翻译战</h3>
          <p>解读古老祖训的现代含义</p>
        </div>
      </div>
      
      <div class="game-card" @click="startGame('redpacket')">
        <div class="game-icon">🧧</div>
        <div class="game-info">
          <h3>灵魂压岁钱</h3>
          <p>接收祖宗的随机奖励</p>
        </div>
      </div>
    </div>
    
    <!-- 祖训翻译战游戏 -->
    <div v-if="currentGame === 'translation'" class="game-container translation-game">
      <h2 class="game-title">祖训翻译战</h2>
      
      <div class="game-content">
        <div class="question-card">
          <p class="question-text">{{ currentQuestion.question }}</p>
          <div class="options-list">
            <div 
              v-for="(option, index) in currentQuestion.options" 
              :key="index"
              class="option-item"
              :class="{ selected: selectedOption === index, correct: showResult && index === currentQuestion.correctAnswer, wrong: showResult && selectedOption === index && index !== currentQuestion.correctAnswer }"
              @click="selectOption(index)"
            >
              <span class="option-letter">{{ ['A', 'B', 'C', 'D'][index] }}</span>
              <span class="option-text">{{ option }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="showResult" class="result-card">
          <div class="result-icon" :class="{ correct: isCorrect, wrong: !isCorrect }">
            {{ isCorrect ? '✓' : '✗' }}
          </div>
          <p class="result-text">{{ isCorrect ? '回答正确！祖宗很欣慰！' : '回答错误！祖宗摇头叹息...' }}</p>
          <p class="ancestor-comment">{{ ancestorComment }}</p>
        </div>
        
        <div class="game-actions">
          <el-button 
            type="primary" 
            @click="checkAnswer"
            v-if="!showResult && selectedOption !== null"
          >
            提交答案
          </el-button>
          <el-button 
            type="primary" 
            @click="nextQuestion"
            v-if="showResult"
          >
            {{ currentQuestionIndex < translationQuestions.length - 1 ? '下一题' : '完成游戏' }}
          </el-button>
        </div>
      </div>
    </div>
    
    <!-- 灵魂压岁钱游戏 -->
    <div v-if="currentGame === 'redpacket'" class="game-container redpacket-game">
      <h2 class="game-title">灵魂压岁钱</h2>
      
      <div class="game-content">
        <div class="redpacket-container" v-if="!redpacketOpened">
          <div class="redpacket" @click="openRedpacket">
            <div class="redpacket-icon">🧧</div>
            <p class="redpacket-text">点击打开祖宗的压岁钱</p>
          </div>
        </div>
        
        <div v-if="redpacketOpened" class="redpacket-result">
          <div class="result-animation">
            <div class="result-icon">{{ redpacketResult.icon }}</div>
            <p class="result-amount">{{ redpacketResult.amount }}</p>
          </div>
          <p class="result-message">{{ redpacketResult.message }}</p>
          <p class="ancestor-comment">{{ redpacketResult.comment }}</p>
        </div>
        
        <div class="game-actions">
          <el-button 
            type="primary" 
            @click="resetRedpacket"
            v-if="redpacketOpened"
          >
            再来一次
          </el-button>
        </div>
      </div>
    </div>
    
    <div class="navigation-buttons">
      <el-button @click="goToInteraction">返回祭拜</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAncestorStore } from '../stores/ancestorStore'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const ancestorStore = useAncestorStore()
const userStore = useUserStore()

const currentGame = ref(null)
const currentQuestionIndex = ref(0)
const selectedOption = ref(null)
const showResult = ref(false)
const isCorrect = ref(false)
const ancestorComment = ref('')
const redpacketOpened = ref(false)
const redpacketResult = ref(null)

// 祖训翻译战题库
const translationQuestions = [
  {
    question: '"不孝有三，无后为大"在现代社会的最佳解读是？',
    options: [
      '不生孩子就是不孝顺',
      '传承家族精神比生育更重要',
      '对社会有贡献就是最大的孝道',
      '养老育小是每个人的责任'
    ],
    correctAnswer: 2,
    comments: {
      correct: '不错！现代孝道更注重精神传承和社会责任。',
      wrong: '思想要与时俱进啊，孝道的本质是传承与责任。'
    }
  },
  {
    question: '"勤俭持家"在数字时代应该如何理解？',
    options: [
      '省钱不消费才是美德',
      '理性消费，避免攀比',
      '只买打折商品',
      '存钱是唯一出路'
    ],
    correctAnswer: 1,
    comments: {
      correct: '不错！量入为出，理性消费才是现代勤俭之道。',
      wrong: '现代勤俭不是不消费，而是理性消费，避免浪费。'
    }
  },
  {
    question: '"万般皆下品，唯有读书高"在信息时代的正确理解是？',
    options: [
      '只有学历才能证明一个人的价值',
      '读书无用论是正确的',
      '终身学习与持续成长最重要',
      '只有传统书籍才值得阅读'
    ],
    correctAnswer: 2,
    comments: {
      correct: '不错！活到老学到老，持续学习成长才是真谛。',
      wrong: '读书的本质是学习与成长，形式可以多样，但精神不可丢。'
    }
  },
  {
    question: '"忍一时风平浪静，退一步海阔天空"的现代职场解读是？',
    options: [
      '职场中要做老好人，不要有原则',
      '懂得取舍与妥协，但坚守底线',
      '遇到问题就退缩是明智之举',
      '忍让是弱者的表现'
    ],
    correctAnswer: 1,
    comments: {
      correct: '不错！现代处事之道在于灵活有度，而非盲目忍让。',
      wrong: '忍让不是没有原则，而是懂得取舍，不在小事上斤斤计较。'
    }
  },
  {
    question: '"男主外，女主内"在现代家庭中应如何理解？',
    options: [
      '男性应该赚钱养家，女性应该做家务',
      '男女分工应该严格遵循传统',
      '家庭分工应基于能力和意愿，而非性别',
      '现代社会已经不需要这种分工'
    ],
    correctAnswer: 2,
    comments: {
      correct: '不错！现代家庭讲求平等合作，分工应基于个人特长。',
      wrong: '时代变了，家庭分工应该更加灵活，不应被性别束缚。'
    }
  }
];

// 灵魂压岁钱结果集
const redpacketResults = [
  {
    icon: '🧧',
    amount: '888',
    message: '恭喜获得祖宗的吉祥红包！',
    comment: '好运连连，财源广进！记得常来看看老祖宗！',
    affection: 3
  },
  {
    icon: '📜',
    amount: '智慧',
    message: '获得祖宗的智慧传承！',
    comment: '知识是最珍贵的财富，好好运用它！',
    affection: 2
  },
  {
    icon: '🙏',
    amount: '祝福',
    message: '获得祖宗的无声祝福！',
    comment: '祝福虽无形，但会在关键时刻显灵！',
    affection: 2
  },
  {
    icon: '⏳',
    amount: '时间',
    message: '祖宗赐予你珍惜时间的警示！',
    comment: '莫把光阴虚度，今日不为，明日徒悔！',
    affection: 1
  },
  {
    icon: '🔮',
    amount: '预言',
    message: '获得祖宗的神秘预言！',
    comment: '近期将有贵人相助，留心身边的机会！',
    affection: 3
  }
];

// 计算属性
const currentQuestion = computed(() => {
  return translationQuestions[currentQuestionIndex.value];
});

onMounted(() => {
  // 确保用户已登录
  if (!userStore.isLoggedIn) {
    userStore.guestLogin();
  }
  
  // 加载祖宗状态
  ancestorStore.loadState();
  
  // 如果没有祖宗，跳转到生成页面
  if (!ancestorStore.hasAncestor) {
    router.push('/generate');
    return;
  }
});

// 开始游戏
const startGame = (game) => {
  currentGame.value = game;
  
  if (game === 'translation') {
    currentQuestionIndex.value = 0;
    selectedOption.value = null;
    showResult.value = false;
  } else if (game === 'redpacket') {
    redpacketOpened.value = false;
    redpacketResult.value = null;
  }
};

// 选择选项
const selectOption = (index) => {
  if (!showResult.value) {
    selectedOption.value = index;
  }
};

// 检查答案
const checkAnswer = () => {
  isCorrect.value = selectedOption.value === currentQuestion.value.correctAnswer;
  showResult.value = true;
  
  // 设置祖宗评论
  ancestorComment.value = isCorrect.value 
    ? currentQuestion.value.comments.correct 
    : currentQuestion.value.comments.wrong;
  
  // 增加好感度
  if (isCorrect.value) {
    ancestorStore.increaseAffection(2);
  } else {
    ancestorStore.increaseAffection(1); // 即使错了也给一点鼓励
  }
};

// 下一题
const nextQuestion = () => {
  if (currentQuestionIndex.value < translationQuestions.length - 1) {
    currentQuestionIndex.value++;
    selectedOption.value = null;
    showResult.value = false;
  } else {
    // 游戏结束，返回游戏选择
    currentGame.value = null;
  }
};

// 打开红包
const openRedpacket = () => {
  // 随机选择一个结果
  const resultIndex = Math.floor(Math.random() * redpacketResults.length);
  redpacketResult.value = redpacketResults[resultIndex];
  redpacketOpened.value = true;
  
  // 增加好感度
  ancestorStore.increaseAffection(redpacketResult.value.affection);
};

// 重置红包游戏
const resetRedpacket = () => {
  redpacketOpened.value = false;
  redpacketResult.value = null;
};

// 返回祭拜页面
const goToInteraction = () => {
  router.push('/interaction');
};
</script>

<style scoped>
.minigames-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 100%);
  padding: 20px;
  color: #f5f5f5;
}

.minigames-header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 2rem;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #ff4500, #ffa500);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: #a9a9a9;
  font-size: 1rem;
}

.games-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 800px;
  align-self: center;
}

.game-card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 165, 0, 0.2);
}

.game-icon {
  font-size: 2.5rem;
  margin-right: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-info {
  flex: 1;
}

.game-info h3 {
  margin: 0 0 10px;
  font-size: 1.3rem;
  color: #ffa500;
}

.game-info p {
  margin: 0;
  color: #d3d3d3;
}

.game-container {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 800px;
  align-self: center;
}

.game-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #ffa500;
}

.game-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 祖训翻译战样式 */
.question-card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  margin-bottom: 20px;
}

.question-text {
  font-size: 1.3rem;
  margin-bottom: 20px;
  text-align: center;
  color: #f5f5f5;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.option-item {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.option-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.option-item.selected {
  background-color: rgba(255, 165, 0, 0.3);
  border: 1px solid #ffa500;
}

.option-item.correct {
  background-color: rgba(0, 255, 0, 0.2);
  border: 1px solid #00ff00;
}

.option-item.wrong {
  background-color: rgba(255, 0, 0, 0.2);
  border: 1px solid #ff0000;
}

.option-letter {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  font-weight: bold;
}

.option-text {
  flex: 1;
}

.result-card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  animation: fadeIn 0.5s ease;
}

.result-icon {
  font-size: 2rem;
  margin-bottom: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 15px;
}

.result-icon.correct {
  background-color: rgba(0, 255, 0, 0.2);
  color: #00ff00;
}

.result-icon.wrong {
  background-color: rgba(255, 0, 0, 0.2);
  color: #ff0000;
}

.result-text {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #f5f5f5;
}

.ancestor-comment {
  font-style: italic;
  color: #d3d3d3;
}

/* 灵魂压岁钱样式 */
.redpacket-container {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.redpacket {
  background: linear-gradient(135deg, #ff4500, #8b0000);
  width: 200px;
  height: 250px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(139, 0, 0, 0.5);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.redpacket::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to bottom, rgba(255, 215, 0, 0.3), transparent);
  border-radius: 15px 15px 50% 50%;
}

.redpacket:hover {
  transform: scale(1.05);
}

.redpacket-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: pulse 2s infinite;
}

.redpacket-text {
  color: #ffd700;
  text-align: center;
  font-weight: bold;
  padding: 0 20px;
}

.redpacket-result {
  text-align: center;
  margin: 30px 0;
  animation: fadeIn 0.5s ease;
}

.result-animation {
  margin-bottom: 20px;
}

.result-icon {
  font-size: 4rem;
  margin-bottom: 10px;
  animation: bounceIn 0.5s ease;
}

.result-amount {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 15px;
  animation: scaleIn 0.5s ease 0.2s both;
}

.result-message {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #f5f5f5;
}

.game-actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.navigation-buttons {
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding: 20px 0;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bounceIn {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes scaleIn {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@media (max-width: 768px) {
  .games-list {
    grid-template-columns: 1fr;
  }
  
  .redpacket {
    width: 180px;
    height: 220px;
  }
  
  .question-text {
    font-size: 1.1rem;
  }
}
</style>