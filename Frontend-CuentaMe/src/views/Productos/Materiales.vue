<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen pt-0">

  <!-- Navbar -->
  <Navbar />

    <!-- Contenedor principal -->
    <div class="flex w-full gap-6 mt-[26px] pl-10">
      <!-- Contenedor materiales -->
      <section class="w-1/3 max-w-xs p-5 h-[560px] bg-primary rounded-card shadow-pr">
        <!-- Añadir material -->
        <button @click="toggleAddNewmaterial"
          class="w-full bg-secondary text-white font-bold py-2 px-4 mb-4 rounded-card items-center justify-center">
          Añadir material
        </button>

        <!-- Cuadro de Busqueda -->
        <div class="relative mb-10">
          <span class="absolute inset-y-0 left-4 flex items-center">
            <img src="../../assets/icons/Resaltado/Simbolo/lupa-icon.svg" alt="Icono Buscar" class="w-7 h-6" />
          </span>
          <input type="text" placeholder="Buscar por nombre" v-model="searchQuery" @input="filtermateriales"
            class="block w-full pl-12 pr-3 py-3 text-center text-simple font-bold bg-light border border-gray-300 rounded-card shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]" />
        </div>

        <!-- Lista de materiales -->
        <div class="h-[380px] overflow-y-auto space-y-4 pr-5">
          <div v-for="(material, index) in filteredmateriales" :key="index" @click="selectmaterial(material)"
            class="material-item p-1 pr-4 text-simple font-bold bg-light flex items-center rounded-card cursor-pointer">
            <div class="icon w-10 h-10 flex items-center justify-center mr-4">
              <img src="../../assets/icons/Resaltado/Simbolo/flower-icon.svg" alt="Icono Cliente" class="w-8 h-8" />
            </div>
            <span>{{ material.nombre }}</span>
          </div>
        </div>
      </section>

      <!-- Datos de las materiales -->
      <section
        class="w-[850px] mx-auto p-6 h-[560px] bg-primary rounded-card shadow-pr flex flex-col items-center pb-10">
        <!-- Título de la sección -->
        <div class="flex items-center justify-center mb-6">
          <h2 class="text-[28px] md:text-[36px] font-bold text-white">
            Datos del Material
          </h2>
        </div>

        <!-- Contenedor principal -->
        <div class="w-full bg-secondary p-10 rounded-card text-neutral">
          <!-- Formulario de nueva material -->
          <div v-if="isAddingNewmaterial && !selectedmaterial" class="space-y-4">
            <h3 class="text-white font-bold text-lg">Nueva material</h3>
            <!-- Campos del formulario -->
            <div class="space-y-3">
              <!-- Nombre -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Icono de Nombre"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newmaterial.nombre" type="text" placeholder="Nombre"
                  class="block w-full pl-10 p-2 rounded-md bg-light border border-gray-300" />
              </div>

              <!-- Descripción -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/descripcion-icon.svg" alt="Icono de descripción"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newmaterial.descripcion" type="text" placeholder="Descripción"
                  class="block w-full pl-10 p-2 rounded-md bg-light border border-gray-300" />
              </div>

              <!-- Precio -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Icono de Precio"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newmaterial.precio" type="text" placeholder="Precio"
                  class="block w-full pl-10 p-2 rounded-md bg-light border border-gray-300" @input="validatePrice"
                  @blur="formatPrice" />
              </div>

              <!-- Stock -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Icono de Stock"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newmaterial.stock" type="number" placeholder="Stock" min="0" step="1"
                  class="block w-full pl-10 p-2 rounded-md bg-light border border-gray-300" @input="validateStock" />
              </div>

              <!-- Imagen -->
              <div class="relative">
                <input type="file" @change="onImageSelected" accept="image/png, image/jpeg, image/jpg"
                  class="block w-full p-2 rounded-md bg-light border border-gray-300" />
              </div>

              <!-- Botones de formulario -->
              <div class="flex justify-around mt-4">
                <button @click="saveNewmaterial" class="w-1/3 bg-success text-black py-2 px-4 rounded-card">
                  Guardar
                </button>
                <button @click="cancelAddmaterial" class="w-1/3 bg-danger text-black py-2 px-4 rounded-card">
                  Cancelar
                </button>
              </div>
            </div>
          </div>

          <!-- Detalles de la material -->
          <div v-if="selectedmaterial && !isAddingNewmaterial" class="space-y-4 h-[360px]">
            <!-- Imagen -->
            <div class="flex items-center">
              <strong class="text-lg mr-2">Foto:</strong>
              <!-- Edicion -->
              <div v-if="editMode" class="flex items-center">
                <input type="file" id="fileInput" @change="onImageSelected" class="hidden"
                  accept="image/png, image/jpeg, image/jpg" />
                <label for="fileInput"
                  class="cursor-pointer bg-light p-3 rounded-card w-36 h-36 md:w-40 md:h-40 flex justify-center items-center">
                  <img :src="placeholderImage" alt="Placeholder" class="w-full h-full object-cover" />
                </label>
              </div>
              <!-- Normal -->
              <div v-if="!editMode" class="flex items-center">
                <span class="bg-light p-3 rounded-card w-36 h-36 md:w-40 md:h-40 flex justify-center items-center">
                  <img :src="selectedmaterial.foto" alt="Foto" class="w-full h-full object-cover" />
                </span>
              </div>

              <!-- Nombre -->
              <div class="flex flex-col ml-4">
                <strong class="text-lg">Nombre:</strong>
                <!-- Normal -->
                <div v-if="!editMode" class="flex items-center bg-light p-3 rounded-md space-x-2 w-[200px] mr-5">
                  <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Nombre Icono"
                    class="w-6 h-6" />
                  <span class="truncate">{{ selectedmaterial.nombre }}</span>
                </div>
                <!-- Edicion -->
                <div v-if="editMode" class="flex items-center bg-light p-3 rounded-md space-x-2 w-[200px] mr-5">
                  <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Nombre Icono"
                    class="w-6 h-6" />
                  <input v-model="selectedmaterial.nombre" type="text" class="bg-light rounded-md space-x-2 w-[145px]" />
                </div>
              </div>

              <!-- Precio y Stock -->
              <div class="flex flex-col md:flex-row gap-6 w-full">
                <!-- Precio -->
                <div class="flex flex-col w-full md:w-1/2 ml-5">
                  <strong class="text-lg">Precio:</strong>
                  <!-- Normal -->
                  <div v-if="!editMode" class="flex items-center bg-light p-3 pl-0 rounded-md space-x-2 w-[100px]" min="0"
                    step="1">
                    <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Precio Icono"
                      class="w-6 h-6" />
                    <span>{{ selectedmaterial.precio }}</span>
                  </div>
                  <!-- Edicion -->
                  <div v-if="editMode" class="flex items-center bg-light p-3 pl-0 rounded-md space-x-2 w-[100px]">
                    <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Precio Icono"
                      class="w-6 h-6" />
                    <input v-model="selectedmaterial.precio" type="number"
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
                    <span>{{ selectedmaterial.stock }}</span>
                  </div>
                  <!-- Edicion -->
                  <div v-if="editMode" class="flex items-center bg-light p-3 pl-2 rounded-md space-x-2 w-[100px]">
                    <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Stock Icono" class="w-6 h-6" />
                    <input v-model="selectedmaterial.stock" type="number"
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
                <p>{{ selectedmaterial.descripcion }}</p>
              </div>
              <!-- Edicion -->
              <div v-if="editMode" class="flex bg-light p-3 rounded-md space-x-2">
                <img src="../../assets/icons/Resaltado/Simbolo/descripcion-icon.svg" alt="Precio Icono"
                  class="w-6 h-6" />
                <textarea v-model="selectedmaterial.descripcion" rows="3"
                  class="flex items-center bg-light rounded-md space-x-2 w-full">
                </textarea>
              </div>
            </div>

            <!-- Botones -->
            <div class="flex justify-around pt-3">
              <button v-if="!editMode" @click="editMode = true" class="bg-warning text-black py-3 px-12 rounded-md">
                Editar
              </button>
              <button v-if="editMode" @click="savematerial" class="bg-success text-black py-3 px-12 rounded-md">
                Guardar
              </button>
              <button @click="openDeleteConfirm(selectedmaterial)" class="bg-danger text-black py-3 px-12 rounded-md">
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
          <div class="relative p-8 bg-primary rounded-card text-center w-3/4 max-w-md">
            <!-- Botón para cerrar ventana -->
            <button class="absolute top-2 right-2 text-white" @click="closeDeleteConfirm" aria-label="Cerrar ventana">
              <img src="../../assets/icons/Resaltado/Accion/close-icon.svg" alt="Cerrar" class="w-8 h-8" />
            </button>

            <!-- Mensaje de confirmacion -->
            <h3 class="text-white font-bold mb-4 text-center text-[24px]">
              ¿Estás seguro de eliminar la material?
            </h3>
            <img src="../../assets/icons/Resaltado/Alerta/alert-icon.svg" alt="Advertencia"
              class="w-20 h-20 mx-auto mb-4" />

            <!-- Botones -->
            <div class="flex justify-around mt-4">
              <button @click="confirmDeletematerial"
                class="bg-success text-black py-2 px-16 rounded-card font-bold hover:bg-opacity-90">
                Sí
              </button>
              <button @click="closeDeleteConfirm"
                class="bg-danger text-black py-2 px-16 rounded-card font-bold hover:bg-opacity-90">
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
import { ref, reactive, computed, watch } from "vue";
import Navbar from "../../components/Navbar.vue";

