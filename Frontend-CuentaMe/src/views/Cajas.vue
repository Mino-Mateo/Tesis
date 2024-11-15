<!-- HTML -->
<template>
  <!-- Navbar -->
  <Navbar />

  <main id="main" class="flex w-full min-h-screen p-4">
    <!-- Contenedor principal -->
    <div class="flex w-full gap-6 mt-[26px]">

      <!-- Contenedor cajas -->
      <section class="w-1/3 max-w-xs p-5 bg-[#8568AD] rounded-[20px] shadow-[4px_5px_16px_1px_#595959] h-[630px]">
        <!-- Añadir Caja -->
        <button @click="showAddForm = true" class="w-full bg-green-500 text-white font-bold py-2 px-4 mb-4 rounded-[20px]">
          Añadir Caja
        </button>
        
        <!-- Cuadro de Busqueda -->
        <div class="relative mb-10">
          <span class="absolute inset-y-0 left-4 flex items-center">
            <img src="../assets/icons/Resaltado/lupa-icon.svg" alt="Icono Buscar" class="w-7 h-6" />
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre"
            v-model="searchQuery"
            @input="filterCajas"
            class="block w-full pl-12 pr-3 py-3 text-center text-[#8A8A8A] font-bold bg-[#E0D3F5] border border-gray-300 rounded-[20px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
          />
        </div>

        <!-- Lista de cajas -->
        <div class="h-[500px] overflow-y-auto space-y-4 pr-5">
          <div
            v-for="(caja, index) in filteredCajas"
            :key="index"
            @click="selectCaja(caja)"
            class="caja-item p-1 pr-4 text-[#8A8A8A] font-bold bg-[#E0D3F5] flex items-center rounded-[20px] cursor-pointer"
          >
            <span>{{ caja.nombre }}</span>
          </div>
        </div>
      </section>

      <!-- Datos de las cajas -->
    </div>
  </main>
</template>


<!-- Scripts -->
<script setup>
import Navbar from "../components/Navbar.vue";
import { ref, computed } from 'vue';

// Datos de las cajas
const cajas = ref([
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
  { foto: 'https://via.placeholder.com/150', nombre: 'Caja Negra', descripcion: 'Cajaa negra con borde dorado hermoso', precio: 100, stock: 10 },
]);

const selectedCaja = ref(null);
const searchQuery = ref("");
const showAddForm = ref(false);
const editMode = ref(false);


// Filtrar cajas
const filteredCajas = computed(() => {
  return cajas.value.filter(caja => 
    caja.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Seleccionar caja
function selectCaja(caja) {
  selectedCaja.value = caja;
  showAddForm.value = false;
  editMode.value = false;
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
  background-image: url("../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
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
