<!-- HTML -->
<template>
  <!-- Navbar -->
  <Navbar />

  <main id="main" class="flex flex-col w-full min-h-screen pl-10 pt-0">
    <!-- Contenedor principal -->
    <div class="flex w-full  h-full gap-6 mt-[26px]">

      <!-- Contenedor clientes -->
      <section class="w-1/3 max-w-xs p-5 h-[560px] bg-primary rounded-box shadow-pr">
        <!-- Cuadro de Busqueda -->
        <div class="relative mb-10">
          <span class="absolute inset-y-0 left-4 flex items-center">
            <img src="../../assets/icons/Resaltado/Simbolo/lupa-icon.svg" alt="Icono Buscar" class="w-7 h-6" />
          </span>
          <input type="text" placeholder="Buscar por nombre" v-model="searchQuery" @input="filterClientes"
            class="block w-full pl-12 pr-3 py-3 text-center text-simple font-bold bg-light border border-gray-300 rounded-box shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]" />
        </div>

        <!-- Lista de clientes -->
        <div class="h-[435px] overflow-y-auto space-y-4 pr-5">
          <div v-for="(cliente, index) in filteredClientes" :key="index" @click="selectCliente(cliente)"
            class="cliente-item p-1 pr-4 text-simple font-bold bg-light flex items-center rounded-box cursor-pointer">
            <div class="icon w-10 h-10 rounded-full flex items-center justify-center mr-4">
              <img src="../../assets/icons/Resaltado/Simbolo/cliente-icon.svg" alt="Icono Cliente" class="w-8 h-8" />
            </div>
            <span>{{ cliente.nombre }} {{ cliente.apellido }}</span>
          </div>
        </div>
      </section>

      <!-- Datos del Cliente -->
      <section class="w-[850px] mx-auto p-6 h-[560px] bg-primary rounded-box shadow-pr flex flex-col items-center">
        <div class="flex items-center justify-center mb-6">
          <h2 class="text-[36px] font-bold text-white">Datos del Cliente</h2>
        </div>

        <!-- Contenedor principal -->
        <div class="w-full h-[560px] bg-secondary p-6 rounded-box text-neutral font-semibold space-y-6">
          <div v-if="selectedCliente" class="space-y-4">
            <!-- Correo -->
            <div class="grid grid-cols-1 gap-6">
              <div class="flex items-center space-x-3">
                <!-- Icono de Correo -->
                <strong class="whitespace-nowrap">Correo:</strong>
                <span class="bg-content p-3 rounded-ms flex-1 truncate flex items-center justify-between">
                  <img src="../../assets/icons/Resaltado/Simbolo/mail2-icon.svg" alt="Icono de Correo"
                    class="w-9 h-9 mr-2" />
                  <span>{{ selectedCliente.correo }}</span>
                  <i class="fas fa-copy text-neutral cursor-pointer"></i>
                </span>
              </div>

              <!-- Nombre y Apellido -->
              <div class="grid grid-cols-2 gap-6">
                <div class="flex items-center space-x-3">
                  <!-- Icono de Nombre -->
                  <strong class="whitespace-nowrap">Nombre:</strong>
                  <span class="bg-content p-3 rounded-ms flex-1 truncate flex items-center justify-between">
                    <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Icono de Nombre"
                      class="w-9 h-9 mr-2" />
                    <span>{{ selectedCliente.nombre }}</span>
                    <i class="fas fa-edit text-neutral cursor-pointer"></i>
                  </span>
                </div>
                <div class="flex items-center space-x-3">
                  <!-- Icono de Apellido -->
                  <strong class="whitespace-nowrap">Apellido:</strong>
                  <span class="bg-content p-3 rounded-ms flex-1 truncate flex items-center justify-between">
                    <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Icono de Apellido"
                      class="w-9 h-9 mr-2" />
                    <span>{{ selectedCliente.apellido }}</span>
                    <i class="fas fa-edit text-neutral cursor-pointer"></i>
                  </span>
                </div>
              </div>

              <!-- Direccion y Telefono -->
              <div class="grid grid-cols-2 gap-6">
                <div class="flex items-center space-x-3">
                  <!-- Icono de Dirección -->
                  <strong class="whitespace-nowrap">Dirección:</strong>
                  <span class="bg-content p-3 rounded-ms flex-1 truncate flex items-center justify-between">
                    <img src="../../assets/icons/Resaltado/Simbolo/direction-icon.svg" alt="Icono de Direccion"
                      class="w-9 h-9 mr-2" />
                    <span>{{ selectedCliente.direccion }}</span>
                    <i class="fas fa-map-signs text-neutral cursor-pointer"></i>
                  </span>
                </div>
                <div class="flex items-center space-x-3">
                  <!-- Icono de Teléfono -->
                  <strong class="whitespace-nowrap">Teléfono:</strong>
                  <span class="bg-content p-3 rounded-ms flex-1 truncate flex items-center justify-between">
                    <img src="../../assets/icons/Resaltado/Simbolo/phone-icon.svg" alt="Icono de telefono"
                      class="w-9 h-9 mr-2" />
                    <span>{{ selectedCliente.telefono }}</span>
                    <i class="fas fa-phone-square-alt text-neutral cursor-pointer"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<!-- Scripts -->
