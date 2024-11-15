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
    {
      path: '/Menu',
      name: 'Menu',
      component: () => import('../views/Menu.vue'),
    },
    {
      path: '/Clientes',
      name: 'Clientes',
      component: () => import('../views/Clientes.vue'),
    },
    {
      path: '/Pedidos',
      name: 'Pedidos',
      component: () => import('../views/Pedidos.vue'),
    },
    {
      path: '/Productos',
      name: 'Productos',
      component: () => import('../views/MenuProductos.vue'),
    },
    {
      path: '/Cajas',
      name: 'Cajas',
      component: () => import('../views/Cajas.vue'),
    },
    {
      path: '/Materiales',
      name: 'Materiales',
      component: () => import('../views/Materiales.vue'),
    },
  ],
})

export default router
