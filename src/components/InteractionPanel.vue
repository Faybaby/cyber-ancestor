<template>
  <div class="interaction-panel">
    <h2 class="panel-title">与祖宗互动</h2>
    
    <div class="interaction-options">
      <button class="interaction-btn" @click="askQuestion" :class="{ 'disabled': !canInteract }">
        <span class="btn-icon">❓</span>
        请教问题
      </button>
      
      <button class="interaction-btn" @click="payRespects" :class="{ 'disabled': !canInteract }">
        <span class="btn-icon">🙏</span>
        上香祭拜
      </button>
      
      <button class="interaction-btn" @click="shareWisdom" :class="{ 'disabled': !canInteract }">
        <span class="btn-icon">📢</span>
        分享语录
      </button>
    </div>
    
    <div v-if="showCooldownMessage" class="cooldown-message">
      <p>{{ cooldownMessage }}</p>
    </div>
    
    <div v-if="currentInteraction" class="interaction-result">
      <p class="ancestor-response">{{ currentInteraction.response }}</p>
      <p class="interaction-time">{{ formatTime(currentInteraction.time) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAncestorStore } from '../stores/ancestorStore'

const ancestorStore = useAncestorStore()
const currentInteraction = ref(null)
const showCooldownMessage = ref(false)
const cooldownMessage = ref('')

// 计算属性：是否可以互动
const canInteract = computed(() => ancestorStore.canInteract)

// 计算属性：剩余冷却时间
const remainingCooldownTime = computed(() => ancestorStore.remainingCooldownTime)

// 检查冷却时间并显示提示
const checkCooldown = (interactionType) => {
  if (!canInteract.value) {
    cooldownMessage.value = `祖宗还在消化上次互动，请稍等${remainingCooldownTime.value}秒...`
    showCooldownMessage.value = true
    setTimeout(() => {
      showCooldownMessage.value = false
    }, 3000) // 3秒后自动隐藏提示
    return false
  }
  return true
}

// 请教问题
const askQuestion = () => {
  if (!checkCooldown('question')) return
  
  const response = ancestorStore.getRandomQuote()
  currentInteraction.value = {
    type: 'question',
    response: response,
    time: new Date()
  }
  
  // 记录互动
  ancestorStore.addInteraction(currentInteraction.value)
}

// 上香祭拜
const payRespects = () => {
  if (!checkCooldown('respect')) return
  
  // 增加亲密度
  ancestorStore.increaseAffection()
  
  currentInteraction.value = {
    type: 'respect',
    response: '祖宗感受到了你的诚意，心情愉悦。',
    time: new Date()
  }
  
  // 记录互动
  ancestorStore.addInteraction(currentInteraction.value)
}

// 分享语录
const shareWisdom = () => {
  if (!checkCooldown('share')) return
  
  const quote = ancestorStore.getFavoriteQuote()
  
  if (quote) {
    currentInteraction.value = {
      type: 'share',
      response: `已将祖宗语录"${quote}"分享到剪贴板`,
      time: new Date()
    }
    
    // 复制到剪贴板
    navigator.clipboard.writeText(quote).catch(err => {
      console.error('无法复制到剪贴板:', err)
    })
  } else {
    currentInteraction.value = {
      type: 'share',
      response: '还没有收藏任何祖宗语录，先去互动收集一些吧！',
      time: new Date()
    }
  }
  
  // 记录互动
  ancestorStore.addInteraction(currentInteraction.value)
}

// 格式化时间
const formatTime = (date) => {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.interaction-panel {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
}

.panel-title {
  color: #ffa500;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.interaction-options {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
}

.interaction-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 69, 0, 0.2);
  border: 1px solid #ff4500;
  border-radius: 8px;
  padding: 15px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.interaction-btn:hover {
  background-color: rgba(255, 69, 0, 0.4);
  transform: translateY(-5px);
}

.btn-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.interaction-result {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
}

.ancestor-response {
  color: #f5f5f5;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 10px;
}

.interaction-time {
  color: #a9a9a9;
  font-size: 0.8rem;
  text-align: right;
}

.cooldown-message {
  background-color: rgba(255, 69, 0, 0.2);
  border: 1px solid #ff4500;
  border-radius: 8px;
  padding: 10px;
  margin: 15px 0;
  color: #f5f5f5;
  text-align: center;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.interaction-btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: rgba(100, 100, 100, 0.2);
  border: 1px solid #666;
}

.interaction-btn.disabled:hover {
  background-color: rgba(100, 100, 100, 0.2);
  transform: none;
}

@media (max-width: 768px) {
  .interaction-options {
    flex-direction: column;
  }
  
  .interaction-btn {
    width: 100%;
  }
}
</style>