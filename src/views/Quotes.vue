<template>
  <div class="quotes-container">
    <!-- 顶部祖宗信息卡 -->
    <div class="ancestor-header">
      <img :src="placeholderAvatar" alt="祖宗头像" class="avatar" />
      <div class="ancestor-info">
        <h2 class="name">{{ ancestorName }} 曰：</h2>
        <p class="date">{{ currentDate }} · 今日祖训</p>
        <div class="tags">
          <span v-for="(tag, index) in currentAncestor.traits || []" :key="index" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- 标签切换 -->
    <el-tabs v-model="activeTab" class="tabs">
      <el-tab-pane name="today">
        <template #label>
          <el-badge :value="newQuotesCount" :hidden="newQuotesCount === 0" class="quotes-badge">
            今日语录
          </el-badge>
        </template>
        <div v-if="todayQuotes.length > 0" class="quote-list">
          <div v-for="(quote, index) in todayQuotes" :key="index" class="quote-card">
            <div class="left-border" :class="formatWithAncestorTone(quote).color"></div>
            <div class="quote-content">
              <el-tooltip :content="formatWithAncestorTone(quote).tooltip" placement="top">
                <span class="ancestor-tone-tag" :class="formatWithAncestorTone(quote).color">
                  {{ formatWithAncestorTone(quote).prefix }}
                </span>
              </el-tooltip>
              <span class="quote-text">{{ formatWithAncestorTone(quote).content }}</span>
            </div>
            <div class="quote-actions">
              <el-tooltip content="收藏" placement="top">
                <el-button
                  :icon="isFavorite(quote) ? StarFilled : Star"
                  :class="isFavorite(quote) ? 'button-fancy' : 'button-plain'"
                  circle
                  size="small"
                  @click="toggleFavorite(quote)"
                />
              </el-tooltip>
              <el-tooltip content="分享" placement="top">
                <el-button :icon="Share" circle size="small" @click="shareQuote(quote)" />
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="empty-state" v-else>
          <p>祖宗闭关去了，今日暂未发话。请速前往上香以示诚意！</p>
          <el-button type="primary" @click="goToInteraction">前往祭拜</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="收藏语录" name="favorites">
        <div v-if="favoriteQuotes.length > 0" class="quote-list">
          <div v-for="(quote, index) in favoriteQuotes" :key="index" class="quote-card favorite">
            <div class="left-border favorite" :class="formatWithAncestorTone(quote).color"></div>
            <div class="quote-content">
              <el-tooltip :content="formatWithAncestorTone(quote).tooltip" placement="top">
                <span class="ancestor-tone-tag" :class="formatWithAncestorTone(quote).color">
                  {{ formatWithAncestorTone(quote).prefix }}
                </span>
              </el-tooltip>
              <span class="quote-text">{{ formatWithAncestorTone(quote).content }}</span>
            </div>
            <div class="quote-actions">
              <el-tooltip content="取消收藏" placement="top">
                <el-button
                  :icon="Delete"
                  class="button-plain"
                  circle
                  size="small"
                  @click="toggleFavorite(quote)"
                />
              </el-tooltip>
              <el-tooltip content="分享" placement="top">
                <el-button :icon="Share" circle size="small" @click="shareQuote(quote)" />
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="empty-state" v-else>
          <p>你还没有收藏语录，祖宗表示失望.jpg</p>
          <el-button type="primary" @click="goToInteraction">去祭拜</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 分享预览 -->
    <div class="share-preview" v-if="selectedQuote" id="quote-share-card">
      <div class="share-card">
        <div class="share-header">
          <img :src="placeholderAvatar" class="share-avatar" />
          <div>
            <h3>{{ ancestorName }} 曰：</h3>
            <p>{{ currentDate }}</p>
          </div>
        </div>
        <div class="share-quote">
          <el-tooltip :content="formatWithAncestorTone(selectedQuote).tooltip" placement="top">
            <span class="ancestor-tone-tag" :class="formatWithAncestorTone(selectedQuote).color">
              {{ formatWithAncestorTone(selectedQuote).prefix }}
            </span>
          </el-tooltip>
          <span class="quote-text">{{ formatWithAncestorTone(selectedQuote).content }}</span>
        </div>
        <div class="share-footer">赛博祭祖 · 清明AI小游戏</div>
      </div>
      <div class="share-actions">
        <el-button type="primary" @click="generateShareImage">生成分享图</el-button>
        <el-button @click="cancelShare">取消</el-button>
      </div>
    </div>

    <div class="back-button">
      <el-button @click="goToInteraction" type="primary" plain>← 返回祭拜</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAncestorStore } from '../stores/ancestorStore'
