import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/Autenticacion/Login.vue";

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    // Validar que el token no haya expirado
    if (payload.exp && payload.exp > currentTime) {
      return true;
    } else {
      localStorage.removeItem("token");
      return false;
    }
  } catch (error) {
    console.error("Error al validar el token:", error);
    localStorage.removeItem("token");
    return false;
  }
}

// Configuración de rutas
const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/Recuperacion",
    name: "Recuperacion",
    component: () => import("../views/Autenticacion/Recuperar_Clave.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/Reseteo",
    name: "Resetear_Clave",
    component: () => import("../views/Autenticacion/Resetear_Clave.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/Menu",
    name: "Menu",
    component: () => import("../views/Autenticacion/Menu.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Clientes",
    name: "Clientes",
    component: () => import("../views/Clientes/Clientes.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Pedidos",
    name: "Pedidos",
    component: () => import("../views/Pedidos/Pedidos.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Menu_Productos",
    name: "Menu_Productos",
    component: () => import("../views/Productos/Menu_Productos.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Cajas",
    name: "Cajas",
    component: () => import("../views/Productos/Cajas.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Materiales",
    name: "Materiales",
    component: () => import("../views/Productos/Materiales.vue"),
    meta: { requiresAuth: true },
  },
];

// Crear el enrutador
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Protección de rutas
router.beforeEach((to, _from, next) => {
  const isAuthRoute = to.meta.requiresAuth;

  if (isAuthRoute && !isAuthenticated()) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;