<!-- HTML -->
<template>
    <main id="main" class="flex flex-col w-full min-h-screen">
    <!-- Navbar -->
    <Navbar />

        <!-- Contenedor de clientes -->
        <section class="w-1/3 max-w-xs p-5 bg-[#8568AD] rounded-[20px] shadow-[4px_5px_16px_1px_#595959] mt-[26px] ml-[20px]">
            <div class="relative">
                <!-- Cuadro de Busqueda -->
                <div class="relative">
                    <!-- Icono Buscar -->
                    <span class="absolute inset-y-0 left-4 flex items-center">
                        <img src="../assets/icons/Resaltado/lupa-icon.svg" alt="Icono Email" class="w-7 h-6" />
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        class="block w-full pl-12 pr-3 py-3 text-center text-[#8A8A8A] font-bold bg-[#E0D3F5] border border-gray-300 rounded-[20px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
                    />
                </div>
            </div>
        </section>
    </main>
</template>

<!-- Scripts -->
<script setup>
    // Importar el Navbar
    import Navbar from "../components/Navbar.vue";
    import { ref } from 'vue';
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