import { useShareStore } from '../stores/shareStore'

import { Star, StarFilled, Delete, Share } from '@element-plus/icons-vue'

const router = useRouter()
const ancestorStore = useAncestorStore()
const shareStore = useShareStore()

const activeTab = ref('today')
const selectedQuote = ref(null)

const currentDate = computed(() => {
  const now = new Date()
  return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
})

const currentAncestor = computed(() => ancestorStore.currentAncestor || {})
const ancestorName = computed(() => currentAncestor.value.fullName || '祖宗')

const todayQuotes = computed(() => {
  const rawQuotes = ancestorStore.todayQuotes || []
  const seen = new Set()
  return rawQuotes.filter((quote) => {
    if (seen.has(quote)) return false
    seen.add(quote)
    return true
  })
})

const favoriteQuotes = computed(() => {
  const raw = ancestorStore.favoriteQuotes || []
  const seen = new Set()
  return raw.filter((q) => {
    if (seen.has(q)) return false
    seen.add(q)
    return true
  })
})

const placeholderAvatar = computed(() =>
  currentAncestor.value.avatar || '/src/assets/ancestors/default-ancestor.png'
)

const newQuotesCount = computed(() => ancestorStore.newQuotesCount)

onMounted(() => {
  ancestorStore.loadState()
  if (!ancestorStore.hasAncestor) router.push('/generate')
  shareStore.loadState()
  // 重置新增语录计数
  if (ancestorStore.newQuotesCount > 0) {
    ancestorStore.resetNewQuotesCount()
  }
})

const isFavorite = (quote) => favoriteQuotes.value.includes(quote)

const toggleFavorite = (quote) => {
  if (isFavorite(quote)) {
    ancestorStore.favoriteQuotes = favoriteQuotes.value.filter((q) => q !== quote)
  } else {
    ancestorStore.favoriteQuote(quote)
  }
  ancestorStore.saveState()
}

const shareQuote = (quote) => (selectedQuote.value = quote)
const cancelShare = () => (selectedQuote.value = null)

const generateShareImage = async () => {
  try {
    const imageUrl = await shareStore.generateShareImage('quote-share-card', 'quote-card')
    if (imageUrl) {
      shareStore.downloadShareImage(`祖训_${Date.now()}.png`)
      cancelShare()
    }
  } catch (err) {
    console.error('生成失败:', err)
  }
}

const goToInteraction = () => router.push('/interaction')

// 祖宗语气前缀列表 + 配色语义系统
const tonePrefixes = [
  { text: '祖宗拍着大腿', color: 'orange', tooltip: '祖宗非常激动！' },
  { text: '你祖宗翻着白眼叹气', color: 'gray', tooltip: '祖宗不想说话...' },
  { text: '祖宗轻轻抚须', color: 'teal', tooltip: '祖宗略感欣慰~' },
  { text: '祖宗从云层飘来一句', color: 'blue', tooltip: '祖宗邪魅一笑~' },
  { text: '祖宗眯眼望天', color: 'purple', tooltip: '祖宗陷入沉思...' }
]
const formatWithAncestorTone = (quote) => {
  const index = Math.floor(Math.random() * tonePrefixes.length)
  const tone = tonePrefixes[index]
  const cleanQuote = quote.replace(/\[[^\]]+\]：?/, '').trim()
  return { prefix: tone.text, color: tone.color, tooltip: tone.tooltip, content: cleanQuote }
}
</script>


<style scoped>
.quotes-badge :deep(.el-badge__content) {
  background-color: #ff4949;
  color: white;
  border: none;
}

