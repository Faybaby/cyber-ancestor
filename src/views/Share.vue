<template>
  <div class="share-container">
    <div class="share-header">
      <h1 class="title">分享祖宗</h1>
      <p class="subtitle">生成分享图，传播祖宗智慧</p>
    </div>
    
    <div class="share-templates">
      <h2 class="section-title">选择分享模板</h2>
      
      <div class="templates-grid">
        <div 
          v-for="template in shareTemplates" 
          :key="template.id"
          class="template-card"
          :class="{ active: selectedTemplate === template.id }"
          @click="selectTemplate(template.id)"
        >
          <div class="template-icon">{{ getTemplateIcon(template.id) }}</div>
          <div class="template-info">
            <h3>{{ template.name }}</h3>
            <p>{{ template.description }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="share-preview" v-if="currentAncestor">
      <h2 class="section-title">预览</h2>
      
      <!-- 祖宗名片模板 -->
      <div 
        v-if="selectedTemplate === 'ancestor-card'" 
        class="preview-card ancestor-template"
        id="ancestor-share-card"
      >
        <div class="preview-header">
          <img :src="placeholderAvatar" alt="祖宗头像" class="preview-avatar">
          <div class="preview-info">
            <h3>{{ currentAncestor.fullName }}</h3>
            <div class="preview-traits">
              <span v-for="(trait, index) in currentAncestor.traits" :key="index" class="trait-tag">
                {{ trait }}
              </span>
            </div>
          </div>
        </div>
        <div class="preview-quote">
          <p>{{ currentAncestor.quotes.greeting }}</p>
        </div>
        <div class="preview-footer">
          <p>赛博祭祖 · 清明AI小游戏</p>
          <p class="preview-date">{{ currentDate }}</p>
        </div>
      </div>
      
      <!-- 今日语录卡模板 -->
      <div 
        v-if="selectedTemplate === 'quote-card'" 
        class="preview-card quote-template"
        id="quote-share-card"
      >
        <div class="preview-header">
          <img :src="placeholderAvatar" alt="祖宗头像" class="preview-avatar">
          <div class="preview-info">
            <h3>{{ currentAncestor.fullName }}曰：</h3>
            <p class="preview-date">{{ currentDate }}</p>
          </div>
        </div>
        <div class="preview-quote">
          <p>{{ getRandomQuote() }}</p>
        </div>
        <div class="preview-footer">
          <p>赛博祭祖 · 清明AI小游戏</p>
        </div>
      </div>
      
      <!-- 祭拜互动卡模板 -->
      <div 
        v-if="selectedTemplate === 'interaction-card'" 
        class="preview-card interaction-template"
        id="interaction-share-card"
      >
        <div class="preview-header">
          <img :src="placeholderAvatar" alt="祖宗头像" class="preview-avatar">
          <div class="preview-info">
            <h3>{{ currentAncestor.fullName }}邀请你</h3>
            <p class="preview-subtitle">前来上香祭拜</p>
          </div>
        </div>
        <div class="preview-content">
          <div class="interaction-icons">
            <div class="interaction-icon">🧨</div>
            <div class="interaction-icon">💐</div>
            <div class="interaction-icon">🙇</div>
          </div>
          <p class="interaction-text">点击链接，与我的祖宗互动</p>
        </div>
        <div class="preview-footer">
          <p>赛博祭祖 · 清明AI小游戏</p>
          <p class="preview-date">{{ currentDate }}</p>
        </div>
      </div>
    </div>
    
    <div class="share-actions" v-if="currentAncestor">
      <el-button type="primary" @click="generateShareImage">生成分享图</el-button>
      <el-button type="success" @click="generateShareLink">生成分享链接</el-button>
    </div>
    
    <div class="share-result" v-if="shareResult">
      <h2 class="section-title">分享结果</h2>
      
      <div class="result-container">
        <div class="result-card">
          <div v-if="shareResult.type === 'image'" class="image-result">
            <img :src="shareResult.data" alt="分享图片" class="result-image">
            <div class="result-actions">
              <el-button type="primary" @click="downloadImage">下载图片</el-button>
              <el-button @click="copyImage">复制图片</el-button>
            </div>
          </div>
          
          <div v-if="shareResult.type === 'link'" class="link-result">
            <p class="result-link">{{ shareResult.data }}</p>
            <div class="result-actions">
              <el-button type="primary" @click="copyLink">复制链接</el-button>
            </div>
          </div>
        </div>
        
        <div class="social-share">
          <h3>分享到社交媒体</h3>
          <div class="social-buttons">
            <el-button class="social-button wechat" @click="shareToSocial('wechat')">微信</el-button>
            <el-button class="social-button weibo" @click="shareToSocial('weibo')">微博</el-button>
            <el-button class="social-button xiaohongshu" @click="shareToSocial('xiaohongshu')">小红书</el-button>
          </div>
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
import { useShareStore } from '../stores/shareStore'

const router = useRouter()
const ancestorStore = useAncestorStore()
const shareStore = useShareStore()

const selectedTemplate = ref('ancestor-card')
const shareResult = ref(null)

// 祖宗头像 - 使用当前祖宗的头像或默认头像
const placeholderAvatar = computed(() => {
  if (currentAncestor.value && currentAncestor.value.avatar) {
    return currentAncestor.value.avatar
  }
  return '/assets/ancestors/default-ancestor.png'
})

// 计算属性
const currentDate = computed(() => {
  const now = new Date()
  return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
})

const currentAncestor = computed(() => ancestorStore.currentAncestor)

const shareTemplates = computed(() => shareStore.getShareTemplates)

onMounted(() => {
  // 加载祖宗状态
  ancestorStore.loadState()
  
  // 如果没有祖宗，跳转到生成页面
  if (!ancestorStore.hasAncestor) {
    router.push('/generate')
    return
  }
  
  // 加载分享状态
  shareStore.loadState()
})

// 获取模板图标
const getTemplateIcon = (templateId) => {
  const icons = {
    'ancestor-card': '👴',
    'quote-card': '💬',
    'interaction-card': '🧨'
  }
  return icons[templateId] || '📷'
}

// 选择模板
const selectTemplate = (templateId) => {
  selectedTemplate.value = templateId
  // 清除之前的分享结果
  shareResult.value = null
}

// 获取随机语录
const getRandomQuote = () => {
  const quotes = [
    currentAncestor.value.quotes.greeting,
    currentAncestor.value.quotes.incense,
    currentAncestor.value.quotes.flowers,
    currentAncestor.value.quotes.kowtow,
    currentAncestor.value.quotes.daily
  ]
  
  // 如果有今日语录，优先使用
  if (ancestorStore.todayQuotes && ancestorStore.todayQuotes.length > 0) {
    return ancestorStore.todayQuotes[ancestorStore.todayQuotes.length - 1]
  }
  
  return quotes[Math.floor(Math.random() * quotes.length)]
}

// 生成分享图片
const generateShareImage = async () => {
  try {
    const elementId = `${selectedTemplate.value}-share-card`
    const imageUrl = await shareStore.generateShareImage(elementId, selectedTemplate.value)
    
    if (imageUrl) {
      shareResult.value = {
        type: 'image',
        data: imageUrl
      }
    }
  } catch (error) {
    console.error('生成分享图片失败:', error)
  }
}

// 生成分享链接
const generateShareLink = () => {
  try {
    const ancestorId = currentAncestor.value.id
    const shareLink = shareStore.generateShareLink(ancestorId, 'invite')
    
    shareResult.value = {
      type: 'link',
      data: shareLink
    }
  } catch (error) {
    console.error('生成分享链接失败:', error)
  }
}

// 下载图片
const downloadImage = () => {
  if (shareResult.value && shareResult.value.type === 'image') {
    shareStore.downloadShareImage(`祖宗分享_${Date.now()}.png`)
  }
}

// 复制图片（实际上是提示用户手动保存）
const copyImage = () => {
  alert('请右键点击图片，选择"保存图片"或使用下载按钮保存图片')
}

// 复制链接
const copyLink = () => {
  if (shareResult.value && shareResult.value.type === 'link') {
    const linkText = shareResult.value.data
    navigator.clipboard.writeText(linkText)
      .then(() => {
        alert('链接已复制到剪贴板')
      })
      .catch(err => {
        console.error('复制链接失败:', err)
        alert('复制链接失败，请手动复制')
      })
  }
}

// 分享到社交媒体
const shareToSocial = (platform) => {
  let content = ''
  
  if (shareResult.value) {
    if (shareResult.value.type === 'link') {
      content = shareResult.value.data
    } else {
      content = '祖宗分享图片'
    }
  } else {
    content = '赛博祭祖 - 清明AI小游戏'
  }
  
  shareStore.shareToSocialMedia(platform, content)
  alert(`分享到${platform}功能正在开发中，敬请期待！`)
}

// 返回祭拜页面
const goToInteraction = () => {
  router.push('/interaction')
}
</script>
<style scoped>
/* 使用全局CSS变量，不再重复定义 */

.share-container {
  background-color: var(--background-dark);
  color: var(--text-light);
  font-family: 'Noto Serif SC', serif;
  min-height: 100vh;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.share-header {
  text-align: center;
  margin-bottom: 32px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

.title {
  font-size: 32px;
  font-weight: bold;
  color: var(--primary-color);
  letter-spacing: 3px;
  text-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
  /* 移除渐变效果，使用单色 */
  background-image: none !important;
  -webkit-background-clip: initial !important;
  background-clip: initial !important;
  -webkit-text-fill-color: var(--primary-color) !important;
}

.subtitle {
  font-size: 14px;
  color: var(--text-light);
  opacity: 0.8;
  margin-top: 8px;
}

.section-title {
  color: var(--primary-color);
  border-left: 4px solid var(--primary-color);
  padding-left: 12px;
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.3), transparent);
  margin-left: 15px;
}

/* 模板选择区域 */
.share-templates {
  margin-bottom: 40px;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.template-card {
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid transparent;
  padding: 18px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 15px;
}

.template-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.7);
  transform: translateY(-3px);
}

