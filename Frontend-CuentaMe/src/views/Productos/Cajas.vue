<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen pt-0">
    <!-- Navbar -->
    <Navbar />

    <!-- Contenedor principal -->
    <div class="flex w-full h-full gap-6 mt-6 px-10">
      <!-- Contenedor Izquierda -->
      <section class="w-1/3 max-w-xs p-5 bg-primary rounded-card shadow-lg">
        <!-- Botón añadir Caja -->
        <button @click="toggleAddNewCaja"
          class="w-full flex items-center justify-center py-2 px-4 mb-5 bg-secondary text-text-light hover:bg-[#9397c0] focus:outline-none focus:ring-2 rounded-card focus:ring-[#946ad8] focus:border-[#946ad8] focus:ring-opacity-50 font-sans"
          aria-label="Añadir nueva caja">
          Añadir Caja
        </button>

        <!-- Cuadro de búsqueda -->
        <div class="pb-6 text-neutral">
          <input type="text" aria-label="Buscar clientes por nombre" placeholder="Buscar por nombre"
            v-model="searchQuery" @input="filterCajas"
            class="w-full bg-light p-3 rounded-md shadow-md text-center focus:outline-none" />
          <div v-if="filteredCajas.length === 0" class="text-center pt-5 text-xl text-white">
            No se encontraron resultados
          </div>
        </div>

        <!-- Lista de cajas -->
        <div class="h-[360px] overflow-y-auto space-y-4 pr-4">
          <div v-for="(caja, index) in filteredCajas" :key="index" @click="selectCaja(caja)"
            class="caja-item flex items-center bg-light p-2 rounded-md shadow-md cursor-pointer text-neutral">
            <img src="../../assets/icons/Resaltado/Simbolo/caja2-icon.svg" alt="Icono Cliente"
              class="w-10 h-10 rounded-full mr-4" />
            <span>{{ caja.nombre }}</span>
          </div>
        </div>
      </section>

      <!-- Contenedor Derecha -->
      <section class="flex-1 p-10 bg-primary rounded-card shadow-lg">
        <h2 class="text-3xl text-center mb-6 font-heading font-bold text-text-light">Datos de la caja</h2>

        <!-- Contenedor principal -->
        <div class="w-full bg-secondary p-10 rounded-card text-neutral">
          <!-- Texto antes de seleccionar la caja -->
          <div v-if="!selectedCaja && !isAddingNewCaja" class="text-[25px] text-center font-semibold font-sans text-text-light">
            Selecciona una caja para ver sus datos
          </div>

          <!-- Datos de la nueva caja -->
          <div v-if="isAddingNewCaja && !selectedCaja" class="space-y-4">
            <h3 class="text-white font-bold text-lg">Nueva Caja</h3>
            <!-- Campos del formulario -->
            <div class="space-y-3">
              <!-- Nombre -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Icono de Nombre"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newCaja.nombre" type="text" placeholder="Nombre"
                  class="block w-full pl-10 p-2 rounded-md bg-light border border-gray-300" />
              </div>

              <!-- Descripción -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/descripcion-icon.svg" alt="Icono de descripción"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newCaja.descripcion" type="text" placeholder="Descripción"
                  class="block w-full pl-10 p-2 rounded-md bg-light border border-gray-300" />
              </div>

              <!-- Precio -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Icono de Precio"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newCaja.precio" type="text" placeholder="Precio"
                  class="block w-full pl-10 p-2 rounded-md bg-light border border-gray-300" @input="validatePrice"
                  @blur="formatPrice" />
              </div>

              <!-- Stock -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Icono de Stock"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newCaja.stock" type="number" placeholder="Stock" min="0" step="1"
                  class="block w-full pl-10 p-2 rounded-md bg-light border border-gray-300" @input="validateStock" />
              </div>

              <!-- Imagen -->
              <div class="relative">
                <input type="file" @change="onImageSelected" accept="image/png, image/jpeg, image/jpg"
                  class="block w-full p-2 rounded-md bg-light border border-gray-300" />
              </div>

              <!-- Botones de formulario -->
              <div class="flex justify-around mt-4">
                <button @click="saveNewCaja" class="w-1/3 bg-success text-black py-2 px-4 rounded-card">
                  Guardar
                </button>
                <button @click="cancelAddCaja" class="w-1/3 bg-danger text-black py-2 px-4 rounded-card">
                  Cancelar
                </button>
              </div>
            </div>
          </div>

          <!-- Datos de la caja -->
          <div v-if="selectedCaja && !isAddingNewCaja" class="space-y-4">
            <!-- Imagen -->
            <div class="flex items-center">
              <strong class="text-lg mr-2">Foto:</strong>
              <!-- Edicion -->
              <div v-if="editMode" class="flex items-center">
                <input :src="imageToDisplay" type="file" id="fileInput" @change="onImageSelected" class="hidden"
                  accept="image/png, image/jpeg, image/jpg" />
                <label for="fileInput"
                  class="cursor-pointer bg-light p-3 rounded-card w-36 h-36 md:w-40 md:h-40 flex justify-center items-center">
                  <img src="../../assets/icons/Temas/placeholder.jpg" class="w-full h-full object-cover" />
                </label>
              </div>
              <!-- Normal -->
              <div v-if="!editMode" class="flex items-center">
                <span class="bg-light p-3 rounded-card w-36 h-36 md:w-40 md:h-40 flex justify-center items-center">
                  <img :src="selectedCaja.foto" alt="Foto" class="w-full h-full object-cover" />
                </span>
              </div>

              <!-- Nombre -->
              <div class="flex flex-col ml-4">
                <strong class="text-lg">Nombre:</strong>
                <!-- Normal -->
                <div v-if="!editMode" class="flex items-center bg-light p-3 rounded-md space-x-2 w-[200px] mr-5">
                  <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Nombre Icono"
                    class="w-6 h-6" />
                  <span class="truncate">{{ selectedCaja.nombre }}</span>
                </div>
                <!-- Edicion -->
                <div v-if="editMode" class="flex items-center bg-light p-3 rounded-md space-x-2 w-[200px] mr-5">
                  <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Nombre Icono"
                    class="w-6 h-6" />
                  <input v-model="selectedCaja.nombre" type="text" class="bg-light rounded-md space-x-2 w-[145px]" />
                </div>
              </div>

              <!-- Precio y Stock -->
              <div class="flex flex-col md:flex-row gap-6 w-full">
                <!-- Precio -->
                <div class="flex flex-col w-full md:w-1/2 ml-5">
                  <strong class="text-lg">Precio:</strong>
                  <!-- Normal -->
                  <div v-if="!editMode" class="flex items-center bg-light p-3 pl-0 rounded-md space-x-2 w-[100px]"
                    min="0" step="1">
                    <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Precio Icono"
                      class="w-6 h-6" />
                    <span>{{ selectedCaja.precio }}</span>
                  </div>
                  <!-- Edicion -->
                  <div v-if="editMode" class="flex items-center bg-light p-3 pl-0 rounded-md space-x-2 w-[100px]">
                    <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Precio Icono"
                      class="w-6 h-6" />
                    <input v-model="selectedCaja.precio" type="number"
                      class="flex items-center bg-light rounded-md space-x-2 w-[60px]" min="0" step="0.01"
                      oninput="this.value = parseFloat(this.value).toFixed(2)" />
                  </div>
                </div>

                <!-- Stock -->
                <div class="flex flex-col w-full md:w-1/2">
                  <strong class="text-lg">Stock:</strong>
                  <!-- Normal -->
                  <div v-if="!editMode" class="flex items-center bg-light p-3 pl-2 rounded-md space-x-2 w-[100px]">
                    <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Stock Icono" class="w-6 h-6" />
                    <span>{{ selectedCaja.stock }}</span>
                  </div>
                  <!-- Edicion -->
                  <div v-if="editMode" class="flex items-center bg-light p-3 pl-2 rounded-md space-x-2 w-[100px]">
                    <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Stock Icono" class="w-6 h-6" />
                    <input v-model="selectedCaja.stock" type="number"
                      class="flex items-center bg-light rounded-md space-x-2 w-[50px]" min="0" step="1"
                      oninput="this.value = Math.max(0, parseInt(this.value) || 0)" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Descripción -->
            <div class="flex flex-col">
              <strong class="text-lg">Descripción:</strong>
              <!-- Normal -->
              <div v-if="!editMode" class="flex bg-light p-3 rounded-md space-x-2">
                <img src="../../assets/icons/Resaltado/Simbolo/descripcion-icon.svg" alt="Precio Icono"
                  class="w-6 h-6" />
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
      <ConfirmDeleteModal :visible="showDeleteConfirm" :mensaje="'¿Estás seguro de eliminar la caja?'"
        @close="closeDeleteConfirm" @confirm="confirmDeleteCaja" />

      <!-- Mensaje de Error -->
      <ErrorMessage v-if="showError" :message_1="'Debes completar todos los campos'" message_2="Intenta de nuevo"
        class="animate-slide-in" />
    </div>
  </main>
