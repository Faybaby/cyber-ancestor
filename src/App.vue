<template>
  <div class="app-container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from './stores/userStore'
import { useAncestorStore } from './stores/ancestorStore'
import { useShareStore } from './stores/shareStore'

const userStore = useUserStore()
const ancestorStore = useAncestorStore()
const shareStore = useShareStore()

onMounted(() => {
  // 初始化加载所有状态
  userStore.loadState()
  ancestorStore.loadState()
  shareStore.loadState()
  
  // 如果用户未登录，自动执行游客登录
  if (!userStore.isLoggedIn) {
    userStore.guestLogin()
  }
})
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

body {
  background-color: #1c1c1c;
  color: #f5f5f5;
  line-height: 1.6;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 165, 0, 0.5);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 165, 0, 0.7);
}

/* 全局按钮样式覆盖 */
.el-button--primary {
  background: linear-gradient(45deg, #ff4500, #ffa500) !important;
  border: none !important;
}

.el-button--primary:hover {
  opacity: 0.9 !important;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 69, 0, 0.4);
}
</style>
