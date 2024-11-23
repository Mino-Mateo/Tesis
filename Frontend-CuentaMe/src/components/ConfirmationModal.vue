<!-- HTML -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div class="relative p-8 bg-primary rounded-box text-center w-3/4 max-w-md">
      <!-- Botón para cerrar -->
      <button class="absolute top-2 right-2 text-white" @click="$emit('close')" aria-label="Cerrar ventana">
        <img src="../../assets/icons/Resaltado/Accion/close-icon.svg" alt="Cerrar" class="w-8 h-8" />
      </button>

      <!-- Mensaje -->
      <p class="text-white font-bold mb-2 font-heading text-[29px]">{{ title }}</p>
      <img src="../../assets/icons/Resaltado/Alerta/confirmacion-icon.svg" alt="Confirmación"
        class="w-20 h-20 mx-auto mb-4" />
      <p class="text-white font-sans text-[20px]">{{ message }}</p>
    </div>
  </div>
</template>

<!-- Scripts -->
<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
</script>