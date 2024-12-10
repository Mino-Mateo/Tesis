<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen pt-0">
    <!-- Navbar -->
    <Navbar />

    <!-- Contenedor principal -->
    <div class="flex w-full h-full gap-6 mt-6 px-10">
      <!-- Contenedor Izquierda -->
      <section class="w-1/3 max-w-xs p-5 bg-primary rounded-card shadow-lg h-min mb-5">
        <!-- Botón añadir Caja -->
        <button @click="toggleAddNewCaja"
          class="w-full flex items-center justify-center py-2 px-4 mb-5 bg-secondary text-text-light hover:bg-[#9397c0] focus:outline-none focus:ring-2 rounded-card focus:ring-[#946ad8] focus:border-[#946ad8] focus:ring-opacity-50 font-sans"
          aria-label="Añadir nueva caja">
          Añadir Caja
        </button>

        <!-- Cuadro de búsqueda -->
        <div class="pb-6 text-texto">
          <input type="text" aria-label="Buscar cajas por nombre" placeholder="Buscar por nombre" v-model="searchQuery"
            @input="filterCajas" class="w-full bg-light p-3 rounded-md shadow-md text-center focus:outline-none" />
          <div v-if="filteredCajas.length === 0" class="text-center pt-5 text-xl text-white">
            No se encontraron resultados
          </div>
        </div>

        <!-- Lista de cajas -->
        <div class="overflow-y-auto space-y-4 pr-4">
          <div v-for="(caja, index) in filteredCajas" :key="index" @click="selectCaja(caja)"
            class="caja-item flex items-center w-dvh bg-light p-2 rounded-md shadow-md cursor-pointer text-texto">
            <img src="../../assets/icons/Resaltado/Simbolo/caja2-icon.svg" alt="Icono Cajas"
              class="w-10 h-10 rounded-full mr-4" />
            <span class="truncate w-full block">{{ caja.nombre }}</span>
          </div>
        </div>
      </section>

      <!-- Contenedor Derecha -->
      <section class="flex-1 p-10 bg-primary rounded-card shadow-lg mb-5">
        <h2 class="text-3xl text-center mb-6 font-heading font-bold text-text-light">
          Datos de la caja
        </h2>

        <!-- Contenedor principal -->
        <div class="w-full bg-secondary pl-10 pr-10 pt-6 pb-6 rounded-card text-texto">
          <!-- Texto antes de seleccionar la caja -->
          <div v-if="!selectedCaja && !isAddingNewCaja"
            class="text-[25px] text-center font-semibold font-sans text-text-light">
            Selecciona una caja para ver sus datos
          </div>

          <!-- Datos de la nueva caja -->
          <div v-if="isAddingNewCaja && !selectedCaja" class="rounded-card space-y-5">
            <!-- Título -->
            <h3 class="text-2xl font-bold text-center text-white">
              Nueva Caja
            </h3>

            <!-- Campos del formulario -->
            <div class="space-y-4">
              <!-- Nombre -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Icono de Nombre"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newCaja.nombre" type="text" placeholder="Nombre"
                  class="block w-full pl-12 py-3 rounded-md text-texto focus:outline-none bg-light" />
              </div>

              <!-- Descripción -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/descripcion-icon.svg" alt="Icono de descripción"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <textarea v-model="newCaja.descripcion" placeholder="Descripción" rows="3"
                  class="block w-full pl-12 py-3 rounded-md text-texto focus:outline-none bg-light"></textarea>
              </div>

              <!-- Precio -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Icono de Precio"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newCaja.precio" type="text" placeholder="Precio"
                  class="block w-full pl-12 py-3 rounded-md text-texto focus:outline-none bg-light"
                  @input="validatePrice" @blur="formatPrice" />
              </div>

              <!-- Stock -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Icono de Stock"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newCaja.stock" type="number" placeholder="Stock" min="0" step="1"
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
              <button @click="saveNewCaja" class="w-1/3 bg-success hover:bg-[#63e951] text-black py-3 px-16 rounded-md">
                Guardar
              </button>
              <button @click="cancelAddCaja"
                class="w-1/3 bg-danger hover:bg-[#e95151] text-black py-3 px-16 rounded-md">
                Cancelar
              </button>
            </div>
          </div>

          <!-- Datos de la caja -->
          <div v-if="selectedCaja && !isAddingNewCaja" class="space-y-3">
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
                  <img :src="selectedCaja.imagen" alt="imagen" class="w-full h-full rounded-card object-cover" />
                </div>
              </div>
            </div>

            <!-- Campos de texto -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Campo Nombre -->
              <div>
                <label for="nombre" class="text-lg block pl-3">Nombre</label>
                <InfoRow label=" " v-if="!editMode" :value="selectedCaja.nombre" icon="namelast-icon.svg" />
                <div v-if="editMode" class="flex bg-white p-3 rounded-md space-x-3 ml-3">
                  <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Nombre Icono"
                    class="w-6 h-6" />
                  <input v-model="selectedCaja.nombre" id="nombre" type="text"
                    class="bg-white rounded-md w-full font-sans text-[18px] focus:outline-none" />
                </div>
              </div>

              <!-- Campo Precio -->
              <div>
                <label for="precio" class="text-lg block pl-3">Precio</label>
                <InfoRow label=" " v-if="!editMode" :value="`${selectedCaja.precio}`" icon="dinero-icon.svg" />
                <div v-if="editMode" class="flex bg-white p-3 rounded-md space-x-3 ml-3">
                  <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Precio Icono" class="w-6 h-6" />
                  <input v-model="selectedCaja.precio" id="precio" type="number" min="0" step="0.01"
                    @input="validatePrice"
                    class="bg-white rounded-md w-full font-sans text-[18px] focus:outline-none" />
                </div>
              </div>

              <!-- Campo Stock -->
              <div>
                <label for="stock" class="text-lg block pl-3">Stock</label>
                <InfoRow label=" " v-if="!editMode" :value="selectedCaja.stock" icon="stock-icon.svg" />
                <div v-if="editMode" class="flex bg-white p-3 rounded-md space-x-3 ml-3">
                  <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Stock Icono" class="w-6 h-6" />
                  <input v-model="selectedCaja.stock" id="stock" type="number" min="0" step="1"
                    class="bg-white rounded-md w-full font-sans text-[18px] focus:outline-none" />
                </div>
              </div>

              <!-- Campo Descripción -->
              <div class="col-span-1 md:col-span-2">
                <label for="descripcion" class="text-lg block pl-2">Descripción</label>
                <InfoRow label=" " v-if="!editMode" :value="selectedCaja.descripcion" icon="descripcion-icon.svg" />
                <div v-if="editMode" class="flex bg-white p-3 rounded-md space-x-3 ml-3">
                  <img src="../../assets/icons/Resaltado/Simbolo/descripcion-icon.svg" alt="Descripción Icono"
                    class="w-6 h-6" />
                  <textarea v-model="selectedCaja.descripcion" id="descripcion" rows="3"
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
              <button v-if="editMode" @click="saveCaja"
                class="w-1/3 bg-success hover:bg-[#63e951] text-black py-3 px-16 rounded-md">
                Guardar
              </button>
              <button @click="openDeleteConfirm(selectedCaja)"
                class="w-1/3 bg-danger hover:bg-[#e95151] text-black py-3 px-16 rounded-md">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Ventana Emergente -->
      <ConfirmDeleteModal :visible="showDeleteConfirm" :mensaje="'¿Estás seguro de eliminar la caja?'"
        @close="closeDeleteConfirm" @confirm="confirmDeleteCaja(selectedCaja?.id)" />

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
const cajasAxios = axios.create({
  baseURL: "https://cuenta-me.up.railway.app/api/cajas_predefinidas",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Variables reactivas
const isAddingNewCaja = ref(false);
const isSaving = ref(false);
const selectedCaja = ref(null);
const selectedImage = ref("");
const loading = ref(true);
const editMode = ref(false);
const showDeleteConfirm = ref(false);
const cajaToDelete = ref(null);
const showError = ref(false);
const errorMessage = ref("");
const searchQuery = ref("");
const filteredCajas = ref([]);
const newCaja = reactive({
  nombre: "",
  descripcion: "",
  precio: 0,
  stock: 0,
  imagen: null,
});
const cajas = ref([]);

/* Computadas */
const filterCajas = () => {
  filteredCajas.value = (cajas.value || []).filter((caja) => {
    const nombre = caja?.nombre || "";
    return nombre
      .toLowerCase()
      .includes(searchQuery.value?.toLowerCase() || "");
  });
};

/* Funciones de API */
// Obtener lista de cajas
const fetchCajas = async () => {
  try {
    const { data } = await cajasAxios.get("/listar");
    cajas.value = (data || []).map((caja) => ({
      ...caja,
      id: caja._id || caja.id,
    }));

    console.log("Cajas cargadas:", cajas.value);
    filterCajas();
  } catch (error) {
    manejarError("Error al cargar las cajas. Intenta nuevamente.", error);
  } finally {
    loading.value = false;
  }
};

// Guardar nueva caja
const saveNewCaja = async () => {
  if (isSaving.value) return;
  if (!validarNuevaCaja()) return;

  isSaving.value = true;

  try {
    const formData = new FormData();
    formData.append("nombre", newCaja.nombre || "");
    formData.append("descripcion", newCaja.descripcion || "");
    formData.append("precio", newCaja.precio || 0);
    formData.append("stock", newCaja.stock || 0);
    formData.append("imagen", newCaja.imagen || null);

    const response = await cajasAxios.post("/crear", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Esperar respuesta del servidor
    if (response.status === 201) {
      cajas.value.push(response.data);
      await fetchCajas();
      filterCajas();
      resetNewCajaForm();
      isAddingNewCaja.value = false;
    } else {
      throw new Error("La creación de la caja falló");
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    manejarError("Error al guardar la caja. Intenta nuevamente.", error);
  } finally {
    isSaving.value = false;
  }
};

/* Funciones de API */
// Función guardar la caja
const saveCaja = async () => {
  if (!selectedCaja.value) {
    mostrarError("No se ha seleccionado ninguna caja.");
    return;
  }

  const selectedCajaId = selectedCaja.value._id || selectedCaja.value.id;
  if (!selectedCajaId) {
    mostrarError("Error: El ID de la caja no es válido.");
    return;
  }

  try {
    // Crear un objeto FormData para enviar los datos y la imagen
    const formData = new FormData();

    // Agregar los otros campos a FormData
    formData.append("nombre", selectedCaja.value.nombre);
    formData.append("descripcion", selectedCaja.value.descripcion);
    formData.append("stock", selectedCaja.value.stock);
    formData.append("precio", selectedCaja.value.precio);

    // Agregar la imagen
    if (selectedCaja.value.imagen) {
      formData.append("imagen", selectedCaja.value.imagen);
    }

    // Realizar la petición de actualización
    const { data: updatedCaja } = await cajasAxios.put(
      `/actualizar/${selectedCajaId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    // Actualizar la caja en el array de cajas
    const index = cajas.value.findIndex(
      (caja) => caja._id === selectedCajaId || caja.id === selectedCajaId
    );
    if (index !== -1) {
      cajas.value[index] = updatedCaja.cajaPredefinida;
      filterCajas();
    } else {
      manejarError("Error: No se encontró la caja para actualizar.");
    }

    // Salir del modo edición
    selectedCaja.value = null;
    editMode.value = false;
    window.location.reload();
  } catch (error) {
    manejarError("Error al actualizar la caja. Intenta nuevamente.", error);
  }
};

// Función para seleccionar caja
const selectCaja = (caja) => {
  if (editMode.value && selectedCaja.value !== caja) {
    mostrarError(
      "Primero guarda o cancela los cambios antes de seleccionar otra caja."
    );
    return;
  }

  // Si la caja es la misma
  if (selectedCaja.value === caja) {
    selectedCaja.value = null;
    editMode.value = false;
  } else {
    // Seleccionar una nueva caja
    selectedCaja.value = caja;
    editMode.value = false;
  }
};

// Eliminar caja
const confirmDeleteCaja = async (id) => {
  if (!id) {
    manejarError("Error: El ID de la caja no es válido. Intenta seleccionar una caja nuevamente.");
    return;
  }

  try {
    // Eliminar la caja desde el backend
    await cajasAxios.delete(`/eliminar/${id}`);

    // Actualizar la lista
    cajas.value = cajas.value.filter((caja) => caja.id !== id);
    filterCajas();

  } catch (error) {
    manejarError("Error al eliminar la caja. Intenta nuevamente.", error);
  } finally {
    closeDeleteConfirm();
  }
};

// Cerrar el modal
const closeDeleteConfirm = () => {
  showDeleteConfirm.value = false;
  selectedCaja.value = null;
  showError.value = false;
};

// Abrir ventana para eliminar
const openDeleteConfirm = (caja) => {
  cajaToDelete.value = caja;
  showDeleteConfirm.value = true;
};

// Cancela el añadir caja
const cancelAddCaja = () => {
  resetNewCajaForm();
  isAddingNewCaja.value = false;
};

/* Validaciones */
// Validar nueva caja
const validarNuevaCaja = () => {
  if (!newCaja.nombre.trim()) {
    mostrarError("El nombre es obligatorio.");
    return false;
  }
  if (!newCaja.descripcion.trim()) {
    mostrarError("La descripción es obligatoria.");
    return false;
  }
  if (newCaja.precio <= 0) {
    mostrarError("El precio debe ser mayor a 0.");
    return false;
  }
  if (newCaja.stock < 0) {
    mostrarError("El stock no puede ser negativo.");
    return false;
  }
  if (!newCaja.imagen) {
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
    newCaja.imagen = file;
    selectedCaja.value.imagen = file;
  } else if (file) {
    mostrarError("Formato de imagen no válido.");
  }
};

/* Funciones auxiliares */
// Cambiar entre crear y ver caja
const toggleAddNewCaja = () => {
  if (isAddingNewCaja.value) {
    isAddingNewCaja.value = false;
    resetNewCajaForm();
  } else {
    isAddingNewCaja.value = true;
    selectedCaja.value = null;
    resetNewCajaForm();
  }
};

// Resetear formulario de nueva caja
const resetNewCajaForm = () => {
  Object.assign(newCaja, {
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    imagen: null,
  });
  selectedImage.value = null;
};

/* Inicialización */
onMounted(fetchCajas);
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

/* Estilos para la imagen de la caja */
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

.caja-item:hover {
  background-color: #f3f4f6;
}
</style>