.quotes-container {
  background: linear-gradient(135deg, #1c1c1c, #2d2d2d);
  min-height: 100vh;
  padding: 24px;
  color: #f5f5f5;
  max-width: 100%;
  margin: 0 auto;}

.ancestor-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #ffa500;
  object-fit: cover;
  margin-right: 16px;
}

.ancestor-info {
  flex: 1;
}

.name {
  color: #ffd700;
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.date {
  color: #999;
  font-size: 0.9rem;
}

.tags {
  display: flex;
  gap: 8px;
  margin-top: 6px;
}

.tag {
  background: #f59e0b;
  padding: 4px 10px;
  border-radius: 12px;
  color: #1e1e1e;
  font-size: 0.75rem;
}

.tabs {
  margin-top: 20px;
}

.quote-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

.quote-card {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 16px 20px;
}

.left-border {
  width: 6px;
  height: 100%;
  background: #ffa500;
  border-radius: 4px 0 0 4px;
  position: absolute;
  left: 0;
  top: 0;
}

.left-border.favorite {
  background: #ffd700;
}

/* 左侧边框颜色 */
.left-border.orange { background: #f59e0b; }
.left-border.gray { background: #6b7280; }
.left-border.teal { background: #14b8a6; }
.left-border.blue { background: #3b82f6; }
.left-border.purple { background: #8b5cf6; }

.quote-content {
  flex: 1;
  padding-left: 10px;
  font-size: 1rem;
}

/* 祖宗语气标签样式 */
.ancestor-tone-tag {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: bold;
  margin-right: 8px;
  animation: pop-in 0.5s ease;
}

.ancestor-tone-tag.orange {
  background: linear-gradient(to right, #f59e0b, #facc15);
  color: #1e1e1e;
}
.ancestor-tone-tag.gray {
  background: linear-gradient(to right, #6b7280, #9ca3af);
  color: #fff;
}
.ancestor-tone-tag.teal {
  background: linear-gradient(to right, #14b8a6, #2dd4bf);
  color: #fff;
}
.ancestor-tone-tag.blue {
  background: linear-gradient(to right, #3b82f6, #60a5fa);
  color: #fff;
}
.ancestor-tone-tag.purple {
  background: linear-gradient(to right, #8b5cf6, #a78bfa);
  color: #fff;
}

.quote-text {
  display: inline-block;
}

@keyframes pop-in {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.quote-actions {
  display: flex;
  gap: 8px;
}

/* 收藏按钮美化 */
.button-plain {
  background-color: transparent;
  border: 1px solid #ffa500;
  color: #ffa500;
  transition: all 0.3s ease;
}
.button-plain:hover {
  background-color: rgba(255, 165, 0, 0.1);
  transform: scale(1.05);
}
.button-fancy {
  background: linear-gradient(135deg, #facc15, #f59e0b);
  border: 2px solid #fcd34d;
  box-shadow: 0 0 8px rgba(250, 204, 21, 0.4);
  color: #1e1e1e;
  transition: all 0.3s ease;
}
.button-fancy:hover {
  transform: scale(1.1);
  box-shadow: 0 0 12px rgba(255, 204, 0, 0.6);
}

/* 分享卡片 */
.share-preview {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.share-card {
  background: white;
  color: #333;
  border-radius: 12px;
  padding: 20px;
  width: 360px;
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.4);
}

.share-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
}

.share-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #ffa500;
  margin-right: 12px;
}

.share-quote {
  font-size: 1.1rem;
  font-weight: bold;
  padding: 16px;
  text-align: center;
  background: #f7f7f7;
  border-radius: 10px;
  margin-bottom: 12px;
}

.share-quote .ancestor-tone-tag {
  display: block;
  margin-bottom: 8px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  animation: pop-in 0.5s ease;
}

.share-footer {
  font-size: 0.85rem;
  text-align: center;
  color: #666;
}

.share-actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

.back-button {
  text-align: center;
  margin-top: 40px;
}

.empty-state {
  text-align: center;
  margin: 40px 0;
}
</style>
