<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen pt-0">
    <!-- Navbar -->
    <Navbar />

    <!-- Contenedor principal -->
    <div class="flex w-full h-full gap-6 mt-6 px-10">
      <!-- Contenedor Izquierda -->
      <section class="w-1/3 max-w-xs p-5 bg-primary rounded-card shadow-lg h-min mb-5">
        <!-- Botón añadir Material -->
        <button @click="toggleAddNewMaterial"
          class="w-full flex items-center justify-center py-2 px-4 mb-5 bg-secondary text-text-light hover:bg-[#9397c0] focus:outline-none focus:ring-2 rounded-card focus:ring-[#946ad8] focus:border-[#946ad8] focus:ring-opacity-50 font-sans"
          aria-label="Añadir nueva material">
          Añadir Material
        </button>

        <!-- Cuadro de búsqueda -->
        <div class="pb-6 text-texto">
          <input type="text" aria-label="Buscar materiales por nombre" placeholder="Buscar por nombre" v-model="searchQuery"
            @input="filterMateriales" class="w-full bg-light p-3 rounded-md shadow-md text-center focus:outline-none" />
          <div v-if="filteredMateriales.length === 0" class="text-center pt-5 text-xl text-white">
            No se encontraron resultados
          </div>
        </div>

        <!-- Lista de materiales -->
        <div class="overflow-y-auto space-y-4 pr-4">
          <div v-for="(material, index) in filteredMateriales" :key="index" @click="selectMaterial(material)"
            class="material-item flex items-center w-dvh bg-light p-2 rounded-md shadow-md cursor-pointer text-texto">
            <img src="../../assets/icons/Resaltado/Simbolo/flor2-icon.svg" alt="Icono Materiales"
              class="w-10 h-10 rounded-full mr-4" />
            <span class="truncate w-full block">{{ material.nombre }}</span>
          </div>
        </div>
      </section>

      <!-- Contenedor Derecha -->
      <section class="flex-1 p-10 bg-primary rounded-card shadow-lg mb-5">
        <h2 class="text-3xl text-center mb-6 font-heading font-bold text-text-light">
          Datos del material
        </h2>

        <!-- Contenedor principal -->
        <div class="w-full bg-secondary pl-10 pr-10 pt-6 pb-6 rounded-card text-texto">
          <!-- Texto antes de seleccionar el material -->
          <div v-if="!selectedMaterial && !isAddingNewMaterial"
            class="text-[25px] text-center font-semibold font-sans text-text-light">
            Selecciona un material para ver sus datos
          </div>

          <!-- Datos de la nueva material -->
          <div v-if="isAddingNewMaterial && !selectedMaterial" class="rounded-card space-y-5">
            <!-- Título -->
            <h3 class="text-2xl font-bold text-center text-white">
              Nueva Material
            </h3>

            <!-- Campos del formulario -->
            <div class="space-y-4">
              <!-- Nombre -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Icono de Nombre"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newMaterial.nombre" type="text" placeholder="Nombre"
                  class="block w-full pl-12 py-3 rounded-md text-texto focus:outline-none bg-light" />
              </div>

              <!-- Descripción -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/descripcion-icon.svg" alt="Icono de descripción"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <textarea v-model="newMaterial.descripcion" placeholder="Descripción" rows="3"
                  class="block w-full pl-12 py-3 rounded-md text-texto focus:outline-none bg-light"></textarea>
              </div>

              <!-- Precio -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Icono de Precio"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newMaterial.precio" type="text" placeholder="Precio"
                  class="block w-full pl-12 py-3 rounded-md text-texto focus:outline-none bg-light"
                  @input="validatePrice" @blur="formatPrice" />
              </div>

              <!-- Stock -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Icono de Stock"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newMaterial.stock" type="number" placeholder="Stock" min="0" step="1"
                  class="block w-full pl-12 py-3 rounded-md text-texto focus:outline-none bg-light"
                  @input="validateStock" />
              </div>

              <!-- Imagen -->
              <div class="relative">
                <label for="file-upload" :class="[
                  'block w-full text-center py-3 rounded-md cursor-pointer transition duration-200',
                  selectedImage
                    ? 'bg-success text-white'
                    : 'bg-warning text-black hover:bg-[#e9df55]',
                ]">
                  {{ selectedImage ? "Imagen Seleccionada" : "Subir Imagen" }}
                </label>
                <input id="file-upload" type="file" @change="onImageSelected" accept="image/png, image/jpeg, image/jpg"
                  class="hidden" />
              </div>
            </div>

            <!-- Botones -->
            <div class="flex justify-center space-x-20 pt-4">
              <button @click="saveNewMaterial" class="w-1/3 bg-success hover:bg-[#63e951] text-black py-3 px-16 rounded-md">
                Guardar
              </button>
              <button @click="cancelAddMaterial"
                class="w-1/3 bg-danger hover:bg-[#e95151] text-black py-3 px-16 rounded-md">
                Cancelar
              </button>
            </div>
          </div>

          <!-- Datos del material -->
          <div v-if="selectedMaterial && !isAddingNewMaterial" class="space-y-3">
            <!-- Imagen -->
            <div class="flex justify-center">
              <div class="w-48 h-48 flex items-center shadow-md">
                <label v-if="editMode" for="fileInput"
                  class="cursor-pointer bg-light p-3 rounded-card w-full h-full flex justify-center items-center">
                  <input type="file" id="fileInput" @change="onImageSelected" class="hidden"
                    accept="image/png, image/jpeg" />
                  <img v-if="selectedImage" :src="selectedImage"
                    class="image-preview rounded-card w-full h-full bg-light" />
                </label>
                <div v-else class="bg-light p-3 rounded-card w-full h-full flex justify-center items-center">
                  <img :src="selectedMaterial.imagen" alt="imagen" class="w-full h-full rounded-card object-cover" />
                </div>
              </div>
            </div>

            <!-- Campos de texto -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Campo Nombre -->
              <div>
                <label for="nombre" class="text-lg block pl-3">Nombre</label>
                <InfoRow label=" " v-if="!editMode" :value="selectedMaterial.nombre" icon="namelast-icon.svg" />
                <div v-if="editMode" class="flex bg-white p-3 rounded-md space-x-3 ml-3">
                  <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Nombre Icono"
                    class="w-6 h-6" />
                  <input v-model="selectedMaterial.nombre" id="nombre" type="text"
                    class="bg-white rounded-md w-full font-sans text-[18px] focus:outline-none" />
                </div>
              </div>

              <!-- Campo Precio -->
              <div>
                <label for="precio" class="text-lg block pl-3">Precio</label>
                <InfoRow label=" " v-if="!editMode" :value="`${selectedMaterial.precio}`" icon="dinero-icon.svg" />
                <div v-if="editMode" class="flex bg-white p-3 rounded-md space-x-3 ml-3">
                  <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Precio Icono" class="w-6 h-6" />
                  <input v-model="selectedMaterial.precio" id="precio" type="number" min="0" step="0.01"
                    @input="validatePrice"
                    class="bg-white rounded-md w-full font-sans text-[18px] focus:outline-none" />
                </div>
              </div>

              <!-- Campo Stock -->
              <div>
                <label for="stock" class="text-lg block pl-3">Stock</label>
                <InfoRow label=" " v-if="!editMode" :value="selectedMaterial.stock" icon="stock-icon.svg" />
                <div v-if="editMode" class="flex bg-white p-3 rounded-md space-x-3 ml-3">
                  <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Stock Icono" class="w-6 h-6" />
                  <input v-model="selectedMaterial.stock" id="stock" type="number" min="0" step="1"
                    class="bg-white rounded-md w-full font-sans text-[18px] focus:outline-none" />
                </div>
              </div>

              <!-- Campo Descripción -->
              <div class="col-span-1 md:col-span-2">
                <label for="descripcion" class="text-lg block pl-2">Descripción</label>
                <InfoRow label=" " v-if="!editMode" :value="selectedMaterial.descripcion" icon="descripcion-icon.svg" />
                <div v-if="editMode" class="flex bg-white p-3 rounded-md space-x-3 ml-3">
                  <img src="../../assets/icons/Resaltado/Simbolo/descripcion-icon.svg" alt="Descripción Icono"
                    class="w-6 h-6" />
                  <textarea v-model="selectedMaterial.descripcion" id="descripcion" rows="3"
                    class="bg-white rounded-md w-full font-sans text-[18px] focus:outline-none"></textarea>
                </div>
              </div>
            </div>

            <!-- Botones -->
            <div class="flex justify-center space-x-20 pt-4">
              <button v-if="!editMode" @click="editMode = true"
                class="w-1/3 bg-warning hover:bg-[#e9df55] text-black py-3 px-16 rounded-md">
                Editar
              </button>
              <button v-if="editMode" @click="saveMaterial"
                class="w-1/3 bg-success hover:bg-[#63e951] text-black py-3 px-16 rounded-md">
                Guardar
              </button>
              <button @click="openDeleteConfirm(selectedMaterial)"
                class="w-1/3 bg-danger hover:bg-[#e95151] text-black py-3 px-16 rounded-md">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Ventana Emergente -->
      <ConfirmDeleteModal :visible="showDeleteConfirm" :mensaje="'¿Estás seguro de eliminar el material?'"
        @close="closeDeleteConfirm" @confirm="confirmDeleteMaterial(selectedMaterial?.id)" />

      <!-- Mensaje de Error -->
      <ErrorMessage v-if="showError" :message_1="'Verifica todos los datos antes de enviar'"
        message_2="Intenta de nuevo" class="animate-slide-in" />
    </div>
  </main>