.template-card.active {
  border-color: var(--primary-color);
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
}

.template-icon {
  font-size: 32px;
  color: var(--primary-color);
  background: rgba(255, 215, 0, 0.08);
  padding: 12px;
  border-radius: 50%;
  border: 1px solid rgba(255, 215, 0, 0.3);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
}

.template-info h3 {
  font-size: 18px;
  color: var(--text-light);
  margin-bottom: 6px;
}

.template-info p {
  font-size: 13px;
  color: var(--text-light);
  opacity: 0.7;
}

/* 预览卡片区域 */
.share-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.preview-card {
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 215, 0, 0.2);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 380px;
  margin: 0 auto 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.preview-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
  border-color: var(--primary-color);
}

.preview-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  padding-bottom: 12px;
}

.preview-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
  object-fit: cover;
}

.preview-info h3 {
  color: var(--primary-color);
  font-size: 18px;
  margin-bottom: 6px;
}

.preview-traits {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.trait-tag {
  background-color: rgba(255, 215, 0, 0.1);
  color: var(--primary-color);
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.preview-quote {
  background-color: rgba(255, 255, 255, 0.02);
  color: var(--text-light);
  padding: 18px;
  border-radius: 8px;
  font-style: italic;
  border-left: 4px solid var(--primary-color);
  margin-bottom: 18px;
  line-height: 1.6;
}

.preview-footer {
  font-size: 12px;
  color: var(--text-light);
  opacity: 0.7;
  text-align: center;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  padding-top: 12px;
}

.preview-date {
  margin-top: 5px;
  font-size: 12px;
  color: var(--text-light);
  opacity: 0.7;
}

/* 互动卡片特殊样式 */
.interaction-template .interaction-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 15px 0;
}

.interaction-icon {
  font-size: 24px;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 215, 0, 0.3);
  transition: all 0.3s ease;
}

