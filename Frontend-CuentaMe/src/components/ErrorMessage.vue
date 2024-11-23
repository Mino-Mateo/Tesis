<!-- HTML -->
<template>
  <div
    class="fixed top-4 right-0 bg-danger text-text-white px-4 py-2 rounded-l-md shadow-lg flex items-start space-x-3 animate-slide-in">
    <img src="../assets/icons/Resaltado/Alerta/alert-icon.svg" alt="Icono de error" class="w-6 h-6" />
    <div>
      <p class="font-semibold">{{ message }}</p>
    </div>
  </div>
</template>

<!-- Scripts -->
<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>