// Variables
const isAddingNewmaterial = ref(false);
const selectedmaterial = ref(null);
const editMode = ref(false);
const newmaterial = reactive({
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  foto: null,
});

const materiales = reactive([
  {
    nombre: "material romántica",
    descripcion: "material en forma de corazón, ideal para San Valentín",
    precio: "8.00",
    stock: 50,
    foto: '../../assets/icons/materiales/material_1.png',
  },
  {
    nombre: "material de lujo",
    descripcion: "material negra con acabado mate y lazo dorado",
    precio: "15.00",
    stock: 30,
    foto: null,
  },
  {
    nombre: "material sorpresa",
    descripcion: "material con tapa que se despliega al abrirse",
    precio: "10.00",
    stock: 40,
    foto: null,
  },
  {
    nombre: "material transparente",
    descripcion: "material acrílica para mostrar el contenido",
    precio: "12.00",
    stock: 60,
  },
  {
    nombre: "material de fiesta",
    descripcion: "material con diseños coloridos para cumpleaños",
    precio: "5.00",
    stock: 100,
  },
  {
    nombre: "material rústica",
    descripcion: "material de madera con estilo vintage",
    precio: "18.00",
    stock: 20,
  },
  {
    nombre: "material con ventana",
    descripcion: "material de cartón con ventana transparente",
    precio: "7.00",
    stock: 70,
  },
  {
    nombre: "material metálica decorativa",
    descripcion: "material metálica con estampados de amor",
    precio: "9.50",
    stock: 40,
  },
  {
    nombre: "material temática navideña",
    descripcion: "material con diseños de Navidad y cinta roja",
    precio: "6.00",
    stock: 80,
  },
  {
    nombre: "material con luces",
    descripcion: "material decorada con luces LED integradas",
    precio: "14.00",
    stock: 25,
  },
]);

