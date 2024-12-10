<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen">
    <!-- Navbar -->
    <Navbar />

    <!-- Contenedor principal -->
    <div class="flex w-full h-full gap-6 mt-6 px-10">
      <!-- Contenedor Izquierda -->
      <section class="w-1/3 max-w-xs p-5 bg-primary rounded-card shadow-lg h-min mb-5">
        <!-- Cuadro de búsqueda -->
        <div class="pb-6 text-texto">
          <input type="text" aria-label="Buscar clientes por nombre" placeholder="Buscar por nombre"
            v-model="searchQuery" class="w-full bg-light p-3 rounded-md shadow-md text-center focus:outline-none" />
          <div v-if="filteredClientes.length === 0 && !loading && !error" class="text-center pt-5 text-xl text-white">
            No se encontraron resultados
          </div>
        </div>

        <!-- Lista de clientes -->
        <div v-if="loading" class="text-center pt-5 text-xl text-white">
          Cargando clientes...
        </div>

        <div v-if="error" class="text-center pt-5 text-xl text-white">
          {{ errorMessage }}
        </div>

        <div v-if="!loading && !error && filteredClientes.length > 0" class="overflow-y-auto space-y-4 pr-4">
          <div v-for="(cliente, index) in filteredClientes" :key="index" @click="selectCliente(cliente)"
            class="cliente-item flex items-center bg-light p-2 rounded-md shadow-md cursor-pointer text-texto hover:bg-light-hover">
            <img src="../../assets/icons/Resaltado/Simbolo/cliente-icon.svg" alt="Icono Cliente"
              class="w-10 h-10 rounded-full mr-4" />
              <span class="truncate w-full block">{{ cliente.nombre || "Desconocido" }} {{ cliente.apellido || "" }}</span>
          </div>
        </div>
      </section>

      <!-- Contenedor Derecha -->
      <section class="flex-1 p-10 bg-primary rounded-card shadow-lg mb-5">
        <h2 class="text-3xl text-center mb-6 font-heading font-bold text-text-light">Datos del cliente</h2>

        <!-- Contenedor de datos del cliente -->
        <div class="w-full bg-secondary p-6 rounded-card text-texto">
          <!-- Texto antes de seleccionar al cliente -->
          <div v-if="!selectedCliente" class="text-[25px] text-center font-semibold font-sans text-text-light">
            Selecciona a un cliente para ver sus datos
          </div>

          <!-- Datos del cliente -->
          <div v-else class="space-y-6 pr-2">
            <!-- Nombre y Teléfono -->
            <div class="grid grid-cols-2 gap-4">
              <InfoRow label="Nombre" :value="selectedCliente.nombre" icon="namelast-icon.svg" />
              <InfoRow label="Teléfono" :value="selectedCliente.telefono || 'No disponible'" icon="phone-icon.svg" />
            </div>

            <!-- Correo y Dirección -->
            <InfoRow label="Correo" :value="selectedCliente.correo || 'No disponible'" icon="mail-icon.svg" />
            <InfoRow label="Dirección" :value="selectedCliente.direccion || 'No disponible'"
              icon="direction-icon.svg" />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<!-- Scripts -->
<script setup>
/* Importaciones */
import { ref, computed, onMounted } from "vue";
import Navbar from "../../components/Navbar.vue";
import InfoRow from "../../components/InfoRow.vue";
import axios from "axios";

// Variables reactivas
const selectedCliente = ref(null);
const searchQuery = ref("");
const clientes = ref([]);
const loading = ref(true);
const error = ref(false);
const errorMessage = ref("");

// Obtener clientes de la API al montar el componente
onMounted(() => {
  cargarClientes();
});

// Función para cargar clientes
const cargarClientes = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No se encontró el token en localStorage");

    const response = await axios.get("/clientes", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data && Array.isArray(response.data.clientes)) {
      clientes.value = response.data.clientes;
    } else {
      throw new Error("La respuesta de la API no contiene un array de clientes");
    }
  } catch (err) {
    error.value = true;
    errorMessage.value = err.message || "Error desconocido";
    console.error("Error al cargar los clientes:", err);
  } finally {
    loading.value = false;
  }
};

// Filtrar clientes
const filteredClientes = computed(() => {
  if (!clientes.value.length) return [];
  const queryLower = searchQuery.value.toLowerCase();
  return clientes.value.filter((cliente) =>
    (`${cliente.nombre} ${cliente.apellido}`.toLowerCase() || "").includes(queryLower)
  );
});

// Seleccionar cliente
const selectCliente = (cliente) => {
  selectedCliente.value = cliente;
};
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

.cliente-item:hover {
  background-color: #f3f4f6;
}
</style>