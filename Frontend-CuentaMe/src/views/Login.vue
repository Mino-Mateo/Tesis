<!-- HTML -->
<template>
<main id="main" class="flex flex-col w-full min-h-screen">

<!-- Formulario Login -->
<div class="flex flex-1 items-center justify-center">
  <!-- Contenedor del formulario -->
  <div class="w-full max-w-sm p-10 bg-[#8568AD] rounded-[30px] shadow-[4px_5px_16px_1px_#595959] h-[400px]">
    <h2 class="text-[32px] font-bold text-center mb-8 text-[#EEEFFB] font-poppins">Bienvenid@</h2>

    <!-- Cuadro contenedor -->
    <form @submit.prevent="handleLogin" class="space-y-6">
      
      <!--Correo -->
      <div class="relative">
        <!-- Icono -->
        <span class="absolute inset-y-0 left-4 flex items-center">
          <img src="../assets/icons/Resaltado/mail-icon.svg" alt="Icono Email" class="w-5 h-5" />
        </span>

        <!-- Input -->
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="block w-full pl-12 pr-3 py-3 text-center text-[#8A8A8A] font-bold bg-[#E0D3F5] border border-gray-300 rounded-[20px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
          placeholder="Correo electrónico"
        />
      </div>

      <!-- Contraseña -->
      <div class="relative">
        <!-- Icono a la izquierda -->
        <span class="absolute inset-y-0 left-4 flex items-center">
          <img src="../assets/icons/Resaltado/password-icon.svg" alt="Icono Candado" class="w-5 h-5" />
        </span>

        <!-- Input  -->
        <input
          :type="showPassword ? 'text' : 'password'"
          id="clave"
          v-model="clave"
          required
          class="block w-full pl-12 pr-12 py-3 text-center text-[#8A8A8A] font-bold bg-[#E0D3F5] border border-gray-300 rounded-[20px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
          placeholder="Contraseña"
        />

        <!-- Icono -->
        <span class="absolute inset-y-0 right-4 flex items-center cursor-pointer" @click="togglePasswordVisibility">
          <img src="../assets/icons/Resaltado/eyepswd-icon.svg" alt="Icono Ojo" class="w-5 h-5" />
        </span>
      </div>


      <!-- Ingreso -->
      <div class="relative">
        <button
          type="submit"
          class="w-full flex items-center justify-center py-2 px-4 bg-[#8A8FB9] text-[#EEEFFB] font-semibold rounded-[20px] hover:bg-[#9397c0] focus:outline-none focus:ring-2 focus:ring-[#946ad8] focus:border-[#946ad8] focus:ring-opacity-50 font-josefin"
        >
          <!-- Icono -->
          <img src="../assets/icons/Resaltado/login-icon.svg" alt="Icono Ingresar" class="w-5 h-5 mr-2" />
          Ingresar
        </button>
      </div>
    </form>

    <!-- Recuperar cuenta -->
    <div class="text-center mt-6">
      <a href="/recuperar-cuenta" class="text-sm text-[#E0D3F5] hover:underline font-josefin">
        Recuperar contraseña
      </a>
    </div>
  </div>
</div>


<!-- Mensaje de Alerta -->
<transition name="slide">
  <div
    v-if="showError"
    class="fixed top-4 right-0 bg-[#F56462] text-[#EEEFFB] px-4 py-2 rounded-l-md shadow-lg flex items-start space-x-3 animate-slide-in"
  >
    <!-- Icono de advertencia -->
    <img src="../assets/icons/Resaltado/alert-icon.svg" alt="Icono de error" class="w-6 h-6 mt-3" />

    <!-- Contenido del mensaje -->
    <div>
      <p class="font-semibold">El usuario o contraseña son incorrectos</p>
      <p class="font-semibold items-center">Intenta de nuevo</p>
    </div>
  </div>
</transition>
</main>
</template>


<!-- Scripts -->
<script setup>
// Importaciones
import { ref } from 'vue';

// Constantes
const email = ref('');
const clave = ref('');
const showError = ref(false);
const showPassword = ref(false);

// Funcion Login
function handleLogin() {
  if (email.value !== 'a@a.com' || clave.value !== '123456') {
    showError.value = true;
    setTimeout(() => (showError.value = false), 5000); 
}
}

// Funcion ver constraseña
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
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


/* Estilos extras */
main {
  background-image: url("../assets/icons/Fondo_de_Pantalla/FondoPantallaLogo.png");
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

/* Animaciones */ 
.animate-slide-in {
  animation: slide-in 0.5s ease-out forwards;
}
</style>
