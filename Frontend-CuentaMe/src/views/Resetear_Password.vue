<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen">
    <!-- Regresar -->
    <button
      class="absolute top-4 left-6 w-10 h-10 bg-[#8568AD] rounded-[10px] flex items-center justify-center"
      @click="navigateToLogin">
      <img src="../assets/icons/Resaltado/back-icon.svg" alt="Flecha Regresar" class="w-8 h-8 pl-2 items-center justify-center" />
    </button>

    <!-- Contenedor formulario -->
    <div class="flex flex-1 items-center justify-center">
      <div class="w-full max-w-md p-8 bg-[#8568AD] rounded-[20px] shadow-[4px_5px_16px_1px_#595959]">
        <!--Texto -->
        <h2 class="text-[36px] font-bold text-center mb-6 text-[#EEEFFB] font-poppins">
          Restablecer Clave
        </h2>
        <p class="text-center mb-4 text-[#EEEFFB] font-josefin">
          Ingresa tu nueva contraseña para restablecerla
        </p>

        <!-- Campos de la clave doble -->
        <form @submit.prevent="handlePasswordReset" class="space-y-4">
          <!-- Clave 1 -->
          <div class="relative">
            <span class="absolute inset-y-0 left-4 flex items-center">
              <img
                src="../assets/icons/Resaltado/password-icon.svg"
                alt="Icono de Candado"
                class="w-5 h-5"
              />
            </span>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="newPassword"
              required
              class="block w-full pl-12 pr-3 py-3 text-center text-[#000000] font-bold bg-[#E0D3F5] border border-gray-300 rounded-[20px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
              placeholder="Nueva Contraseña"
            />
          <!-- Icono -->
          <span class="absolute inset-y-0 right-4 flex items-center cursor-pointer" @click="togglePasswordVisibility">
            <img src="../assets/icons/Resaltado/eyepswd-icon.svg" alt="Icono Ojo" class="w-5 h-5" />
          </span>
          </div>

          <!-- Clave 2 -->
          <div class="relative">
            <span class="absolute inset-y-0 left-4 flex items-center">
              <img
                src="../assets/icons/Resaltado/password-icon.svg"
                alt="Icono de Candado"
                class="w-5 h-5"
              />
            </span>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              required
              class="block w-full pl-12 pr-3 py-3 text-center text-[#000000] font-bold bg-[#E0D3F5] border border-gray-300 rounded-[20px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
              placeholder="Confirmar Contraseña"
            />
          <!-- Icono -->
          <span class="absolute inset-y-0 right-4 flex items-center cursor-pointer" @click="togglePasswordVisibility">
            <img src="../assets/icons/Resaltado/eyepswd-icon.svg" alt="Icono Ojo" class="w-5 h-5" />
          </span>
          </div>

          <!-- Ènviar formulario -->
          <div class="relative">
            <button
              type="submit"
              class="w-full py-2 px-4 bg-[#8A8FB9] text-[#EEEFFB] font-semibold rounded-[20px] hover:bg-[#9397c0] focus:outline-none focus:ring-2 focus:ring-[#946ad8] focus:border-[#946ad8] focus:ring-opacity-50 font-josefin">
              Restablecer
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Ventana de confirmaciona -->
    <transition name="slide">
      <div
        v-if="showConfirmation"
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
      >
        <div class="relative p-8 bg-[#8568AD] rounded-[20px] text-center w-3/4 max-w-md">
          <button
            class="absolute top-2 right-2 text-white"
            @click="closeConfirmation"
          >
            <img
              src="../assets/icons/Resaltado/close-icon.svg"
              alt="Cerrar"
              class="w-8 h-8"
            />
          </button>
          <p class="text-white font-bold mb-2 font-poppins text-[29px]">
            Contraseña Restablecida
          </p>
          <img
            src="../assets/icons/Resaltado/confirmacion-icon.svg"
            alt="Confirmación"
            class="w-20 h-20 mx-auto mb-4"
          />
          <p class="text-[#EEEFFB] font-josefin text-[20px]">
            Tu contraseña ha sido restablecida con éxito. Ahora puedes iniciar
            sesión con tu nueva clave.
          </p>
        </div>
      </div>
    </transition>

    <!-- Mensaje de Alerta -->
    <transition name="slide">
      <div
        v-if="showError"
        class="fixed top-4 right-0 bg-[#F56462] text-[#EEEFFB] px-4 py-2 rounded-l-md shadow-lg flex items-start space-x-3 animate-slide-in"
      >
        <img src="../assets/icons/Resaltado/alert-icon.svg" alt="Icono de error" class="w-6 h-6 mt-3" />
        <div>
          <p class="font-semibold">Las contraseñas no coinciden</p>
          <p class="font-semibold items-center">Intenta de nuevo</p>
        </div>
      </div>
    </transition>
  </main>
</template>


<!-- Scripts -->
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const newPassword = ref("");
const confirmPassword = ref("");
const showError = ref(false);
const showConfirmation = ref(false);
const showPassword = ref(false);

// Regresar al Login
function navigateToLogin() {
  router.push({ name: "login" });
}

// Restablecer la contraseña
function handlePasswordReset() {
  if (newPassword.value !== confirmPassword.value) {
    showError.value = true;
    setTimeout(() => (showError.value = false), 5000);
  } else {
    showConfirmation.value = true;
  }
}

// Cerrar ventana de confirmación
function closeConfirmation() {
  showConfirmation.value = false;
}

// Funcion ver constraseña
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}
</script>


<!-- Estilos -->
<style scoped>
/* Fuentes */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Josefin+Sans:wght@400;600&display=swap");

.font-poppins {
  font-family: "Poppins", sans-serif;
}

.font-josefin {
  font-family: "Josefin Sans", sans-serif;
}

/* Estilos extras */
main {
  background-image: url("../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
  background-size: cover;
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