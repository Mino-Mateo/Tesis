<!-- HTML -->
<template>
  <!-- Navbar -->
  <Navbar />

  <main id="main" class="flex flex-col w-full min-h-screen pl-10 pt-0">
    <!-- Contenedor principal -->
    <div class="flex w-full gap-6 mt-[26px]">

      <!-- Contenedor cajas -->
      <section class="w-1/3 max-w-xs p-5 h-[560px] bg-primary rounded-box shadow-pr">
        <!-- Añadir Caja -->
        <button @click="toggleAddNewCaja"
          class="w-full bg-secondary text-white font-bold py-2 px-4 mb-4 rounded-box items-center justify-center">
          Añadir Caja
        </button>

        <!-- Cuadro de Busqueda -->
        <div class="relative mb-10">
          <span class="absolute inset-y-0 left-4 flex items-center">
            <img src="../../assets/icons/Resaltado/Simbolo/lupa-icon.svg" alt="Icono Buscar" class="w-7 h-6" />
          </span>
          <input type="text" placeholder="Buscar por nombre" v-model="searchQuery" @input="filterCajas"
            class="block w-full pl-12 pr-3 py-3 text-center text-simple font-bold bg-light border border-gray-300 rounded-box shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]" />
        </div>

        <!-- Lista de cajas -->
        <div class="h-[380px] overflow-y-auto space-y-4 pr-5">
          <div v-for="(caja, index) in filteredCajas" :key="index" @click="selectCaja(caja)"
            class="caja-item p-1 pr-4 text-simple font-bold bg-light flex items-center rounded-box cursor-pointer">
            <div class="icon w-10 h-10 flex items-center justify-center mr-4">
              <img src="../../assets/icons/Resaltado/Simbolo/caja2-icon.svg" alt="Icono Cliente" class="w-8 h-8" />
            </div>
            <span>{{ caja.nombre }}</span>
          </div>
        </div>
      </section>

      <!-- Datos de las cajas -->
      <section
        class="w-[850px] mx-auto p-6 h-[560px] bg-primary rounded-box shadow-pr flex flex-col items-center pb-10">
        <!-- Título de la sección -->
        <div class="flex items-center justify-center mb-6">
          <h2 class="text-[28px] md:text-[36px] font-bold text-white">Datos de la Caja</h2>
        </div>

        <!-- Contenedor principal -->
        <div class="w-full bg-secondary p-10 rounded-box text-neutral h-[570px]">
          <!-- Formulario de nueva caja -->
          <div v-if="isAddingNewCaja && !selectedCaja" class="space-y-4">
            <h3 class="text-white font-bold text-lg">Nueva Caja</h3>
            <!-- Campos del formulario -->
            <div class="space-y-3">
              <!-- Nombre -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Icono de Nombre"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5">
                <input v-model="newCaja.nombre" type="text" placeholder="Nombre"
                  class="block w-full pl-10 p-2 rounded-md bg-light border border-gray-300" />
              </div>

              <!-- Descripción -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/descripcion-icon.svg" alt="Icono de descripción"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5">
                <input v-model="newCaja.descripcion" type="text" placeholder="Descripción"
                  class="block w-full pl-10 p-2 rounded-md bg-light border border-gray-300" />
              </div>

              <!-- Precio -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Icono de Precio"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5">
                <input v-model="newCaja.precio" type="text" placeholder="Precio"
                  class="block w-full pl-10 p-2 rounded-md bg-light border border-gray-300" />
              </div>

              <!-- Stock -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Icono de Stock"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5">
                <input v-model="newCaja.stock" type="text" placeholder="Stock"
                  class="block w-full pl-10 p-2 rounded-md bg-light border border-gray-300" />
              </div>

              <!-- Imagen -->
              <div class="relative">
                <input type="file" @change="onImageSelected"
                  class="block w-full p-2 rounded-md bg-light border border-gray-300" />
              </div>
            </div>

            <!-- Botones de formulario -->
            <div class="flex justify-around mt-4">
              <button @click="saveNewCaja" class="w-1/3 bg-success text-black py-2 px-4 rounded-box">
                Guardar
              </button>
              <button @click="cancelAddCaja" class="w-1/3 bg-danger text-black py-2 px-4 rounded-box">
                Cancelar
              </button>
            </div>
          </div>

          <!-- Detalles de la caja -->
          <div v-if="selectedCaja && !isAddingNewCaja" class="space-y-4 h-[360px]">

            <!-- Imagen -->
            <div class="flex items-center">
              <strong class="text-lg mr-2">Foto:</strong>
              <!-- Edicion -->
              <div v-if="editMode" class="flex items-center">
                <input type="file" id="fileInput" @change="onImageSelected" class="hidden" />
                <label for="fileInput"
                  class="cursor-pointer bg-light p-3 rounded-box w-36 h-36 md:w-40 md:h-40 flex justify-center items-center">
                  <img :src="placeholderImage" alt="Placeholder" class="w-full h-full object-cover rounded-box" />
                </label>
              </div>
              <!-- Normal -->
              <div v-if="!editMode" class="flex items-center">
                <span class="bg-light p-3 rounded-box w-36 h-36 md:w-40 md:h-40 flex justify-center items-center mr-2">
                  <img :src="selectedCaja.foto" alt="Foto" class="w-full h-full object-cover rounded-md" />
                </span>
              </div>

              <!-- Nombre -->
              <div class="flex flex-col ml-4">
                <strong class="text-lg">Nombre:</strong>
                <!-- Normal -->
                <div v-if="!editMode" class="flex items-center bg-light p-3 rounded-md space-x-2 w-[290px] ">
                  <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Nombre Icono"
                    class="w-6 h-6" />
                  <span class="truncate">{{ selectedCaja.nombre }}</span>
                </div>
                <!-- Edicion -->
                <div v-if="editMode" class="flex items-center bg-light p-3 rounded-md space-x-2 w-[200px] mr-5">
                  <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Nombre Icono"
                    class="w-6 h-6" />
                  <input v-model="selectedCaja.nombre" type="text" class=" bg-light rounded-md space-x-2" />
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
                    <span>{{ selectedCaja.precio }}</span>
                  </div>
                  <!-- Edicion -->
                  <div v-if="editMode" class="flex items-center bg-light p-3 pl-0 rounded-md space-x-2 w-[100px]">
                    <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Precio Icono"
                      class="w-6 h-6" />
                    <input v-model="selectedCaja.precio" type="number"
                      class="flex items-center bg-light rounded-md space-x-2 w-[50px]" />
                  </div>
                </div>

                <!-- Stock -->
                <div class="flex-1 md:ml-2">
                  <strong class="text-lg">Stock:</strong>
                  <!-- Normal -->
                  <div v-if="!editMode" class="flex items-center bg-light p-3 pl-2 rounded-md space-x-2">
                    <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Stock Icono" class="w-6 h-6" />
                    <span>{{ selectedCaja.stock }}</span>
                  </div>
                  <!-- Edicion -->
                  <div v-if="editMode" class="flex items-center bg-light p-3 pl-2 rounded-md space-x-2 w-[100px]">
                    <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Stock Icono" class="w-6 h-6" />
                    <input v-model="selectedCaja.stock" type="number"
                      class="flex items-center bg-light rounded-md space-x-2 w-[50px]" />
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
                <p>{{ selectedCaja.descripcion }}</p>
              </div>
              <!-- Edicion -->
              <div v-if="editMode" class="flex bg-light p-3 rounded-md space-x-2">
                <img src="../../assets/icons/Resaltado/Simbolo/descripcion-icon.svg" alt="Precio Icono"
                  class="w-6 h-6" />
                <textarea v-model="selectedCaja.descripcion" rows="3"
                  class="flex items-center bg-light rounded-md space-x-2 w-full">
                </textarea>
              </div>
            </div>

            <!-- Botones -->
            <div class="flex justify-around pt-3">
              <button v-if="!editMode" @click="editMode = true" class="bg-warning text-black py-3 px-12 rounded-md">
                Editar
              </button>
              <button v-if="editMode" @click="saveCaja" class="bg-success text-black py-3 px-12 rounded-md">
                Guardar
              </button>
              <button @click="openDeleteConfirm(selectedCaja)" class="bg-danger text-black py-3 px-12 rounded-md">
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
              ¿Estás seguro de eliminar la caja?
            </h3>
            <img src="../../assets/icons/Resaltado/Alerta/alert-icon.svg" alt="Advertencia"
              class="w-20 h-20 mx-auto mb-4" />

            <!-- Botones -->
            <div class="flex justify-around mt-4">
              <button @click="confirmDeleteCaja"
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

      <!-- Mensaje de Error -->
      <transition name="slide">
        <div v-if="showError"
          class="fixed top-4 right-0 bg-danger text-text-light px-4 py-2 rounded-l-md shadow-lg flex items-start space-x-3 animate-slide-in">
          <img src="../../assets/icons/Resaltado/Alerta/alert-icon.svg" alt="Icono de error" class="w-6 h-6 mt-3" />
          <div>
            <p class="font-semibold">Debes completar todos los campos</p>
            <p class="font-semibold items-center">Intenta de nuevo</p>
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
const isAddingNewCaja = ref(false);
const selectedCaja = ref(null);
const editMode = ref(false);
const newCaja = reactive({ nombre: '', descripcion: '', precio: '', stock: '', foto: null });
const cajas = reactive([
  { nombre: 'Caja romántica', descripcion: 'Caja en forma de corazón, ideal para San Valentín', capacidad: '2kg', materiales: ['Cartón', 'Tela'], precio: '8.00', stock: 50 },
  { nombre: 'Caja de lujo', descripcion: 'Caja negra con acabado mate y lazo dorado', capacidad: '5kg', materiales: ['Cartón rígido'], precio: '15.00', stock: 30 },
  { nombre: 'Caja sorpresa', descripcion: 'Caja con tapa que se despliega al abrirse', capacidad: '3kg', materiales: ['Cartón'], precio: '10.00', stock: 40 },
  { nombre: 'Caja transparente', descripcion: 'Caja acrílica para mostrar el contenido', capacidad: '2kg', materiales: ['Plástico transparente'], precio: '12.00', stock: 60 },
  { nombre: 'Caja de fiesta', descripcion: 'Caja con diseños coloridos para cumpleaños', capacidad: '1.5kg', materiales: ['Cartón'], precio: '5.00', stock: 100 },
  { nombre: 'Caja rústica', descripcion: 'Caja de madera con estilo vintage', capacidad: '4kg', materiales: ['Madera'], precio: '18.00', stock: 20 },
  { nombre: 'Caja con ventana', descripcion: 'Caja de cartón con ventana transparente', capacidad: '3kg', materiales: ['Cartón', 'Plástico'], precio: '7.00', stock: 70 },
  { nombre: 'Caja metálica decorativa', descripcion: 'Caja metálica con estampados de amor', capacidad: '1kg', materiales: ['Metal'], precio: '9.50', stock: 40 },
  { nombre: 'Caja temática navideña', descripcion: 'Caja con diseños de Navidad y cinta roja', capacidad: '3kg', materiales: ['Cartón'], precio: '6.00', stock: 80 },
  { nombre: 'Caja con luces', descripcion: 'Caja decorada con luces LED integradas', capacidad: '2.5kg', materiales: ['Cartón', 'Luces'], precio: '14.00', stock: 25 },
]);
const searchQuery = ref('');
const filteredCajas = computed(() => {
  return cajas.filter(caja =>
    caja.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
const showDeleteConfirm = ref(false);
const cajaToDelete = ref(null);
const showError = ref(false);
const placeholderImage = ref('@/assets/icons/Temas/placeholder.jpg');
const showConfirmation = ref(false);

/* *** Funciones *** */
// Alterna entre crear y ver caja
const toggleAddNewCaja = () => {
  isAddingNewCaja.value = !isAddingNewCaja.value;
  selectedCaja.value = null;
  editMode.value = false;
};

// Seleccionar una caja
const selectCaja = (caja) => {
  selectedCaja.value = caja;
  isAddingNewCaja.value = false;
  editMode.value = false;
};

// Guardar una nueva caja 
const saveNewCaja = () => {
  if (!newCaja.nombre.trim() || !newCaja.descripcion.trim() || !newCaja.precio || !newCaja.stock || !newCaja.foto) {
    showError.value = true;
    setTimeout(() => (showError.value = false), 3000);
    return;
  }

  cajas.push({ ...newCaja });
  resetNewCajaForm();
  isAddingNewCaja.value = false;
};


// Resetea los campos del formulario
const resetNewCajaForm = () => {
  Object.assign(newCaja, { nombre: '', descripcion: '', precio: '', stock: '', foto: null });
};

// Cancela el formulario
const cancelAddCaja = () => {
  resetNewCajaForm();
  isAddingNewCaja.value = false;
};

// Guarda los cambios
const saveCaja = () => {
  editMode.value = false;
};

// Función para cerrar la ventana emergente
function closeConfirmation() {
  showConfirmation.value = false;
}

// Escoger una imagen
const onImageSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    placeholderImage.value = URL.createObjectURL(file);

    if (selectedCaja.value) {
      selectedCaja.value.foto = imageUrl;
    } else {
      newCaja.foto = imageUrl;
    }
  }
};

// Confirmar la eliminacion
const openDeleteConfirm = (caja) => {
  cajaToDelete.value = caja;
  showDeleteConfirm.value = true;
};

// Cierra la ventana
const closeDeleteConfirm = () => {
  showDeleteConfirm.value = false;
};

// Eliminar caja 
const confirmDeleteCaja = () => {
  if (cajaToDelete.value) {
    const index = cajas.indexOf(cajaToDelete.value);
    if (index !== -1) {
      cajas.splice(index, 1);
      selectedCaja.value = null;
    }
  }
  closeDeleteConfirm();
};

// Actualiza la lista de cajas
watch(searchQuery, () => {
  filteredCajas.value = cajas.filter(caja =>
    caja.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Inicializar la lista 
filteredCajas.value = cajas;
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

/* Estilos para la imagen de la caja */
label[for="image-upload"] {
  display: inline-block;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

label[for="image-upload"]:hover {
  transform: scale(1.05);
}
</style>