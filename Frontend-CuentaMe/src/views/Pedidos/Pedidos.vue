<!-- HTML -->
<template>
  <!-- Navbar -->
  <Navbar />

  <main id="main" class="flex flex-col w-full min-h-screen pl-10 pt-0">
    <!-- Contenedor principal -->
    <div class="flex w-full gap-6 mt-[26px]">

      <!-- Contenedor pedidos -->
      <section class="w-1/3 max-w-xs p-5 h-[560px] bg-primary rounded-box shadow-pr">

        <!-- Lista de pedidos -->
        <div class="flex items-center justify-center mb-6">
          <h2 class="text-[28px] md:text-[30px] font-bold text-white">Lista de pedidos</h2>
        </div>

        <div class="h-[450px] overflow-y-auto space-y-4 pr-5">
          <div v-for="(pedido, index) in filteredpedidos" :key="index" @click="selectpedido(pedido)"
            class="pedido-item p-1 pr-4 text-simple font-bold bg-light flex items-center rounded-box cursor-pointer h-12">
            <div class="w-5 h-5 flex items-center justify-center mr-4 rounded-full bg-[#F6C23E] ml-3"></div>
            <span>{{ pedido.nombre }}</span>
          </div>
        </div>
      </section>

      <!-- Datos de las pedido -->
      <section
        class="w-[850px] mx-auto p-6 h-auto bg-primary rounded-box shadow-pr flex flex-col items-center pb-10">
        <!-- Título de la sección -->
        <div class="flex items-center justify-center mb-6">
          <h2 class="text-[28px] md:text-[36px] font-bold text-white">Datos del pedido</h2>
        </div>

        <!-- Contenedor principal -->
        <div class="w-full bg-secondary p-10 h-[550px] rounded-box text-neutral">

          <!-- Detalles del pedido -->
          <div v-if="selectedpedido" class="grid grid-cols-2 gap-6 ">
            
            <!-- Estado del Pedido -->
            <div class="flex flex-col gap-2">
              <strong class="text-lg">Estado del pedido:</strong>
              <div class="flex items-center gap-3 bg-light p-3 rounded-md space-x-2">
                <!-- Círculo y texto del estado -->
                <div
                  :class="[
                    'w-5 h-5 rounded-full flex justify-center items-center',
                    selectedpedido.estado === 'Pendiente' ? 'bg-[#F6C23E]' : 'bg-[#28A745]'
                  ]"
                ></div>
                <span class="text-lg font-medium">
                  {{ selectedpedido.estado === 'Pendiente' ? 'Pendiente' : 'Entregado' }}
                </span>
              </div>
            </div>

            <!-- Nombre del Cliente -->
            <div class="flex flex-col">
              <strong class="text-lg mb-2">Nombre del Cliente:</strong>
              <div class="flex items-center bg-light p-3 rounded-md space-x-2">
                <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Nombre Icono" class="w-6 h-6" />
                <span class="truncate">{{ selectedpedido.cliente }}</span>
              </div>
            </div>

            <!-- Dirección -->
            <div class="flex flex-col">
              <strong class="text-lg mb-2">Dirección:</strong>
              <div class="flex items-center bg-light p-3 rounded-md space-x-2">
                <img src="../../assets/icons/Resaltado/Simbolo/address-icon.svg" alt="Dirección Icono" class="w-6 h-6" />
                <span class="truncate">{{ selectedpedido.direccion }}</span>
              </div>
            </div>

            <!-- Fecha del Pedido -->
            <div class="flex flex-col">
              <strong class="text-lg mb-2">Fecha del Pedido:</strong>
              <div class="flex items-center bg-light p-3 rounded-md space-x-2">
                <img src="../../assets/icons/Resaltado/Simbolo/calendar-icon.svg" alt="Fecha Icono" class="w-6 h-6" />
                <span>{{ selectedpedido.fecha }}</span>
              </div>
            </div>

            <!-- Precio -->
            <div class="flex flex-col">
              <strong class="text-lg mb-2">Precio:</strong>
              <div v-if="!editMode" class="flex items-center bg-light p-3 rounded-md space-x-2">
                <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Precio Icono" class="w-6 h-6" />
                <span>${{ selectedpedido.precio }}</span>
              </div>
            </div>

            <!-- Foto del Pedido -->
            <div class="flex flex-col">
              <strong class="text-lg mb-2">Foto del Pedido:</strong>
              <div class="bg-light p-3 rounded-md flex justify-center items-center">
                <img :src="selectedpedido.foto" alt="Foto" class="w-full h-full object-cover rounded-md" />
              </div>
            </div>

            <!-- Lista de Materiales -->
            <div class="flex flex-col">
              <strong class="text-lg mb-2">Materiales:</strong>
              <ul class="list-disc list-inside bg-light p-3 rounded-md">
                <li v-for="(material, index) in selectedpedido.materiales" :key="index" class="truncate">
                  {{ material }}
                </li>
              </ul>
            </div>
          </div>



          <!-- Botón de eliminar -->
          <div class="flex justify-center pt-6" v-if="selectedpedido">
            <button @click="openDeleteConfirm(selectedpedido)" class="bg-danger text-black py-3 px-12 rounded-md">
              Eliminar Pedido
            </button>
            
          </div>
        </div>
      </section>


      <!-- Ventana Emergente -->
      <transition name="slide">
        <div v-if="showDeleteConfirm"
          class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div class="relative p-8 bg-primary rounded-box text-center w-3/4 max-w-md">
            <!-- Botón para cerrar ventana -->
            <button class="absolute top-2 right-2 text-white" @click="closeDeleteConfirm" aria-label="Cerrar ventana">
              <img src="../../assets/icons/Resaltado/Accion/close-icon.svg" alt="Cerrar" class="w-8 h-8" />
            </button>

            <!-- Mensaje de confirmacion -->
            <h3 class="text-white font-bold mb-4 text-center text-[24px]">
              ¿Estás seguro de eliminar este pedido?
            </h3>
            <img src="../../assets/icons/Resaltado/Alerta/alert-icon.svg" alt="Advertencia"
              class="w-20 h-20 mx-auto mb-4" />

            <!-- Botones -->
            <div class="flex justify-around mt-4">
              <button @click="confirmDeletepedido"
                class="bg-success text-black py-2 px-16 rounded-box font-bold hover:bg-opacity-90">
                Sí
              </button>
              <button @click="closeDeleteConfirm"
                class="bg-danger text-black py-2 px-16 rounded-box font-bold hover:bg-opacity-90">
                No
              </button>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </main>