</template>

<!-- Scripts -->
<script setup>
// Importaciones
import { ref, reactive, computed, watch } from "vue";
import Navbar from "../../components/Navbar.vue";
import ErrorMessage from "../../components/ErrorMessage.vue";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal.vue";

// Variables reactivas
const isAddingNewCaja = ref(false);
const selectedCaja = ref(null);
const editMode = ref(false);
const newCaja = reactive({
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  foto: null,
});
import Caja1 from '../../assets/icons/Cajas/Caja_1.jpg';
const cajas = reactive([
  {
    nombre: "Caja romántica",
    descripcion: "Caja en forma de corazón, ideal para San Valentín",
    precio: "8.00",
    stock: 50,
    foto: Caja1,
  },
  {
    nombre: "Caja de lujo",
    descripcion: "Caja negra con acabado mate y lazo dorado",
    precio: "15.00",
    stock: 30,
    foto: null,
  },
  {
    nombre: "Caja sorpresa",
    descripcion: "Caja con tapa que se despliega al abrirse",
    precio: "10.00",
    stock: 40,
    foto: null,
  },
  {
    nombre: "Caja transparente",
    descripcion: "Caja acrílica para mostrar el contenido",
    precio: "12.00",
    stock: 60,
  },
  {
    nombre: "Caja de fiesta",
    descripcion: "Caja con diseños coloridos para cumpleaños",
    precio: "5.00",
    stock: 100,
  },
  {
    nombre: "Caja rústica",
    descripcion: "Caja de madera con estilo vintage",
    precio: "18.00",
    stock: 20,
  },
  {
    nombre: "Caja con ventana",
    descripcion: "Caja de cartón con ventana transparente",
    precio: "7.00",
    stock: 70,
  },
  {
    nombre: "Caja metálica decorativa",
    descripcion: "Caja metálica con estampados de amor",
    precio: "9.50",
    stock: 40,
  },
  {
    nombre: "Caja temática navideña",
    descripcion: "Caja con diseños de Navidad y cinta roja",
    precio: "6.00",
    stock: 80,
  },
  {
    nombre: "Caja con luces",
    descripcion: "Caja decorada con luces LED integradas",
    precio: "14.00",
    stock: 25,
  },
]);