<script setup>
// Importaciones
import Navbar from '../../components/Navbar.vue';
import { ref, computed } from 'vue';

// Datos de los clientes
const clientes = ref([
  { nombre: 'Ana', apellido: 'Martínez', correo: 'ana.martinez@gmail.com', telefono: '0987654321', direccion: 'Av. Siempre Viva 123' },
  { nombre: 'Carlos', apellido: 'Gómez', correo: 'carlos.gomez@hotmail.com', telefono: '0991234567', direccion: 'Calle Los Pinos 45' },
  { nombre: 'María', apellido: 'Fernández', correo: 'maria.fernandez@gmail.com', telefono: '0981234567', direccion: 'Av. Principal 678' },
  { nombre: 'Diego', apellido: 'Pérez', correo: 'diego.perez@hotmail.com', telefono: '0998765432', direccion: 'Calle Secundaria 9' },
  { nombre: 'Lucía', apellido: 'Ramírez', correo: 'lucia.ramirez@gmail.com', telefono: '0976543210', direccion: 'Calle Central 12' },
  { nombre: 'Jorge', apellido: 'Herrera', correo: 'jorge.herrera@hotmail.com', telefono: '0965432109', direccion: 'Av. La Paz 321' },
  { nombre: 'Elena', apellido: 'Lopez', correo: 'elena.lopez@gmail.com', telefono: '0954321098', direccion: 'Calle Esperanza 56' },
  { nombre: 'Pedro', apellido: 'García', correo: 'pedro.garcia@yahoo.com', telefono: '0943210987', direccion: 'Av. Las Flores 789' },
  { nombre: 'Sara', apellido: 'Ortiz', correo: 'sara.ortiz@yahoo.com', telefono: '0932109876', direccion: 'Calle Amanecer 101' },
  { nombre: 'Daniel', apellido: 'Castro', correo: 'daniel.castro@yahoo.com', telefono: '0921098765', direccion: 'Av. Montaña 202' },
  { nombre: 'Claudia', apellido: 'Mendoza', correo: 'claudia.mendoza@yahoo.com', telefono: '0910987654', direccion: 'Calle Del Sol 303' },
  { nombre: 'Luis', apellido: 'Silva', correo: 'luis.silva@gmail.com', telefono: '0999988776', direccion: 'Av. Horizonte 404' },
  { nombre: 'Gabriela', apellido: 'Rojas', correo: 'gabriela.rojas@gmail.com', telefono: '0988877665', direccion: 'Calle Luna 505' },
  { nombre: 'Ricardo', apellido: 'Cruz', correo: 'ricardo.cruz@gmail.com', telefono: '0977766554', direccion: 'Av. Río 606' },
  { nombre: 'Paola', apellido: 'Vargas', correo: 'paola.vargas@gmail.com', telefono: '0966655443', direccion: 'Calle Cascada 707' },
  { nombre: 'Andrés', apellido: 'Morales', correo: 'andres.morales@hotmail.com', telefono: '0955544332', direccion: 'Av. Serenidad 808' },
  { nombre: 'Diana', apellido: 'Navarro', correo: 'diana.navarro@yahoo.com', telefono: '0944433221', direccion: 'Calle Bosque 909' },
  { nombre: 'Rodrigo', apellido: 'Hernández', correo: 'rodrigo.hernandez@hotmail.com', telefono: '0933322110', direccion: 'Av. Valle 1010' },
  { nombre: 'Carmen', apellido: 'Torres', correo: 'carmen.torres@hotmail.com', telefono: '0922211009', direccion: 'Calle Jardines 1111' },
  { nombre: 'Sebastián', apellido: 'Álvarez', correo: 'sebastian.alvarez@onion.com', telefono: '0911100098', direccion: 'Av. Nevado 1212' },
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

.font-heading {
  font-family: 'Poppins', sans-serif;
}

.font-sans {
  font-family: 'Josefin Sans', sans-serif;
}

/* Extras*/
main {
  background-image: url("../../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
  background-size: cover;
  background-position: center;
}

/* Espaciado de elementos */
.cliente-item {
  transition: background-color 0.2s;
}
.cliente-item:hover {
  background-color: #d3d3d3;
}
</style>