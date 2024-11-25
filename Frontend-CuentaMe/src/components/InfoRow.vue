<!-- HTML -->
<template>
  <div class="flex items-center space-x-3">
    <strong class="text-center font-sans font-bold text-[20px]">{{ label }}:</strong>
    <span class="bg-light p-3 rounded-md flex-1 flex items-center font-sans font-bold">
      <img :src="iconSrc" alt="Icono" class="w-9 h-9 mr-7" />
      <span class="font-sans text-[18px]">{{ value }}</span>
    </span>
  </div>
</template>

<!-- Scripts -->
<script setup>
//Importaciones
import { computed } from 'vue';

// Definir las props
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

// Computar la ruta del icono
const iconSrc = computed(() => {
  return new URL(`../assets/icons/Resaltado/Simbolo/${props.icon}`, import.meta.url).href;
});
</script>