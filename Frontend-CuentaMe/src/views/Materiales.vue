<!-- HTML -->
<template>
  <!-- Navbar -->
  <Navbar />

  <main id="main" class="flex w-full min-h-screen p-4">
    <!-- Contenedor principal -->
    <div class="flex w-full gap-6 mt-[26px]">

      <!-- Contenedor materiales -->
      <section class="w-1/3 max-w-xs p-5 bg-[#8568AD] rounded-[20px] shadow-[4px_5px_16px_1px_#595959] h-[630px]">
        <!-- Añadir material -->
        <button @click="toggleAddNewmaterial" class="w-full bg-[#8A8FB9] text-white font-bold py-2 px-4 mb-4 rounded-[20px]">
          Añadir material
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
            @input="filtermateriales"
            class="block w-full pl-12 pr-3 py-3 text-center text-[#8A8A8A] font-bold bg-[#E0D3F5] border border-gray-300 rounded-[20px] shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
          />
        </div>

        <!-- Lista de materiales -->
        <div class="h-[460px] overflow-y-auto space-y-4 pr-5">
          <div
            v-for="(material, index) in filteredmateriales"
            :key="index"
            @click="selectmaterial(material)"
            class="material-item p-1 pr-4 text-[#8A8A8A] font-bold bg-[#E0D3F5] flex items-center rounded-[20px] cursor-pointer"
          >
            <div class="icon w-10 h-10 flex items-center justify-center mr-4">
              <img src="../assets/icons/Resaltado/flor-icon.svg" alt="Icono Cliente" class="w-8 h-8" />
            </div>
            <span>{{ material.nombre }}</span>
          </div>
        </div>
      </section>

      <!-- Datos de las materiales -->
      <section class="w-2/3 p-5 bg-[#8568AD] rounded-[20px] shadow-[4px_5px_16px_1px_#595959] flex flex-col items-center h-[630px]">
        <div class="flex items-center justify-center mb-6">
          <h2 class="text-[36px] font-bold text-white">Datos de la material</h2>
        </div>

        <!-- Mostrar formulario de añadir -->
        <div v-if="isAddingNewmaterial && !selectedmaterial" class="w-full space-y-4">
          <h3 class="text-white font-bold mb-4">Nueva material</h3>

          <!-- Campos del formulario -->
          <div class="space-y-3">
            <input
              v-model="newmaterial.nombre"
              type="text"
              placeholder="Nombre"
              class="block w-full p-2 rounded-md bg-[#E0D3F5] border border-gray-300"
            />
            <input
              v-model="newmaterial.descripcion"
              type="text"
              placeholder="Descripción"
              class="block w-full p-2 rounded-md bg-[#E0D3F5] border border-gray-300"
            />
            <input
              v-model="newmaterial.precio"
              type="number"
              placeholder="Precio"
              class="block w-full p-2 rounded-md bg-[#E0D3F5] border border-gray-300"
            />
            <input
              v-model="newmaterial.stock"
              type="number"
              placeholder="Stock"
              class="block w-full p-2 rounded-md bg-[#E0D3F5] border border-gray-300"
            />
            <input
              type="file"
              @change="onImageSelected"
              class="block w-full p-2 rounded-md bg-[#E0D3F5] border border-gray-300"
            />
          </div>

          <!-- Botones para guardar o cancelar -->
          <div class="flex justify-around mt-4">
            <button @click="saveNewmaterial" class="w-1/2 bg-[#95CF68] text-black py-2 px-4 rounded-[20px]">
              Guardar material
            </button>
            <button @click="cancelAddmaterial" class="w-1/2 bg-[#DA6B65] text-black py-2 px-4 rounded-[20px]">
              Cancelar
            </button>
          </div>
        </div>

        <!-- Evitar sobreposiciones de formmularios-->
        <div v-if="selectedmaterial && !isAddingNewmaterial" class="w-full h-min-content bg-[#8A8FB9] text-[24px] font-josefin p-8 rounded-[20px] text-[#4B3C68] font-semibold space-y-10">
          <!-- Datos generales -->
          <div class="flex justify-between items-center space-x-4">
            <div class="flex flex-col items-center">
              <strong class="whitespace-nowrap">Foto:</strong>
              <div v-if="editMode" class="w-full">
                <input type="file" @change="onImageSelected" class="w-full p-2" />
              </div>
              <span v-else class="bg-[#E0D3F5] p-3 rounded-[20px]">
                <img :src="selectedmaterial.foto" alt="Foto de la material" class="w-32 h-32 object-cover mx-auto" />
              </span>
            </div>

            <!-- Nombre material -->
            <div class="flex flex-col w-1/2">
              <strong>Nombre:</strong>
              <span v-if="!editMode" class="bg-[#E0D3F5] p-3 rounded-[10px] truncate">{{ selectedmaterial.nombre }}</span>
              <input v-else v-model="selectedmaterial.nombre" type="text" placeholder="Nombre" class="w-full p-2 rounded-md" />
            </div>

            <!-- Precio y Stock -->
            <div class="flex justify-between space-x-4">
              <div class="flex flex-col w-1/2">
                <strong>Precio:</strong>
                <span v-if="!editMode" class="bg-[#E0D3F5] p-3 rounded-[10px] truncate">{{ selectedmaterial.precio }}</span>
                <input v-else v-model="selectedmaterial.precio" type="number" placeholder="Precio" class="w-full p-2 rounded-md" />
              </div>

              <div class="flex flex-col w-1/2">
                <strong>Stock:</strong>
                <span v-if="!editMode" class="bg-[#E0D3F5] p-3 rounded-[10px] truncate">{{ selectedmaterial.stock }}</span>
                <input v-else v-model="selectedmaterial.stock" type="number" placeholder="Stock" class="w-full p-2 rounded-md" />
              </div>
            </div>
          </div>

          <!-- Descripcion -->
          <div class="flex flex-col">
            <strong>Descripción:</strong>
            <span v-if="!editMode" class="bg-[#E0D3F5] p-3 rounded-[10px] truncate">{{ selectedmaterial.descripcion }}</span>
            <input v-else v-model="selectedmaterial.descripcion" type="text" placeholder="Descripción" class="w-full p-2 rounded-md" />
          </div>

          <!-- Botones editar y eliminar -->
          <div class="flex justify-around mt-6">
            <button v-if="!editMode" @click="editMode = true" class="bg-[#EBBA53] text-black py-4 px-10 rounded-[50px]">Editar Datos</button>
            <button v-if="editMode" @click="savematerial" class="bg-[#95CF68] text-black py-4 px-10 rounded-[50px]">Confirmar</button>
            <button v-if="!editMode" @click="openDeleteConfirm(selectedmaterial)" class="bg-[#DA6B65] text-black py-4 px-10 rounded-[50px]">Eliminar</button>
          </div>
        </div>
      </section>

      <!-- Ventana Emergente -->
      <div v-if="showDeleteConfirm" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-[20px] shadow-xl w-1/3">
          <h3 class="text-xl font-bold mb-4 text-center">¿Estás seguro de eliminar la material?</h3>
          <div class="flex justify-around">
            <button @click="confirmDeletematerial" class="bg-[#95CF68] text-black py-2 px-4 rounded-[20px]">Sí</button>
            <button @click="closeDeleteConfirm" class="bg-[#DA6B65] text-black py-2 px-4 rounded-[20px]">No</button>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>


