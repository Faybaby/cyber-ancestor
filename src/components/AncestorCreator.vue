<template>
  <div class="ancestor-creator">
    <button @click="createAncestor" class="create-btn">生成祖宗</button>
  </div>
</template>

<script setup>
import { useAncestorStore } from '../stores/ancestorStore'
import { useRouter } from 'vue-router'

const ancestorStore = useAncestorStore()
const router = useRouter()

function createAncestor() {
  try {
    // 清除可能存在的旧数据
    if (ancestorStore.currentAncestor) {
      ancestorStore.resetState()
    }
    
    const ancestor = ancestorStore.generateAncestor()
    console.log('祖宗生成成功:', ancestor)
    
    // 可以跳转到祖宗主页
    router.push('/ancestor')
  } catch (error) {
    console.error('生成祖宗时出错:', error)
    alert('生成祖宗失败，请重试')
  }
}
</script>

<style scoped>
.ancestor-creator {
  margin: 2rem 0;
  text-align: center;
}

.create-btn {
  background-color: #8b4513;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-btn:hover {
  background-color: #a0522d;
}
</style>