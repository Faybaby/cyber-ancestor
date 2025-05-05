<template>
  <div class="ancestor-settings">
    <h2>祖宗设置</h2>
    
    <div class="settings-section">
      <div class="current-avatar-display">
        <h3>当前祖宗形象</h3>
        <div class="avatar-preview">
          <img :src="ancestorStore.ancestor.avatar" alt="当前祖宗头像" />
        </div>
        <p>{{ ancestorStore.ancestor.name || '尊敬的祖先' }}</p>
      </div>
      
      <!-- 添加头像选择器 -->
      <AvatarSelector />
    </div>
    
    <!-- 其他设置内容 -->
  </div>
</template>

<script setup>
import AvatarSelector from '../components/AvatarSelector.vue'
import { useAncestorStore } from '../stores/ancestorStore'

const ancestorStore = useAncestorStore()
</script>

<style scoped>
.ancestor-settings {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

h2 {
  text-align: center;
  color: #8b4513;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.current-avatar-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.current-avatar-display h3 {
  color: #8b4513;
  margin-bottom: 1rem;
}

.avatar-preview {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #d4af37;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
  margin-bottom: 1rem;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .settings-section {
    padding: 1rem;
  }
  
  .avatar-preview {
    width: 120px;
    height: 120px;
  }
}
</style>