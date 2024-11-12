<!-- HTML -->
<template>
    <main id="main" class="flex flex-col w-full min-h-screen">

    <!-- Navbar -->
    <Navbar />

    </main>
</template>


<!-- Scripts -->
<script setup>
// Importar el Navbar
import Navbar from '../components/Navbar.vue';
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


/* Estilos extras */
main {
  background-image: url("../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
  background-size: cover
}

@keyframes slide-in {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