</template>

<!-- Scripts -->
<script setup>
// Importaciones
import { ref, reactive, computed, watch } from 'vue';
import Navbar from '../../components/Navbar.vue';

// Variables
const isAddingNewpedido = ref(false);
const selectedpedido = ref(null);
const editMode = ref(false);
const pedidos = reactive([
  { nombre: 'Pedido 1', descripcion: 'Rollo de papel decorativo con diseños festivos', precio: '3.50', stock: 200, foto: null, estado: 'Pendiente' },
  { nombre: 'Pedido 2', descripcion: 'Cinta de satén para envolver regalos, 10m', precio: '2.00', stock: 150, foto: null, estado: 'Entregado' },
  { nombre: 'Pedido 3', descripcion: 'Ramo de flores decorativas para adornar', precio: '5.50', stock: 100, foto: null, estado: 'Pendiente' },
  { nombre: 'Pedido 4', descripcion: 'Set de 10 tarjetas para mensajes', precio: '4.00', stock: 300, foto: null, estado: 'Pendiente' },
  { nombre: 'Pedido 5', descripcion: 'Frasco de brillantina dorada, 200g', precio: '3.00', stock: 80, foto: null, estado: 'Entregado' },
  { nombre: 'Pedido 6', descripcion: 'Pack de 50 pegatinas temáticas', precio: '1.50', stock: 400, foto: null, estado: 'Pendiente' },
  { nombre: 'Pedido 7', descripcion: 'Rollo de papel crepé de colores', precio: '1.75', stock: 200, foto: null, estado: 'Entregado' },
  { nombre: 'Pedido 8', descripcion: 'Mini luces LED para decorar regalos', precio: '6.00', stock: 50, foto: null, estado: 'Pendiente' },
  { nombre: 'Pedido 9', descripcion: 'Bolsa de perlas para adornos', precio: '3.25', stock: 120, foto: null, estado: 'Pendiente' },
  { nombre: 'Pedido 10', descripcion: 'Rosa natural tratada para durar años', precio: '10.00', stock: 30, foto: null, estado: 'Pendiente' },
]);
const searchQuery = ref('');
const filteredpedidos = computed(() => {
  return pedidos.filter(pedido =>
    pedido.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
const showDeleteConfirm = ref(false);
const pedidoToDelete = ref(null);
const showError = ref(false);

/* *** Funciones *** */

// Seleccionar un pedido
const selectpedido = (pedido) => {
  selectedpedido.value = pedido;
  isAddingNewpedido.value = false;
  editMode.value = false;
};

// Alternar estado del pedido
const cambiarEstado = () => {
  if (selectedpedido.value) {
    selectedpedido.value.estado =
      selectedpedido.value.estado === 'Pendiente' ? 'Entregado' : 'Pendiente';
  }
};

// Guarda los cambios
const savepedido = () => {
  editMode.value = false;
};

// Confirmar la eliminación
const openDeleteConfirm = (pedido) => {
  pedidoToDelete.value = pedido;
  showDeleteConfirm.value = true;
};

// Cierra la ventana
const closeDeleteConfirm = () => {
  showDeleteConfirm.value = false;
};

// Eliminar pedido 
const confirmDeletepedido = () => {
  if (pedidoToDelete.value) {
    const index = pedidos.indexOf(pedidoToDelete.value);
    if (index !== -1) {
      pedidos.splice(index, 1);
      selectedpedido.value = null;
    }
  }
  closeDeleteConfirm();
};

// Actualiza la lista de pedidos
watch(searchQuery, () => {
  filteredpedidos.value = pedidos.filter(pedido =>
    pedido.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Inicializar la lista 
filteredpedidos.value = pedidos;
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


/* Estilos extras */
main {
  background-image: url("../../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
  background-size: cover;
  background-position: center;
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
  animation: slide-in 0.3s ease-out forwards;
}
</style>