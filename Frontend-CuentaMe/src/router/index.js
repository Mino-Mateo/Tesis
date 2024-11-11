import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/recuperacion',
      name: 'recuperacion',
      component: () => import('../views/Recuperar_Password.vue'),
    },
    {
      path: '/reseteo',
      name: 'resetearpassword',
      component: () => import('../views/Resetear_Password.vue'),
    },
  ],
})

export default router