const searchQuery = ref("");
const filteredmateriales = computed(() => {
  return materiales.filter((material) =>
    material.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
const showDeleteConfirm = ref(false);
const materialToDelete = ref(null);
const showError = ref(false);
const placeholderImage = ref("@/assets/icons/Temas/placeholder.jpg");

/* Funciones */
// Alterna entre crear y ver material
const toggleAddNewmaterial = () => {
  isAddingNewmaterial.value = !isAddingNewmaterial.value;
  selectedmaterial.value = null;
  editMode.value = false;
};

// Seleccionar una material
const selectmaterial = (material) => {
  selectedmaterial.value = material;
  isAddingNewmaterial.value = false;
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
  newmaterial.precio = event.target.value;
};

const formatPrice = () => {
  if (newmaterial.precio) {
    newmaterial.precio = parseFloat(newmaterial.precio).toFixed(2);
  }
};

// Validar stock
const validateStock = (event) => {
  const value = event.target.value.replace(/[^0-9]/g, "");
  newmaterial.stock = value ? parseInt(value, 10) : 0;
};

// Guardar una nueva material
const saveNewmaterial = () => {
  if (
    !newmaterial.nombre.trim() ||
    !newmaterial.descripcion.trim() ||
    !newmaterial.precio ||
    !newmaterial.stock ||
    !newmaterial.foto
  ) {
    showError.value = true;
    setTimeout(() => (showError.value = false), 3000);
    return;
  }

  // Formatear precio antes de guardar
  formatPrice();
  materiales.push({ ...newmaterial });
  resetNewmaterialForm();
  isAddingNewmaterial.value = false;
};

// Resetea los campos del formulario
const resetNewmaterialForm = () => {
  Object.assign(newmaterial, {
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    foto: null,
  });
};

// Cancela el formulario
const cancelAddmaterial = () => {
  resetNewmaterialForm();
  isAddingNewmaterial.value = false;
};

// Guarda los cambios
const savematerial = () => {
  editMode.value = false;
};


// Escoger una imagen
const onImageSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    placeholderImage.value = imageUrl;

    if (selectedmaterial.value) {
      selectedmaterial.value.foto = imageUrl;
    } else {
      newmaterial.foto = imageUrl;
    }
  }
};

// Confirmar la eliminación
const openDeleteConfirm = (material) => {
  materialToDelete.value = material;
  showDeleteConfirm.value = true;
};

// Cierra la ventana
const closeDeleteConfirm = () => {
  showDeleteConfirm.value = false;
};

// Eliminar material
const confirmDeletematerial = () => {
  if (materialToDelete.value) {
    const index = materiales.indexOf(materialToDelete.value);
    if (index !== -1) {
      materiales.splice(index, 1);
      selectedmaterial.value = null;
    }
  }
  closeDeleteConfirm();
};

// Actualiza la lista de materiales
watch(searchQuery, () => {
  filteredmateriales.value = materiales.filter((material) =>
    material.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Inicializar la lista
filteredmateriales.value = materiales;
</script>

<!-- Estilos -->
<style scoped>
/* Fuentes */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Josefin+Sans:wght@400;600&display=swap");

.font-heading {
  font-family: "Poppins", sans-serif;
}

.font-sans {
  font-family: "Josefin Sans", sans-serif;
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

/* Estilos para la imagen de la material */
label[for="image-upload"] {
  display: inline-block;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

label[for="image-upload"]:hover {
  transform: scale(1.05);
}
</style>