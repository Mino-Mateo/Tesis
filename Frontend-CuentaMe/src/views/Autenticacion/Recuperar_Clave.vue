<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen">
    <!-- Regresar al Login -->
    <button class="absolute top-4 left-6 w-10 h-10 bg-primary rounded-ms flex items-center justify-center"
      @click="navigateToLogin" aria-label="Regresar al login">
      <img src="../../assets/icons/Resaltado/Accion/back-icon.svg" alt="Flecha Regresar" class="w-8 h-8 pl-2" />
    </button>

    <!-- Formulario General -->
    <div class="flex flex-1 items-center justify-center">
      <div class="w-full max-w-md p-8 bg-primary rounded-box shadow-pr">
        <h2 class="text-[36px] font-bold text-center mb-6 text-text-light font-heading">Recuperar Clave</h2>
        <p class="text-center mb-4 text-text-light font-sans">
          Ingresa tu correo electrónico, te enviaremos un correo para cambiar tu clave.
        </p>

        <form @submit.prevent="handlePasswordRecovery" class="space-y-4">
          <!-- Campo del correo -->
          <div class="relative">
            <span class="absolute inset-y-0 left-4 flex items-center">
              <img src="../../assets/icons/Resaltado/Simbolo/mail-icon.svg" alt="Icono Carta" class="w-5 h-5" />
            </span>
            <input type="email" v-model="email" required
              class="block w-full pl-12 pr-3 py-3 text-center text-[#000000] font-bold bg-light border border-gray-300 rounded-box shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
              placeholder="Correo electrónico" aria-label="Correo electrónico" />
          </div>

          <!-- Botón de recuperación -->
          <button type="submit"
            class="w-full py-2 px-4 bg-secondary text-light font-semibold rounded-box hover:bg-[#9397c0] focus:outline-none focus:ring-2 focus:ring-[#946ad8] focus:border-[#946ad8]"
            aria-label="Recuperar contraseña">
            Recuperar
          </button>
        </form>
      </div>
    </div>

    <!-- Ventana de confirmación -->
    <ConfirmationModal v-if="showConfirmation" title="Correo enviado con éxito"
      message="Revisa tu bandeja de entrada para restablecer tu clave" @close="closeConfirmation" />

    <!-- Mensaje de Error -->
    <ErrorMessage v-if="showError" :message="'Ingresa un correo electrónico válido'" />
  </main>
</template>

<!-- Scripts -->
<script setup>
// Importaciones
import ConfirmationModal from "../../components/ConfirmationModal.vue";
import ErrorMessage from "../../components/ErrorMessage.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

// Variables
const email = ref("");
const showConfirmation = ref(false);
const showError = ref(false);
const router = useRouter();

/* Funciones */
// Ir al login
function navigateToLogin() {
  router.push({ name: "Login" });
}

// Verificar correo y enviar mensaje
function handlePasswordRecovery() {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (emailPattern.test(email.value)) {
    showConfirmation.value = true;
  } else {
    showError.value = true;
    setTimeout(() => (showError.value = false), 500000);
  }
}

// Cerrar ventana
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