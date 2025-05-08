<template>
  <div class="generate-container">
    <div class="generate-card">
      <h1 class="title">生成你的专属祖宗</h1>
      
      <div class="input-section">
        <p class="description">输入你的姓氏，或随机生成一位祖宗</p>
        
        <el-input 
          v-model="surname" 
          placeholder="请输入姓氏（可选）" 
          class="surname-input"
          maxlength="1"
          :disabled="generating"
        >
          <template #append>
            <el-button @click="randomSurname" :disabled="generating">随机</el-button>
          </template>
        </el-input>
        
        <el-button 
          type="primary" 
          class="generate-button" 
          @click="generateAncestor"
          :loading="generating"
          :disabled="generating"
        >
          {{ generating ? '正在生成...' : '生成祖宗' }}
        </el-button>
      </div>
      
      <div v-if="generationComplete" class="result-section">
        <div class="ancestor-card" id="ancestor-card">
          <div class="ancestor-avatar">
            <img :src="placeholderAvatar" alt="祖宗头像">
          </div>
          
          <div class="ancestor-info">
            <h2 class="ancestor-name">{{ currentAncestor.fullName }}</h2>
            <div class="ancestor-traits">
              <el-tag v-for="(trait, index) in currentAncestor.traits" :key="index" effect="dark">
                {{ trait }}
              </el-tag>
            </div>
            <p class="ancestor-quote typing" v-html="typedQuote"></p>
            <!-- <p class="ancestor-quote">{{ currentAncestor.quotes.greeting }}</p> -->
          </div>
        </div>
        
        <div class="action-buttons">
          <el-button type="primary" @click="goToInteraction">开始祭拜</el-button>
          <el-button @click="resetGeneration">重新生成</el-button>
        </div>
      </div>
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

const surname = ref('')
const generating = ref(false)
const generationComplete = ref(false)
const typedQuote = ref('')
const fullQuote = ref('')
const typingIndex = ref(0)
const typingSpeed = ref(28)

// 祖宗头像 - 使用当前祖宗的头像或默认头像
const placeholderAvatar = computed(() => {
  if (currentAncestor.value && currentAncestor.value.avatar) {
    return currentAncestor.value.avatar
  }
  return '/assets/ancestors/default-ancestor.png'
})

const currentAncestor = computed(() => ancestorStore.currentAncestor || {})

onMounted(() => {
  // 确保用户已登录
  if (!userStore.isLoggedIn) {
    userStore.guestLogin()
  }
  
  // 加载祖宗状态
  ancestorStore.loadState()
  
  // 移除这段代码，不再自动显示结果
  // if (ancestorStore.hasAncestor) {
  //   generationComplete.value = true
  // }
})

// 随机姓氏
const randomSurname = () => {
  const commonSurnames = ['张', '王', '李', '赵', '陈', '刘', '杨', '黄', '周', '吴']
  surname.value = commonSurnames[Math.floor(Math.random() * commonSurnames.length)]
}

// 生成祖宗
const generateAncestor = async () => {
  generating.value = true
  
  try {
    // 模拟生成过程的延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 生成祖宗
    ancestorStore.generateAncestor(surname.value)
    
    // 更新用户偏好
    if (surname.value) {
      userStore.updatePreferences({
        ancestorTypePreference: surname.value
      })
    }
    
    // 显示祖宗的问候语，使用打字机效果
    if (currentAncestor.value && currentAncestor.value.quotes && currentAncestor.value.quotes.greeting) {
      showTypingQuote(currentAncestor.value.quotes.greeting)
    }
    
    generationComplete.value = true
  } catch (error) {
    console.error('生成祖宗失败:', error)
    // 显示错误提示
  } finally {
    generating.value = false
  }
}

// 重置生成
const resetGeneration = () => {
  generationComplete.value = false
  surname.value = ''
}

// 前往互动页面
const goToInteraction = () => {
  router.push('/interaction')
}

// 打字机效果函数
const showTypingQuote = (quote) => {
  fullQuote.value = quote
  typedQuote.value = ''
  typingIndex.value = 0
  typeNextChar()
}

const typeNextChar = () => {
  if (typingIndex.value < fullQuote.value.length) {
    typedQuote.value += fullQuote.value[typingIndex.value]
    typingIndex.value++
    setTimeout(typeNextChar, typingSpeed.value)
  }
}
</script>

<style scoped>
.generate-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 100%);
  padding: 20px;
}

.ancestor-quote.typing {
  white-space: pre-line;
  font-style: italic;
  color: #d3d3d3;
  line-height: 1.6;
  font-size: 16px;
  font-family: "Noto Serif SC", serif;
  overflow-wrap: break-word;
  word-break: break-word;
  min-height: 4em;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 可选：祖宗打字光标 */
.typing::after {
  content: "▋";
  animation: blink 1s infinite;
  color: #aaa;
  font-weight: bold;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.generate-card {
  width: 100%;
  max-width: 600px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  color: #f5f5f5;
  text-align: center;
}

.title {
  font-size: 2rem;
  margin-bottom: 30px;
  background: linear-gradient(45deg, #ff4500, #ffa500);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  margin-bottom: 20px;
  color: #a9a9a9;
}

.input-section {
  margin-bottom: 30px;
}

.surname-input {
  margin-bottom: 20px;
}

.generate-button {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
  background: linear-gradient(45deg, #ff4500, #ffa500);
  border: none;
}

.result-section {
  margin-top: 30px;
}

.ancestor-card {
  display: flex;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: left;
}

.ancestor-avatar {
  flex: 0 0 100px;
  margin-right: 20px;
}

.ancestor-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ffa500;
}

.ancestor-info {
  flex: 1;
}

.ancestor-name {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #ffa500;
}

.ancestor-traits {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.ancestor-quote {
  white-space: pre-line; /* ✨让换行生效！ */
  font-style: italic;
  color: #d3d3d3;
  line-height: 1.5;
  font-size: 16px;
  margin-top: 10px;
}


.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

@media (max-width: 768px) {
  .generate-card {
    padding: 20px;
  }
  
  .ancestor-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .ancestor-avatar {
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>