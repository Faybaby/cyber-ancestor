<template>
    <div class="ancestor-profile">
      <!-- ✅ 包裹层：用于控制边框、发光、圆角 -->
      <div class="ancestor-avatar-wrapper avatar-md">
        <img 
          :src="ancestorStore.ancestor.avatar || '/src/assets/ancestors/default-ancestor.png'" 
          alt="祖宗头像"
          @error="handleImageError" 
          class="ancestor-avatar"
        />
      </div>
      
      <!-- ... 其他内容 ... -->
    </div>
  </template>
  
  <script setup>
  import { useAncestorStore } from '../stores/ancestorStore'
  
  const ancestorStore = useAncestorStore()
  
  // ✅ 处理图片加载错误：fallback 到默认头像
  function handleImageError(e) {
    console.error('祖宗头像加载失败', e)
    e.target.src = '/src/assets/ancestors/default-ancestor.png'
  }
  </script>
  