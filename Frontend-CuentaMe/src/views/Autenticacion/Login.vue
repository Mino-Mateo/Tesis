<!-- HTML -->
<template>
  <router-view />
  <main id="main" class="flex flex-col w-full min-h-screen">
    <div class="flex flex-1 items-center justify-center">
      <div class="w-full max-w-sm p-10 bg-primary rounded-2xl shadow-lg h-auto sm:h-[400px]">
        <!-- Texto de Bienvenida -->
        <h2 class="text-3xl font-bold text-center mb-8 text-text-light font-heading">
          Bienvenid@
        </h2>

        <!-- Formulario de Login -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Correo -->
          <div class="relative">
            <label for="email" class="sr-only">Correo electrónico</label>
            <span class="absolute inset-y-0 left-4 flex items-center">
              <img src="../../assets/icons/Resaltado/Simbolo/mail-icon.svg" alt="Icono de correo electrónico"
                class="w-5 h-5" />
            </span>
            <input type="email" id="email" v-model="email" required
              class="block w-full pl-12 pr-10 py-3 text-center text-neutral font-bold bg-light border border-gray-300 rounded-input shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Correo electrónico" aria-label="Correo electrónico" />
          </div>

          <!-- Contraseña -->
          <div class="relative">
            <label for="clave" class="sr-only">Contraseña</label>
            <span class="absolute inset-y-0 left-4 flex items-center">
              <img src="../../assets/icons/Resaltado/Simbolo/password-icon.svg" alt="Icono de candado"
                class="w-5 h-5" />
            </span>
            <input :type="showPassword ? 'text' : 'password'" id="clave" v-model="clave" required
              class="block w-full pl-12 pr-10 py-3 text-center text-neutral font-bold bg-light border border-gray-300 rounded-input shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Contraseña" aria-label="Contraseña" />
            <span class="absolute inset-y-0 right-4 flex items-center cursor-pointer" @click="togglePasswordVisibility">
              <img src="../../assets/icons/Resaltado/Accion/eyepswd-icon.svg" alt="Mostrar/Ocultar contraseña"
                class="w-5 h-5" />
            </span>
          </div>

          <!-- Ingreso -->
          <div class="relative">
            <button type="submit"
              class="w-full flex items-center justify-center py-2 px-4 bg-secondary text-text-light font-semibold rounded-button hover:bg-hover-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-opacity-50 font-sans"
              aria-label="Ingresar">
              <img src="../../assets/icons/Resaltado/Simbolo/login-icon.svg" alt="Icono de ingresar"
                class="w-5 h-5 mr-2" />
              Ingresar
            </button>
          </div>
        </form>

        <!-- Recuperar clave -->
        <div class="text-center mt-4">
          <router-link to="/recuperacion" class="text-sm text-light hover:underline font-sans">
            Recuperar contraseña
          </router-link>
        </div>
      </div>
    </div>

    <!-- Mensaje de Error -->
    <transition name="slide">
      <div v-if="showError"
        class="fixed top-4 right-0 bg-danger text-text-light px-4 py-2 rounded-l-md shadow-lg flex items-start space-x-3 animate-slide-in">
        <img src="../../assets/icons/Resaltado/Alerta/alert-icon.svg" alt="Icono de error" class="w-6 h-6 mt-3" />
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
import { ref } from "vue";
import { useRouter } from "vue-router";

// Variables reactivas
const email = ref("");
const clave = ref("");
const showError = ref(false);
const showPassword = ref(false);
const router = useRouter();

// Función para el Inicio de sesión
function handleLogin() {
  if (email.value === "a@a.com" && clave.value === "123456") {
    router.push("/Menu"); 
  } else {
    showError.value = true;
    setTimeout(() => (showError.value = false), 5000); 
  }
}

// Ver contraseña
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
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

/* Estilos del fondo */
main {
  background-image: url("../../assets/icons/Fondo_de_Pantalla/FondoPantallaLogo.png");
  background-size: cover;
  background-repeat: no-repeat;
}

/* Adaptabilidad */
@media (max-width: 640px) {
  /* Ajuste la clase para versiones modernas de Tailwind */
  .rounded-2xl {
    border-radius: 20px; /* Reemplazo directo */
  }

  h2 {
    font-size: 1.5rem;
  }

  input {
    font-size: 0.875rem;
  }

  button {
    font-size: 0.875rem;
  }
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