<!-- Scripts -->
<script setup>
import { ref, reactive, computed, watch } from 'vue';
import Navbar from '../components/Navbar.vue';

/* *** Variables Reactivas *** */
// Estado principal
const isAddingNewmaterial = ref(false); 
const selectedmaterial = ref(null); 
const editMode = ref(false); 

// Datos
const newmaterial = reactive({ nombre: '', descripcion: '', precio: '', stock: '', foto: null });
const materiales = reactive([]); 
const searchQuery = ref(''); 
const filteredmateriales = computed(() => {
  return materiales.filter(material =>
    material.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Constantes de confirmacion
const showDeleteConfirm = ref(false); 
const materialToDelete = ref(null); 

/* *** Funciones *** */
// Alterna entre formulario de añadir material y datos de la material
const toggleAddNewmaterial = () => {
  isAddingNewmaterial.value = !isAddingNewmaterial.value;
  selectedmaterial.value = null;
  editMode.value = false;
};

// Selecciona una material para mostrar sus detalles
const selectmaterial = (material) => {
  selectedmaterial.value = material;
  isAddingNewmaterial.value = false;
  editMode.value = false;
};

// Guarda una nueva material en la lista
const saveNewmaterial = () => {
  materiales.push({ ...newmaterial }); 
  resetNewmaterialForm(); 
  isAddingNewmaterial.value = false;
};

// Resetea los campos del formulario
const resetNewmaterialForm = () => {
  Object.assign(newmaterial, { nombre: '', descripcion: '', precio: '', stock: '', foto: null });
};

// Cancela el formulario de añadir material
const cancelAddmaterial = () => {
  resetNewmaterialForm();
  isAddingNewmaterial.value = false;
};

// Guarda los cambios de una material seleccionada
const savematerial = () => {
  editMode.value = false;
};

/* *** Funciones de las imagenes *** */
// Escoger una imagen
const onImageSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file); 
    if (selectedmaterial.value) {
      selectedmaterial.value.foto = imageUrl;
    } else {
      newmaterial.foto = imageUrl;
    }
  }
};

/* *** Funciones de eliminar *** */
// Confirmar la eliminacion
const openDeleteConfirm = (material) => {
  materialToDelete.value = material;
  showDeleteConfirm.value = true;
};

// Cierra la ventana de confirmación
const closeDeleteConfirm = () => {
  showDeleteConfirm.value = false;
};

// Eliminar una material 
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

/* *** Observadores *** */
// Actualiza la lista en tiempo real
watch(searchQuery, () => {
  filteredmateriales.value = materiales.filter(material =>
    material.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Inicializar la lista de materiales
filteredmateriales.value = materiales;
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
