<!-- HTML -->
<template>
  <nav class="navbar flex items-center justify-between bg-primary p-4 font-heading rounded-b-lg shadow-lg">
    <!-- Texto de bienvenida -->
    <div class="flex-1 flex justify-start">
      <span class="text-text-light text-lg font-bold">Bienvenid@ Usuario</span>
    </div>

    <!-- Navegación -->
    <div class="flex-1 flex justify-between space-x-6 font-semibold text-text-light">
      <router-link to="/Clientes" aria-label="Ir a la sección de Clientes"
        class="nav-item transition-colors hover:text-primary-dark">Clientes</router-link>
      <router-link to="/Menu_Productos" aria-label="Ir a la sección de Productos"
        class="nav-item transition-colors hover:text-primary-dark">Productos</router-link>
      <router-link to="/Pedidos" aria-label="Ir a la sección de Pedidos"
        class="nav-item transition-colors hover:text-primary-dark">Pedidos</router-link>
    </div>

    <!-- Cerrar sesión -->
    <div class="flex-1 flex justify-end">
      <button @click="handleLogout" aria-label="Cerrar sesión"
        class="logout-button flex items-center space-x-2 bg-danger text-text-light font-bold px-4 py-2 rounded-ms hover:bg-danger-dark focus:outline-none">
        <img src="../assets/icons/Resaltado/Simbolo/login-icon.svg" alt="Cerrar sesión" class="w-5 h-5" />
        <span>Salir</span>
      </button>
    </div>
  </nav>
</template>

<!-- Scripts -->
<script setup>
//Importaciones
import { useRouter } from "vue-router";

//Variables
const router = useRouter();

// Función para cerrar sesión
function handleLogout() {
  router.push({ name: "Login" });
}
</script>

<!-- Estilos -->
<style scoped>
/* Fuentes */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Josefin+Sans:wght@400;600&display=swap");

.font-heading {
  font-family: "Poppins", sans-serif;
}

.font-sans {
  font-family: "Josefin Sans", sans-serif;
}
</style>