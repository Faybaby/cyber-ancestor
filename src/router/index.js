import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: '赛博祭祖' }
  },
  {
    path: '/generate',
    name: 'Generate',
    component: () => import('../views/Generate.vue'),
    meta: { title: '生成祖宗' }
  },
  {
    path: '/interaction',
    name: 'Interaction',
    component: () => import('../views/Interaction.vue'),
    meta: { title: '祭拜互动' }
  },
  {
    path: '/quotes',
    name: 'Quotes',
    component: () => import('../views/Quotes.vue'),
    meta: { title: '语录记录' }
  },
  {
    path: '/minigames',
    name: 'MiniGames',
    component: () => import('../views/MiniGames.vue'),
    meta: { title: '小游戏' }
  },
  {
    path: '/share',
    name: 'Share',
    component: () => import('../views/Share.vue'),
    meta: { title: '分享' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '赛博祭祖'
  next()
})

export default router