.interaction-icon:hover {
  transform: scale(1.1);
  background: rgba(255, 215, 0, 0.2);
}

.interaction-text {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: var(--primary-color);
}

/* 操作按钮区域 */
.share-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.el-button {
  padding: 12px 24px;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.3s ease;
}

/* 主操作按钮 */
.el-button[type="primary"] {
  background: linear-gradient(45deg, var(--secondary-color), var(--hover-blue));
  color: var(--text-light);
  border: 1px solid rgba(255, 215, 0, 0.3);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.el-button[type="primary"]:hover {
  box-shadow: 0 6px 15px rgba(76, 106, 146, 0.5);
  transform: translateY(-2px);
  border-color: var(--primary-color);
}

/* 次按钮 */
.el-button[type="success"] {
  background-color: rgba(76, 106, 146, 0.2);
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}

.el-button[type="success"]:hover {
  background-color: rgba(255, 215, 0, 0.1);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

/* 分享结果区域 */
.share-result {
  margin-bottom: 40px;
}

.result-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.result-card {
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.image-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.result-image {
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.link-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.result-link {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 12px 16px;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  word-break: break-all;
  border: 1px solid rgba(255, 215, 0, 0.2);
  color: var(--primary-color);
}

.result-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.social-share {
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.social-share h3 {
  color: var(--primary-color);
  margin-bottom: 15px;
  text-align: center;
  font-size: 18px;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.social-button {
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-button.wechat {
  background-color: rgba(76, 106, 146, 0.2);
  border-color: var(--secondary-color);
  color: var(--secondary-color);
}

.social-button.weibo {
  background-color: rgba(255, 215, 0, 0.2);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.social-button.xiaohongshu {
  background-color: rgba(255, 165, 0, 0.2);
  border-color: var(--accent-orange);
  color: var(--accent-orange);
}

.social-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

/* 导航按钮 */
.navigation-buttons {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
}

.navigation-buttons .el-button {
  background-color: rgba(76, 106, 146, 0.2);
  border: 1px solid var(--primary-color);
  color: var(--text-light);
}

.navigation-buttons .el-button:hover {
  background-color: var(--hover-blue);
  border-color: var(--primary-color);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

/* 响应式设计 */
@media (min-width: 768px) {
  .result-container {
    grid-template-columns: 2fr 1fr;
  }
}

@media (max-width: 767px) {
  .share-container {
    padding: 16px;
  }
  
  .templates-grid {
    grid-template-columns: 1fr;
  }
  
  .share-actions {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  
  .el-button {
    width: 100%;
    max-width: 300px;
  }
  
  .preview-card {
    padding: 16px;
  }
  
  .title {
    font-size: 28px;
  }
  
  .section-title {
    font-size: 18px;
  }
}
</style>
