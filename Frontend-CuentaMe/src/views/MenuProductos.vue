<!-- HTML -->
<template>
    <main id="main" class="flex flex-col w-full min-h-screen font-poppins">
        <!-- Navbar -->
            <Navbar />

        <section class="flex justify-center items-center flex-1">
            <div class="grid grid-cols-2 gap-20"> 
                
                <!-- Cuadro Cajas -->
                <div @click="goToCajas" class="bg-[#8568AD] p-16 rounded-[30px] shadow-[4px_5px_16px_1px_#595959] flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105">
                <img src="../assets/icons/Resaltado/caja-icon.svg" alt="Icono Cajas" class="mb-6 w-16 h-16">
                <span class="text-white text-[32px] font-bold">Cajas</span> 
                </div>

                <!-- Cuadro Materiales -->
                <div @click="goToMateriales" class="bg-[#8568AD] p-16 rounded-[30px] shadow-[4px_5px_16px_1px_#595959] flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105">
                <img src="../assets/icons/Resaltado/flor-icon.svg" alt="Icono Materiales" class="mb-6 w-16 h-16">
                <span class="text-white text-[32px] font-bold">Materiales</span> 
                </div>
            </div>
        </section>
    </main>
</template>


<!-- Scripts -->
<script setup>
import Navbar from '../components/Navbar.vue';
import { useRouter } from 'vue-router';

// Configuración de redirecciones
const router = useRouter();

function goToCajas() {
    router.push('/Cajas');
}

function goToMateriales() {
    router.push('/materiales');
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

/* Fondo de pantalla */
main {
    background-image: url("../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
    background-size: cover;
}

/* Animación */
@keyframes slide-in {
    0% {
    transform: translateX(100%);
    }
    100% {
    transform: translateX(0);
    }
}

</style>