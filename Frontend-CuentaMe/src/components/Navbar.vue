<!-- HTML -->
<template>
  <nav class="navbar flex items-center justify-between bg-[#8568AD] p-4 font-poppins rounded-b-lg shadow-[4px_5px_16px_1px_#595959]">
    <!-- Texto de bienvenida -->
    <div class="flex-1 flex justify-start">
      <span class="text-white text-lg font-bold">Bienvenid@ Usuario</span>
    </div>

    <!-- Navegacion -->
    <div class="flex-1 flex justify-between space-x-6 font-semibold text-white ">
      <router-link to="/clientes" class="nav-item">Clientes</router-link>
      <router-link to="/productos" class="nav-item">Productos</router-link>
      <router-link to="/pedidos" class="nav-item">Pedidos</router-link>
    </div>

    <!-- Cerrar sesion -->
    <div class="flex-1 flex justify-end">
      <button
        @click="handleLogout"
        class="logout-button flex items-center space-x-2 bg-[#F56462] text-white font-bold px-4 py-2 rounded-[10px] hover:bg-[#e05454] focus:outline-none">
        <img src="../assets/icons/Resaltado/login-icon.svg" alt="Cerrar sesion" class="w-5 h-5" />
        <span>Salir</span>
      </button>
    </div>
  </nav>
</template>


<!-- Scripts -->
<script setup>
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  // Funcion para salir
  function handleLogout() {
    router.push({ name: "login" });
  }
</script>


<!-- Estilos -->
<style scoped>
/* Fuentes */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Josefin+Sans:wght@400;600&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.font-josefin {
  font-family: 'Josefin Sans', sans-serif;
}
</style>