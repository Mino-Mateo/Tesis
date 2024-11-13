<!-- HTML -->
<template>
  <!-- Navbar -->
  <Navbar />

  <main id="main" class="flex w-full min-h-screen p-4">
    <!-- Contenedor principal -->
    <div class="flex w-full gap-6 mt-[26px]">

      <!-- Contenedor clientes -->
      <section class="w-1/3 max-w-xs p-5 bg-[#8568AD] rounded-[20px] shadow-[4px_5px_16px_1px_#595959] h-[630px]">
        <!-- Cuadro de Busqueda -->
        <div class="relative mb-10">
          <span class="absolute inset-y-0 left-4 flex items-center">
            <img src="../assets/icons/Resaltado/lupa-icon.svg" alt="Icono Buscar" class="w-7 h-6" />
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre"
            v-model="searchQuery"
            @input="filterClientes"
            class="block w-full pl-12 pr-3 py-3 text-center text-[#8A8A8A] font-bold bg-[#E0D3F5] border border-gray-300 rounded-[20px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
          />
        </div>

        <!-- Lista de clientes -->
        <div class="h-[500px] overflow-y-auto space-y-4 pr-5">
          <div
            v-for="(cliente, index) in filteredClientes"
            :key="index"
            @click="selectCliente(cliente)"
            class="cliente-item p-1 pr-4 text-[#8A8A8A] font-bold bg-[#E0D3F5] flex items-center rounded-[20px] cursor-pointer"
          >
            <div class="icon w-10 h-10 rounded-full flex items-center justify-center mr-4">
              <img src="../assets/icons/Resaltado/cliente-icon.svg" alt="Icono Cliente" class="w-8 h-8" />
            </div>
            <span>{{ cliente.nombre }} {{ cliente.apellido }}</span>
          </div>
        </div>
      </section>

      <!-- Datos del Cliente -->
      <section class="w-2/3 p-8 h-[600px] bg-[#8568AD] rounded-[20px] shadow-[4px_5px_16px_1px_#595959] flex flex-col items-center">
        <div class="flex items-center justify-center mb-6">
          <h2 class="text-[36px] font-bold text-white">Datos del Cliente</h2>
        </div>

        <div v-if="selectedCliente" class="w-full bg-[#C7B2E3] text-[24px] font-josefin p-8 rounded-[20px] text-[#4B3C68] font-semibold space-y-10">
          <!-- Correo -->
          <div class="flex justify-between items-center space-x-4">
            <div class="flex items-center space-x-2 w-1/2">
              <strong class="whitespace-nowrap">Correo:</strong>
              <span class="bg-[#E9D8FD] p-3 rounded-[10px] flex-1 truncate">{{ selectedCliente.correo }}</span>
            </div>
          </div>
          
          <!-- Nombre y Apellido -->
          <div class="flex justify-between space-x-4">
            <div class="flex items-center space-x-2 w-1/2">
              <strong class="whitespace-nowrap">Nombre:</strong>
              <span class="bg-[#E9D8FD] p-3 rounded-[10px] flex-1 truncate">{{ selectedCliente.nombre }}</span>
            </div>
            <div class="flex items-center space-x-2 w-1/2">
              <strong class="whitespace-nowrap">Apellido:</strong>
              <span class="bg-[#E9D8FD] p-3 rounded-[10px] flex-1 truncate">{{ selectedCliente.apellido }}</span>
            </div>
          </div>
          
          <!-- Direccion y Telefono -->
          <div class="flex justify-between space-x-4">
            <div class="flex items-center space-x-2 w-1/2">
              <strong class="whitespace-nowrap">Dirección:</strong>
              <span class="bg-[#E9D8FD] p-3 rounded-[10px] flex-1 truncate">{{ selectedCliente.direccion }}</span>
            </div>
            <div class="flex items-center space-x-2 w-1/2">
              <strong class="whitespace-nowrap">Teléfono:</strong>
              <span class="bg-[#E9D8FD] p-3 rounded-[10px] flex-1 truncate">{{ selectedCliente.telefono }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<!-- Scripts -->
<script setup>
import Navbar from "../components/Navbar.vue";
import { ref, computed } from 'vue';

// Datos de los clientes
const clientes = ref([
  { nombre: 'Salome', apellido: 'Suarez', correo: 'salome@example.com', telefono: '0999999999', direccion: 'Calle 1' },
  { nombre: 'John', apellido: 'Travolta', correo: 'john@example.com', telefono: '0999999999', direccion: 'Calle 2' },
  { nombre: 'Jaime', apellido: 'Sabines', correo: 'jaime@example.com', telefono: '0999999999', direccion: 'Calle 3' },
  { nombre: 'Leonel', apellido: 'Messi', correo: 'leo@example.com', telefono: '0999999999', direccion: 'Calle 4' },
  { nombre: 'Cristiano', apellido: 'Ronaldo', correo: 'cr7@example.com', telefono: '0999999999', direccion: 'Calle 5' },
  { nombre: 'Serena', apellido: 'Yvonne', correo: 'serexyz@example.com', telefono: '0999999999', direccion: 'Calle 5' },
  { nombre: 'Salome', apellido: 'Suarez', correo: 'salome@example.com', telefono: '0999999999', direccion: 'Calle 1' },
  { nombre: 'John', apellido: 'Travolta', correo: 'john@example.com', telefono: '0999999999', direccion: 'Calle 2' },
  { nombre: 'Jaime', apellido: 'Sabines', correo: 'jaime@example.com', telefono: '0999999999', direccion: 'Calle 3' },
  { nombre: 'Leonel', apellido: 'Messi', correo: 'leo@example.com', telefono: '0999999999', direccion: 'Calle 4' },
  { nombre: 'Cristiano', apellido: 'Ronaldo', correo: 'cr7@example.com', telefono: '0999999999', direccion: 'Calle 5' },
  { nombre: 'Serena', apellido: 'Yvonne', correo: 'serexyz@example.com', telefono: '0999999999', direccion: 'Calle 5' },
  { nombre: 'Salome', apellido: 'Suarez', correo: 'salome@example.com', telefono: '0999999999', direccion: 'Calle 1' },
  { nombre: 'John', apellido: 'Travolta', correo: 'john@example.com', telefono: '0999999999', direccion: 'Calle 2' },
  { nombre: 'Jaime', apellido: 'Sabines', correo: 'jaime@example.com', telefono: '0999999999', direccion: 'Calle 3' },
  { nombre: 'Leonel', apellido: 'Messi', correo: 'leo@example.com', telefono: '0999999999', direccion: 'Calle 4' },
  { nombre: 'Cristiano', apellido: 'Ronaldo', correo: 'cr7@example.com', telefono: '0999999999', direccion: 'Calle 5' },
  { nombre: 'Serena', apellido: 'Yvonne', correo: 'serexyz@example.com', telefono: '0999999999', direccion: 'Calle 5' },
]);

const selectedCliente = ref(null);
const searchQuery = ref("");

// Mostrar Datos
function selectCliente(cliente) {
  selectedCliente.value = cliente;
}

// Filtrar nombres
const filteredClientes = computed(() => {
  return clientes.value.filter(cliente => 
    `${cliente.nombre} ${cliente.apellido}`
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );
});
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
