<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen">
    <Navbar aria-label="Menú de navegación principal" />
    <div v-if="isLoading" class="flex items-center justify-center"></div>
    <div v-else>
      <!-- Contenido del menú -->
    </div>
  </main>
</template>

<!-- Scripts -->
<script setup>
// Importaciones
import Navbar from "../../components/Navbar.vue";
import { ref } from "vue";

// Variables
const isLoading = ref(true);

// Simular carga de datos
setTimeout(() => {
  isLoading.value = false;
}, 2000); 
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

/* Estilos adicionales */
@keyframes fade-in-background {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

main {
  background-image: url("../../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
  background-size: cover;
  background-position: center;
  animation: fade-in-background 1s ease-in-out;
  height: 100vh;
}
</style>