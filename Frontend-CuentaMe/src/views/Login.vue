<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen">

    <!-- Formulario Login -->
    <div class="flex flex-1 items-center justify-center">
      <div class="w-[436px] h-[500px] p-8 bg-[#8568AD] rounded-[20px] shadow-[4px_5px_16px_1px_#595959]">
        <h2 class="text-[36px] font-bold text-center mb-6 text-white font-poppins">Bienvenid@</h2>

        <!-- Cuadro contenedor del formulario -->
        <form class="space-y-4">
          <!-- Correo -->
          <div>
            <input
              type="email"
              id="email"
              required
              class="mt-1 block w-full px-3 py-2 text-[#8A8A8A] bg-[#E0D3F5] border border-gray-300 rounded-[20px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
              placeholder="Correo electrónico"
            />
          </div>

          <!-- Contraseña -->
          <div>
            <input
              type="clave"
              id="clave"
              required
              class="mt-1 block w-full px-3 py-2 text-[#8A8A8A] bg-[#E0D3F5] border border-gray-300 rounded-[20px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
              placeholder="Contraseña"
            />
          </div>

          <!-- Boton Ingreso -->
          <div>
            <button
              type="submit"
              class="w-full py-2 px-4 bg-[#8A8FB9] text-white font-semibold rounded-[20px] hover:bg-[#9397c0] focus:outline-none focus:ring-2 focus:ring-[#946ad8] focus:border-[#946ad8] focus:ring-opacity-50 font-josefin"
            >
              Ingresar
            </button>
          </div>
        </form>

        <!-- Enlace para recuperar cuenta -->
        <div class="text-center mt-4">
          <a href="/recuperar-cuenta" class="text-sm text-[#E0D3F5] hover:underline font-josefin">
            Recuperar contraseña
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

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
</style>
