<template>
  <div class="interaction-container">
    <div class="ancestor-section">
      <div class="ancestor-card" :class="[currentEmotionState]">
        <div class="ancestor-avatar">
          <img :src="placeholderAvatar" alt="祖宗头像">
          <div class="emotion-ring" :class="[currentEmotionState]"></div>
        </div>
        
        <div class="ancestor-info">
          <h2 class="ancestor-name">{{ currentAncestor.fullName }}</h2>
          <div class="ancestor-traits">
            <span v-for="(trait, index) in currentAncestor.traits" :key="index" class="trait-tag">
              {{ trait }}
            </span>
          </div>
          <div class="evolution-stage">
            <span class="stage-label">{{ evolutionStageText }}</span>
            <div class="emotion-slider">
              <div class="emotion-track">
                <div class="emotion-fill" :style="{ width: `${affectionPercentage}%` }"></div>
              </div>
              <div class="emotion-emoji" :class="[currentEmotionState]"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="quote-bubble" v-if="currentQuote">
        <p class="ancestor-quote typing" v-html="typedQuote"></p>
      </div>
    </div>
    
    <div class="interaction-actions">
      <div class="action-title">祭拜互动</div>
      <div class="action-buttons">
        <div class="action-button" @click="performInteraction('incense')" :class="{disabled: !canInteract}">
          <div class="action-icon incense-icon">🧨</div>
          <div class="action-name">点香</div>
        </div>
        
        <div class="action-button" @click="performInteraction('flowers')" :class="{disabled: !canInteract}">
          <div class="action-icon flowers-icon">💐</div>
          <div class="action-name">献花</div>
        </div>
        
        <div class="action-button" @click="performInteraction('kowtow')" :class="{disabled: !canInteract}">
          <div class="action-icon kowtow-icon">🙇</div>
          <div class="action-name">叩首</div>
        </div>
      </div>
    </div>
    
    <div class="navigation-buttons">
      <el-button @click="goToQuotes">今日语录</el-button>
      <el-button @click="goToShare">分享祖宗</el-button>
      <el-button type="primary" @click="goToMiniGames">小游戏</el-button>
    </div>
    
    <el-dialog
      v-model="cooldownDialog"
      title="祖宗提示"
      width="80%"
      center
    >
      <p>{{ cooldownMessage }}</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cooldownDialog = false">知道了</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAncestorStore } from '../stores/ancestorStore'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const ancestorStore = useAncestorStore()
const userStore = useUserStore()

const currentQuote = ref('')
const typedQuote = ref('')
const fullQuote = ref('')
const typingIndex = ref(0)
const typingSpeed = ref(28) // 与Generate.vue保持一致的打字速度
const cooldownDialog = ref(false)
const cooldownMessage = ref('')
const currentEmotionState = ref('neutral')

// 祖宗头像 - 使用当前祖宗的头像或默认头像
const placeholderAvatar = computed(() => {
  if (currentAncestor.value && currentAncestor.value.avatar) {
    return currentAncestor.value.avatar
  }
  return '/src/assets/ancestors/default-ancestor.png'
})

// 计算属性
const currentAncestor = computed(() => ancestorStore.currentAncestor || {})
const canInteract = computed(() => ancestorStore.canInteract)

const evolutionStageText = computed(() => {
  const stageMap = {
    'initial': '初识',
    'familiar': '熟悉',
    'intimate': '亲密',
    'awakened': '觉醒'
  }
  return stageMap[ancestorStore.currentEvolutionStage] || '初识'
})

const affectionPercentage = computed(() => {
  const level = ancestorStore.currentAffectionLevel
  const stage = ancestorStore.currentEvolutionStage
  
  // 根据不同阶段计算百分比
  if (stage === 'initial') {
    return Math.min(100, (level / 5) * 100)
  } else if (stage === 'familiar') {
    return Math.min(100, ((level - 5) / 10) * 100)
  } else if (stage === 'intimate') {
    return Math.min(100, ((level - 15) / 15) * 100)
  } else if (stage === 'awakened') {
    return 100
  }
  
  return 0
})

const formatAffection = (percentage) => {
  return `好感度 ${ancestorStore.currentAffectionLevel}`
}

onMounted(() => {
  // 确保用户已登录
  if (!userStore.isLoggedIn) {
    userStore.guestLogin()
  }
  
  // 加载祖宗状态
  ancestorStore.loadState()
  
  // 如果没有祖宗，跳转到生成页面
  if (!ancestorStore.hasAncestor) {
    router.push('/generate')
    return
  }
  
  // 设置初始情绪状态
  currentEmotionState.value = currentAncestor.value.emotionState || 'neutral'
  
  // 显示欢迎语录
  currentQuote.value = currentAncestor.value.quotes.greeting
  
  // 使用打字机效果显示欢迎语录
  showTypingQuote(currentQuote.value)
  
  // 更新用户活跃度
  userStore.updateActivityLevel()
})

// 执行互动
const performInteraction = (type) => {
  if (!canInteract.value) {
    const remainingTime = ancestorStore.remainingCooldownTime
    cooldownMessage.value = `祖宗还在消化上次互动，请稍等${remainingTime}秒...`
    cooldownDialog.value = true
    return
  }
  
  let result
  
  switch (type) {
    case 'incense':
      result = ancestorStore.interactIncense()
      break
    case 'flowers':
      result = ancestorStore.interactFlowers()
      break
    case 'kowtow':
      result = ancestorStore.interactKowtow()
      break
    default:
      return
  }
  
  if (result.success) {
    currentQuote.value = result.quote
    // 使用打字机效果显示新的语录
    showTypingQuote(result.quote)
    currentEmotionState.value = result.emotionState
    
    // 更新用户偏好
    userStore.updatePreferences({
      interactionPreference: type
    })
  } else {
    cooldownMessage.value = result.message
    cooldownDialog.value = true
  }
}