</template>

<!-- Scripts -->
<script setup>
/* Importaciones */
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import Navbar from "../../components/Navbar.vue";
import ErrorMessage from "../../components/ErrorMessage.vue";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal.vue";
import InfoRow from "../../components/InfoRow.vue";

// Configuración de Axios
const materialesAxios = axios.create({
  baseURL: "https://cuenta-me.up.railway.app/api/productos",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Variables reactivas
const isAddingNewMaterial = ref(false);
const isSaving = ref(false);
const selectedMaterial = ref(null);
const selectedImage = ref("");
const loading = ref(true);
const editMode = ref(false);
const showDeleteConfirm = ref(false);
const materialToDelete = ref(null);
const showError = ref(false);
const errorMessage = ref("");
const searchQuery = ref("");
const filteredMateriales = ref([]);
const newMaterial = reactive({
  nombre: "",
  descripcion: "",
  precio: 0,
  stock: 0,
  imagen: null,
});
const materiales = ref([]);

/* Computadas */
const filterMateriales = () => {
  filteredMateriales.value = (materiales.value || []).filter((material) => {
    const nombre = material?.nombre || "";
    return nombre
      .toLowerCase()
      .includes(searchQuery.value?.toLowerCase() || "");
  });
};

/* Funciones de API */
// Obtener lista de materiales
const fetchMateriales = async () => {
  try {
    const { data } = await materialesAxios.get("/lista_productos");

    // Verificar si data es un array
    if (!Array.isArray(data)) {
      manejarError("La respuesta del servidor no es un array. Verifica la API.");
      return;
    }

    materiales.value = data.map((material) => ({
      ...material,
      id: material._id || material.id,
    }));

    console.log("Materiales cargados:", materiales.value);
    filterMateriales();
  } catch (error) {
    manejarError("Error al cargar los materiales. Intenta nuevamente.", error);
  } finally {
    loading.value = false;
  }
};

// Guardar nueva material
const saveNewMaterial = async () => {
  if (isSaving.value) return;
  if (!validarNuevaMaterial()) return;

  isSaving.value = true;

  try {
    const formData = new FormData();
    formData.append("nombre", newMaterial.nombre || "");
    formData.append("descripcion", newMaterial.descripcion || "");
    formData.append("precio", newMaterial.precio || 0);
    formData.append("stock", newMaterial.stock || 0);
    formData.append("imagen", newMaterial.imagen || null);

    const response = await materialesAxios.post("/crear_productos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Esperar respuesta del servidor
    if (response.status === 201) {
      materiales.value.push(response.data);
      await fetchMateriales();
      filterMateriales();
      resetNewMaterialForm();
      isAddingNewMaterial.value = false;
    } else {
      throw new Error("La creación del material falló");
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    manejarError("Error al guardar el material. Intenta nuevamente.", error);
  } finally {
    isSaving.value = false;
  }
};

/* Funciones de API */
// Función guardar el material
const saveMaterial = async () => {
  if (!selectedMaterial.value) {
    mostrarError("No se ha seleccionado ningun material.");
    return;
  }

  const selectedMaterialId = selectedMaterial.value._id || selectedMaterial.value.id;
  if (!selectedMaterialId) {
    mostrarError("Error: El ID del material no es válido.");
    return;
  }

  try {
    // Crear un objeto FormData para enviar los datos y la imagen
    const formData = new FormData();

    // Agregar los otros campos a FormData
    formData.append("nombre", selectedMaterial.value.nombre);
    formData.append("descripcion", selectedMaterial.value.descripcion);
    formData.append("stock", selectedMaterial.value.stock);
    formData.append("precio", selectedMaterial.value.precio);

    // Agregar la imagen
    if (selectedMaterial.value.imagen) {
      formData.append("imagen", selectedMaterial.value.imagen);
    }

    // Realizar la petición de actualización
    const { data: updatedMaterial } = await materialesAxios.put(
      `/actualizar_productos/${selectedMaterialId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    // Actualizar el material en el array de materiales
    const index = materiales.value.findIndex(
      (material) => material._id === selectedMaterialId || material.id === selectedMaterialId
    );
    if (index !== -1) {
      materiales.value[index] = updatedMaterial.materialPredefinida;
      filterMateriales();
    } else {
      manejarError("Error: No se encontró el material para actualizar.");
    }

    // Salir del modo edición
    selectedMaterial.value = null;
    editMode.value = false;
    window.location.reload();
  } catch (error) {
    manejarError("Error al actualizar el material. Intenta nuevamente.", error);
  }
};

// Función para seleccionar material
const selectMaterial = (material) => {
  if (editMode.value && selectedMaterial.value !== material) {
    mostrarError(
      "Primero guarda o cancela los cambios antes de seleccionar otra material."
    );
    return;
  }

  // Si el material es la misma
  if (selectedMaterial.value === material) {
    selectedMaterial.value = null;
    editMode.value = false;
  } else {
    // Seleccionar una nueva material
    selectedMaterial.value = material;
    editMode.value = false;
  }
};

// Eliminar material
const confirmDeleteMaterial = async (id) => {
  if (!id) {
    manejarError("Error: El ID del material no es válido. Intenta seleccionar un material nuevamente.");
    return;
  }

  try {
    // Eliminar el material desde el backend
    await materialesAxios.delete(`/eliminar_producto/${id}`);

    // Actualizar la lista
    materiales.value = materiales.value.filter((material) => material.id !== id);
    filterMateriales();

  } catch (error) {
    manejarError("Error al eliminar el material. Intenta nuevamente.", error);
  } finally {
    closeDeleteConfirm();
  }
};

// Cerrar el modal
const closeDeleteConfirm = () => {
  showDeleteConfirm.value = false;
  selectedMaterial.value = null;
  showError.value = false;
};

// Abrir ventana para eliminar
const openDeleteConfirm = (material) => {
  materialToDelete.value = material;
  showDeleteConfirm.value = true;
};

// Cancela el añadir material
const cancelAddMaterial = () => {
  resetNewMaterialForm();
  isAddingNewMaterial.value = false;
};

/* Validaciones */
// Validar nueva material
const validarNuevaMaterial = () => {
  if (!newMaterial.nombre.trim()) {
    mostrarError("El nombre es obligatorio.");
    return false;
  }
  if (!newMaterial.descripcion.trim()) {
    mostrarError("La descripción es obligatoria.");
    return false;
  }
  if (newMaterial.precio <= 0) {
    mostrarError("El precio debe ser mayor a 0.");
    return false;
  }
  if (newMaterial.stock < 0) {
    mostrarError("El stock no puede ser negativo.");
    return false;
  }
  if (!newMaterial.imagen) {
    mostrarError("La imagen es obligatoria.");
    return false;
  }
  return true;
};

/* Manejo de errores */
const manejarError = (mensaje, error) => {
  console.error(mensaje, error);
  mostrarError(mensaje);
};

const mostrarError = (mensaje) => {
  errorMessage.value = mensaje;
  showError.value = true;
  setTimeout(() => (showError.value = false), 3000);
};

/* Manejo de imágenes */
// Subir imagen
const onImageSelected = (event) => {
  const file = event.target.files[0];
  if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
    selectedImage.value = URL.createObjectURL(file);
    newMaterial.imagen = file;
    selectedMaterial.value.imagen = file;
  } else if (file) {
    mostrarError("Formato de imagen no válido.");
  }
};

/* Funciones auxiliares */
// Cambiar entre crear y ver material
const toggleAddNewMaterial = () => {
  if (isAddingNewMaterial.value) {
    isAddingNewMaterial.value = false;
    resetNewMaterialForm();
  } else {
    isAddingNewMaterial.value = true;
    selectedMaterial.value = null;
    resetNewMaterialForm();
  }
};

// Resetear formulario de nueva material
const resetNewMaterialForm = () => {
  Object.assign(newMaterial, {
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    imagen: null,
  });
  selectedImage.value = null;
};

/* Inicialización */
onMounted(fetchMateriales);
</script>

<!-- Estilos -->
<style scoped>
/* Fuentes */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Josefin+Sans:wght@400;600&display=swap");

/* Fondo de Pantalla */
main {
  background-image: url("../../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
  background-size: cover;
  background-position: center;
}

/* Barra de scroll */
section>div {
  scrollbar-width: auto;
  scrollbar-color: #946ad8 #e0d3f5;
}

/* Estilo para navegadores Webkit */
section>div::-webkit-scrollbar {
  width: 8px;
}

section>div::-webkit-scrollbar-thumb {
  background-color: #946ad8;
  border-radius: 4px;
}

section>div::-webkit-scrollbar-track {
  background-color: #e0d3f5;
}

/* Animación de Entrada */
@keyframes slide-in {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.5s ease-out forwards;
}

/* Estilos Responsivos */
@media (max-width: 768px) {
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

/* Estilos para la imagen del material */
label[for="image-upload"] {
  display: inline-block;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border: 1px solid #ddd;
}

label[for="image-upload"]:hover {
  transform: scale(1.05);
}

.image-preview {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border: 1px solid #ddd;
}

.material-item:hover {
  background-color: #f3f4f6;
}
</style>