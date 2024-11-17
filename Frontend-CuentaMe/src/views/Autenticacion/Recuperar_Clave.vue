<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen">
    <!-- Regresar al Login -->
    <button class="absolute top-4 left-6 w-10 h-10 bg-primary rounded-ms flex items-center justify-center"
      @click="navigateToLogin" aria-label="Regresar al login">
      <img src="../../assets/icons/Resaltado/Accion/back-icon.svg" alt="Flecha Regresar"
        class="w-8 h-8 pl-2 items-center justify-center" />
    </button>

    <!-- Formulario General -->
    <div class="flex flex-1 items-center justify-center">
      <div class="w-full max-w-md p-8 bg-primary rounded-box shadow-pr">
        <!-- Texto -->
        <h2 class="text-[36px] font-bold text-center mb-6 text-[#EEEFFB] font-heading">
          Recuperar Clave
        </h2>
        <p class="text-center mb-4 text-[#EEEFFB] font-sans">
          Ingresa tu correo electrónico, te enviaremos un correo para que puedas
          cambiar tu clave.
        </p>

        <!-- Formulario de recuperación -->
        <form @submit.prevent="handlePasswordRecovery" class="space-y-4">
          <div class="relative">
            <span class="absolute inset-y-0 left-4 flex items-center">
              <img src="../../assets/icons/Resaltado/Simbolo/mail-icon.svg" alt="Icono Carta" class="w-5 h-5" />
            </span>
            <input type="email" v-model="email" required
              class="block w-full pl-12 pr-3 py-3 text-center text-[#000000] font-bold bg-light border border-gray-300 rounded-box shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
              placeholder="Correo electrónico" aria-label="Correo electrónico" />
          </div>
          <div class="relative">
            <button type="submit"
              class="w-full py-2 px-4 bg-secondary text-[#EEEFFB] font-semibold rounded-box hover:bg-[#9397c0] focus:outline-none focus:ring-2 focus:ring-[#946ad8] focus:border-[#946ad8] focus:ring-opacity-50 font-sans"
              aria-label="Recuperar contraseña">
              Recuperar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Ventana de confirmación -->
    <transition name="slide">
      <div v-if="showConfirmation" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div class="relative p-8 bg-primary rounded-box text-center w-3/4 max-w-md">
          <!-- Botón para cerrar ventana -->
          <button class="absolute top-2 right-2 text-white" @click="closeConfirmation"
            aria-label="Cerrar ventana de confirmación">
            <img src="../../assets/icons/Resaltado/Accion/close-icon.svg" alt="Cerrar" class="w-8 h-8" />
          </button>

          <!-- Mensaje de confirmación -->
          <p class="text-white font-bold mb-2 font-heading text-[29px]">
            Correo enviado con éxito
          </p>
          <img src="../../assets/icons/Resaltado/Alerta/confirmacion-icon.svg" alt="Confirmación"
            class="w-20 h-20 mx-auto mb-4" />
          <p class="text-[#EEEFFB] font-sans text-[20px]">
            Correo enviado con éxito, revisa tu bandeja de entrada para
            restablecer tu clave
          </p>
        </div>
      </div>
    </transition>

    <!-- Mensaje de Error -->
    <transition name="slide">
      <div v-if="showError"
        class="fixed top-4 right-0 bg-danger text-text-light px-4 py-2 rounded-l-md shadow-lg flex items-start space-x-3 animate-slide-in">
        <img src="../../assets/icons/Resaltado/Alerta/alert-icon.svg" alt="Icono de error" class="w-6 h-6 mt-3" />
        <div>
          <p class="font-semibold">Ingresa un correo electrónico válido</p>
          <p class="font-semibold items-center">Intenta de nuevo</p>
        </div>
      </div>
    </transition>

  </main>
</template>

<!-- Scripts -->
<script setup>
// Importaciones
import { ref } from "vue";
import { useRouter } from "vue-router";

// Variables
const email = ref("");
const showConfirmation = ref(false);
const router = useRouter();
const showError = ref(false);

// Función para regresar al login
function navigateToLogin() {
  router.push({ name: "Login" });
}

// Función para recuperar la clave
function handlePasswordRecovery() {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (emailPattern.test(email.value)) {
    showConfirmation.value = true;
  } else {
    showError.value = true;
    setTimeout(() => (showError.value = false), 5000);
  }
}

// Función para cerrar la ventana emergente
function closeConfirmation() {
  showConfirmation.value = false;
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

/* Estilos generales */
main {
  background-image: url("../../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
  background-size: cover;
}

/* Animaciones */
@keyframes slide-in {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.5s ease-out forwards;
}
</style>