// 导航函数
const goToQuotes = () => {
  router.push('/quotes')
}

const goToShare = () => {
  router.push('/share')
}

const goToMiniGames = () => {
  router.push('/minigames')
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
.interaction-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 100%);
  padding: 20px;
  color: #f5f5f5;
}

.ancestor-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.ancestor-card {
  display: flex;
  background-color: #1E1E1E;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.ancestor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.ancestor-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255, 165, 0, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
}
.ancestor-card.happy::before {
  background: radial-gradient(circle at center, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
  opacity: 1;
}
.ancestor-card.annoyed::before {
  background: radial-gradient(circle at center, rgba(255, 69, 0, 0.15) 0%, transparent 70%);
  opacity: 1;
}
.ancestor-card.angry::before {
  background: radial-gradient(circle at center, rgba(255, 0, 0, 0.15) 0%, transparent 70%);
  opacity: 1;
}

.ancestor-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  margin-right: 24px;
}

.emotion-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #52525B;
  z-index: 1;
  transition: all 0.3s ease;
  opacity: 0.7;
}
.emotion-ring.neutral {
  border-color: #52525B;
}
.emotion-ring.happy {
  border-color: #10B981;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
}
.emotion-ring.annoyed {
  border-color: #F59E0B;
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
}
.emotion-ring.angry {
  border-color: #EF4444;
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
}

/* 内圈头像 */
.ancestor-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  margin-right: 24px;
}

.emotion-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #52525B;
  z-index: 1;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.ancestor-avatar img {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  z-index: 2;
  display: block;
  margin: 10px;
  border: none;
  box-shadow: none;
}

.ancestor-info {
  flex: 1;
}

.ancestor-name {
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #FFA500;
  font-weight: 600;
}

.ancestor-traits {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.trait-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
  background: linear-gradient(135deg, #FDBA74, #FDE68A);
  color: #1E1E1E;
  font-weight: 500;
}

/* 以下其余区域保持不变 ↓ */
.evolution-stage {
  margin-top: 15px;
}
.stage-label {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
  background-color: #4F46E5;
  color: white;
  font-weight: 500;
  margin-bottom: 10px;
}
.emotion-slider {
  position: relative;
  margin-top: 12px;
  height: 24px;
}
.emotion-track {
  height: 8px;
  background-color: #52525B;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}
.emotion-fill {
  height: 100%;
  background: linear-gradient(90deg, #10B981, #F59E0B, #EF4444);
  border-radius: 4px;
  transition: width 0.5s ease;
}
.emotion-emoji {
  position: absolute;
  right: 0;
  top: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #FFA500;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1E1E1E;
  font-size: 14px;
  transform: translateX(50%);
  transition: all 0.3s ease;
}
.emotion-emoji::after {
  content: '😐';
}
.emotion-emoji.happy::after {
  content: '😊';
}
.emotion-emoji.annoyed::after {
  content: '😒';
}
.emotion-emoji.angry::after {
  content: '😡';
}
.quote-bubble {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 16px 24px;
  margin-top: 24px;
  position: relative;
  max-width: 80%;
  text-align: center;
  animation: fadeIn 0.5s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.1);
}
.quote-bubble::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid rgba(255, 255, 255, 0.05);
}
.quote-bubble p {
  margin: 0;
  font-style: italic;
  color: #f5f5f5;
  line-height: 1.6;
  font-size: 1.05rem;
}

.ancestor-quote.typing {
  white-space: pre-line;
  font-style: italic;
  color: #f5f5f5;
  line-height: 1.6;
  font-size: 1.05rem;
  font-family: "Noto Serif SC", serif;
  overflow-wrap: break-word;
  word-break: break-word;
  min-height: 4em;
  animation: fadeIn 0.3s ease;
}

/* 打字机光标 */
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
.interaction-actions {
  background-color: #1E1E1E;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 600px;
  align-self: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}
.interaction-actions:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}
.action-title {
  font-size: 1.2rem;
  margin-bottom: 20px;
  text-align: center;
  color: #FFA500;
  font-weight: 600;
}
.action-buttons {
  display: flex;
  justify-content: space-around;
  gap: 15px;
  flex-wrap: wrap;
}
.action-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.action-button:hover {
  transform: translateY(-5px);
}
.action-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.action-button.disabled:hover {
  transform: none;
}
.action-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 165, 0, 0.1));
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 165, 0, 0.2);
}
.action-button:hover .action-icon {
  background: linear-gradient(135deg, #6366F1, #8B5CF6);
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
}
.action-name {
  font-size: 1rem;
  color: #d3d3d3;
  font-weight: 500;
  transition: color 0.3s ease;
}
.action-button:hover .action-name {
  color: #FFA500;
}
.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: auto;
  padding: 20px 0;
}
.navigation-buttons .el-button {
  background-color: #4F46E5;
  border-color: #4F46E5;
  color: white;
  border-radius: 12px;
  padding: 10px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}
.navigation-buttons .el-button:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg, #6366F1, #8B5CF6);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}
.navigation-buttons .el-button.is-plain {
  background-color: transparent;
  border-color: #4F46E5;
  color: #4F46E5;
}
.navigation-buttons .el-button.is-plain:hover {
  background-color: rgba(79, 70, 229, 0.1);
  color: #6366F1;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .ancestor-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .ancestor-avatar {
    margin: 0 auto 20px;
  }

  .ancestor-traits {
    justify-content: center;
  }

  .action-buttons {
    flex-wrap: wrap;
    gap: 20px;
  }

  .navigation-buttons {
    flex-direction: column;
  }

  .emotion-slider {
    width: 100%;
  }
}
</style>
