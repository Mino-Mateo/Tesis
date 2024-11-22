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
        class="w-[850px] mx-auto p-6 h-[560px] bg-primary rounded-box shadow-pr flex flex-col items-center pb-10">
        <!-- Título de la sección -->
        <div class="flex items-center justify-center mb-6">
          <h2 class="text-[28px] md:text-[36px] font-bold text-white">Datos del pedido</h2>
        </div>

        <!-- Contenedor principal -->
        <div class="w-full bg-secondary p-10 rounded-box text-neutral h-[570px]">

          <!-- Detalles de la pedido -->
          <div v-if="selectedpedido && !isAddingNewpedido" class="space-y-4 h-[360px]">

            <!-- Imagen -->
            <div class="flex items-center">
              <strong class="text-lg mr-2">Foto:</strong>
              <!-- Normal -->
              <div v-if="!editMode" class="flex items-center">
                <span class="bg-light p-3 rounded-box w-36 h-36 md:w-40 md:h-40 flex justify-center items-center mr-2">
                  <img :src="selectedpedido.foto" alt="Foto" class="w-full h-full object-cover rounded-md" />
                </span>
              </div>

              <!-- Nombre -->
              <div class="flex flex-col ml-4">
                <strong class="text-lg">Nombre:</strong>
                <!-- Normal -->
                <div v-if="!editMode" class="flex items-center bg-light p-3 rounded-md space-x-2 w-[290px] ">
                  <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Nombre Icono"
                    class="w-6 h-6" />
                  <span class="truncate">{{ selectedpedido.nombre }}</span>
                </div>
              </div>

              <!-- Precio y Stock -->
              <div class="flex md:space-y-0 w-[200px]">
                <!-- Precio -->
                <div class="flex-1 md:mr-2">
                  <strong class="text-lg">Precio:</strong>
                  <!-- Normal -->
                  <div v-if="!editMode" class="flex items-center bg-light p-3 pl-0 rounded-md space-x-2 ml-4">
                    <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Precio Icono"
                      class="w-6 h-6" />
                    <span>{{ selectedpedido.precio }}</span>
                  </div>
                </div>

                <!-- Stock -->
                <div class="flex-1 md:ml-2">
                  <strong class="text-lg">Stock:</strong>
                  <!-- Normal -->
                  <div v-if="!editMode" class="flex items-center bg-light p-3 pl-2 rounded-md space-x-2">
                    <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Stock Icono" class="w-6 h-6" />
                    <span>{{ selectedpedido.stock }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Descripción -->
            <div class="flex flex-col">
              <strong class="text-lg">Descripción:</strong>
              <!-- Normal -->
              <div v-if="!editMode" class="flex items-center bg-light p-3 rounded-md space-x-2 pb-14">
                <img src="../../assets/icons/Resaltado/Simbolo/descripcion-icon.svg" alt="Precio Icono"
                  class="w-6 h-6 " />
                <p>{{ selectedpedido.descripcion }}</p>
              </div>
            </div>

            <!-- Botones -->
            <div class="flex justify-around pt-3">
              <button v-if="!editMode" @click="editMode = true" class="bg-warning text-black py-3 px-12 rounded-md">
                Editar
              </button>
              <button v-if="editMode" @click="savepedido" class="bg-success text-black py-3 px-12 rounded-md">
                Guardar
              </button>
              <button @click="openDeleteConfirm(selectedpedido)" class="bg-danger text-black py-3 px-12 rounded-md">
                Eliminar
              </button>
            </div>
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
  { nombre: 'Pedido 1', descripcion: 'Rollo de papel decorativo con diseños festivos', precio: '3.50', stock: 200, foto: null },
  { nombre: 'Pedido 2', descripcion: 'Cinta de satén para envolver regalos, 10m', precio: '2.00', stock: 150, foto: null },
  { nombre: 'Pedido 3', descripcion: 'Ramo de flores decorativas para adornar', precio: '5.50', stock: 100, foto: null },
  { nombre: 'Pedido 4', descripcion: 'Set de 10 tarjetas para mensajes', precio: '4.00', stock: 300, foto: null },
  { nombre: 'Pedido 5', descripcion: 'Frasco de brillantina dorada, 200g', precio: '3.00', stock: 80, foto: null },
  { nombre: 'Pedido 6', descripcion: 'Pack de 50 pegatinas temáticas', precio: '1.50', stock: 400, foto: null },
  { nombre: 'Pedido 7', descripcion: 'Rollo de papel crepé de colores', precio: '1.75', stock: 200, foto: null },
  { nombre: 'Pedido 8', descripcion: 'Mini luces LED para decorar regalos', precio: '6.00', stock: 50, foto: null },
  { nombre: 'Pedido 9', descripcion: 'Bolsa de perlas para adornos', precio: '3.25', stock: 120, foto: null },
  { nombre: 'Pedido 10', descripcion: 'Rosa natural tratada para durar años', precio: '10.00', stock: 30, foto: null },
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

// Guarda los cambios
const savepedido = () => {
  editMode.value = false;
};

// Confirmar la eliminacion
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