const searchQuery = ref("");
const filteredCajas = computed(() => {
  return cajas.filter((caja) =>
    caja.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
const showDeleteConfirm = ref(false);
const cajaToDelete = ref(null);
const showError = ref(false);
const placeholderImage = ref("../../assets/icons/Temas/placeholder.jpg");
const imageToDisplay = selectedCaja.value?.foto || newCaja.foto;

/* Funciones */
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

// Validar y formatear precio
const validatePrice = (event) => {
  const value = event.target.value.replace(/[^0-9.]/g, "");
  const [integerPart, decimalPart] = value.split(".");
  if (decimalPart && decimalPart.length > 2) {
    event.target.value = `${integerPart}.${decimalPart.substring(0, 2)}`;
  } else {
    event.target.value = value;
  }
  newCaja.precio = event.target.value;
};

const formatPrice = () => {
  if (newCaja.precio) {
    newCaja.precio = parseFloat(newCaja.precio).toFixed(2);
  }
};

// Validar stock
const validateStock = (event) => {
  const value = event.target.value.replace(/[^0-9]/g, "");
  newCaja.stock = value ? parseInt(value, 10) : 0;
};

// Guardar una nueva caja
const saveNewCaja = () => {
  if (
    !newCaja.nombre.trim() ||
    !newCaja.descripcion.trim() ||
    !newCaja.precio ||
    !newCaja.stock ||
    !newCaja.foto
  ) {
    showError.value = true;
    setTimeout(() => (showError.value = false), 3000);
    return;
  }

  // Formatear precio antes de guardar
  formatPrice();
  cajas.push({ ...newCaja });
  resetNewCajaForm();
  isAddingNewCaja.value = false;
};

// Resetea los campos del formulario
const resetNewCajaForm = () => {
  Object.assign(newCaja, {
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    foto: null,
  });
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

// Función para manejar la selección de una imagen
const onImageSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    placeholderImage.value = imageUrl;

    // Si estamos editando una caja existente
    if (selectedCaja.value) {
      selectedCaja.value.foto = imageUrl;
    } else {
      newCaja.foto = imageUrl;
    }
  }
};

// Confirmar la eliminación
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
  filteredCajas.value = cajas.filter((caja) =>
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

/* Fondo de Pantalla */
main {
  background-image: url("../../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
  background-size: cover;
  background-position: center;
}

/* Barra de scroll */
section>div {
  scrollbar-width: auto;
  scrollbar-color: #946ad8 #E0D3F5;
}

/* Estilos Responsivos */
@media (max-width: 640px) {
  .rounded-2xl {
    border-radius: 20px;
  }

  h2 {
    font-size: 1.5rem;
  }

  input,
  button {
    font-size: 0.875rem;
  }
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