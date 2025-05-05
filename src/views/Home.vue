<template>
  <div class="home-container">
    <div class="welcome-section">
      <h1 class="title">赛博祭祖</h1>
      <h2 class="subtitle">清明AI小游戏</h2>
      
      <div class="description">
        <p>在数字世界中与你的祖先对话</p>
        <p>他们的智慧，跨越时空来到你身边</p>
      </div>
      
      <el-button 
        type="primary" 
        size="large" 
        class="start-button"
        @click="startGame"
      >
        开始祭祖
      </el-button>
      
      <div class="features">
        <div class="feature-item">
          <i class="el-icon-user"></i>
          <span>生成专属祖宗</span>
        </div>
        <div class="feature-item">
          <i class="el-icon-chat-dot-round"></i>
          <span>互动获取语录</span>
        </div>
        <div class="feature-item">
          <i class="el-icon-share"></i>
          <span>分享传播智慧</span>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p>© 2023 赛博祭祖 · 清明AI小游戏</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  // 自动执行游客登录
  userStore.guestLogin()
  // 加载用户状态
  userStore.loadState()
})

const startGame = () => {
  // 如果用户已有祖宗，直接进入互动页面
  // 否则进入生成祖宗页面
  router.push('/generate')
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 100%);
  color: #f5f5f5;
  padding: 20px;
  text-align: center;
}

.welcome-section {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 3rem;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #ff4500, #ffa500);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(255, 69, 0, 0.3);
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: #d3d3d3;
}

.description {
  margin-bottom: 40px;
  line-height: 1.6;
  color: #a9a9a9;
}

.start-button {
  margin: 20px 0 40px;
  padding: 15px 40px;
  font-size: 1.2rem;
  background: linear-gradient(45deg, #ff4500, #ffa500);
  border: none;
  border-radius: 50px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.start-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(255, 69, 0, 0.4);
}

.features {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}

.feature-item i {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #ffa500;
}

.footer {
  margin-top: auto;
  padding: 20px;
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .features {
    flex-direction: column;
  }
  
  .feature-item {
    margin-bottom: 20px;
  }
}
</style>
