<template>
  <div class="avatar-selector">
    <h3>选择祖宗头像</h3>
    <div class="avatar-grid">
      <div 
        v-for="(avatar, index) in ancestorStore.availableAvatars" 
        :key="index"
        class="avatar-item"
        :class="{ 'selected': avatar === ancestorStore.ancestor.avatar }"
        @click="selectAvatar(avatar)"
      >
        <img :src="avatar" alt="祖宗头像" class="avatar-image" />
      </div>
    </div>
    <div class="avatar-actions">
      <button @click="ancestorStore.randomizeAvatar()" class="random-btn">随机选择</button>
    </div>
  </div>
</template>

<script setup>
import { useAncestorStore } from '../stores/ancestorStore'

const ancestorStore = useAncestorStore()

function selectAvatar(avatar) {
  ancestorStore.updateAvatar(avatar)
}
</script>

<style scoped>
.avatar-selector {
  padding: 1rem;
  background-color: #f8f4e6;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  text-align: center;
  color: #8b4513;
  margin-bottom: 1rem;
}

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  margin-bottom: 1.5rem;
}

.avatar-item {
  cursor: pointer;
  border: 3px solid transparent;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s ease;
  aspect-ratio: 1;
}

.avatar-item:hover {
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.avatar-item.selected {
  border-color: #d4af37;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar-actions {
  display: flex;
  justify-content: center;
}

.random-btn {
  background-color: #8b4513;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;
}

.random-btn:hover {
  background-color: #a0522d;
}

@media (max-width: 768px) {
  .avatar-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>