<!-- HTML -->
<template>
  <!-- Navbar -->
  <Navbar />

  <!-- Contenedor principal -->
  <main id="main" class="flex flex-col w-full min-h-screen pl-10 pt-0">
    <div class="flex flex-col md:flex-row gap-6 mt-[26px]">
      <!-- Contenedor de pedidos -->
      <section class="w-full md:w-1/3 max-w-xs p-5 h-[560px] bg-primary rounded-box shadow-pr">
        <!-- Título de la lista de pedidos -->
        <div class="flex items-center justify-center mb-6">
          <h2 class="text-[28px] md:text-[30px] font-bold text-white">
            Lista de pedidos
          </h2>
        </div>

        <!-- Lista de pedidos con scroll -->
        <div class="h-[450px] overflow-y-auto space-y-4 pr-5">
          <div v-for="(pedido, index) in filteredpedidos" :key="index" @click="selectpedido(pedido)"
            class="pedido-item p-1 pr-4 text-simple font-bold bg-light flex items-center rounded-box cursor-pointer h-12">
            <!-- Indicador de estado del pedido -->
            <div :class="[
              'w-5 h-5 flex items-center justify-center mr-4 rounded-full ml-3',
              pedido.estado === 'Pendiente' ? 'bg-[#F6C23E]' : 'bg-[#28A745]',
            ]"></div>
            <span>{{ pedido.nombre }}</span>
          </div>
        </div>
      </section>

      <!-- Contenedor de datos del pedido -->
      <section
        class="w-full md:w-[850px] mx-auto p-6 bg-primary rounded-box shadow-pr flex flex-col items-center pb-10">
        <!-- Título de la sección -->
        <div class="flex items-center justify-center mb-6">
          <h2 class="text-[28px] md:text-[36px] font-bold text-white">
            Datos del pedido
          </h2>
        </div>

        <!-- Contenedor de los datos -->
        <div class="w-full bg-secondary p-10 rounded-box text-neutral">
          <div v-if="selectedpedido" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Estado del pedido -->
            <div class="flex flex-col gap-2">
              <strong class="text-lg">Estado del pedido:</strong>
              <div class="flex items-center bg-light p-3 rounded-md w-full">
                <div :class="[
                  'w-5 h-5 rounded-full flex justify-center items-center',
                  selectedpedido.estado === 'Pendiente'
                    ? 'bg-[#F6C23E]'
                    : 'bg-[#28A745]',
                ]"></div>
                <span class="text-lg font-medium ml-10">
                  {{
                    selectedpedido.estado === "Pendiente"
                      ? "Pendiente"
                      : "Entregado"
                  }}
                </span>
                <button @click="cambiarEstado"
                  class="px-4 py-2 ml-auto text-white bg-warning rounded-md hover:bg-[#FFBF38] focus:outline-none focus:ring-2 focus:ring-[#F2E984]">
                  Cambiar
                </button>
              </div>
            </div>

            <!-- Nombre del cliente -->
            <div class="flex flex-col">
              <strong class="text-lg mb-2">Nombre del Cliente:</strong>
              <div class="flex items-center bg-light p-3 rounded-md">
                <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Nombre Icono"
                  class="w-6 h-6 mr-6" />
                <span class="truncate">{{ selectedpedido.cliente }}</span>
              </div>
            </div>

            <!-- Dirección del cliente -->
            <div class="flex flex-col">
              <strong class="text-lg mb-2">Dirección:</strong>
              <div class="flex items-center bg-light p-3 rounded-md space-x-2">
                <img src="../../assets/icons/Resaltado/Simbolo/direction-icon.svg" alt="Dirección Icono"
                  class="w-6 h-6" />
                <span class="truncate">{{ selectedpedido.direccion }}</span>
              </div>
            </div>

            <!-- Fecha del pedido y precio -->
            <div class="flex flex-col md:flex-row gap-6 w-full">
              <!-- Fecha -->
              <div class="flex flex-col w-full md:w-1/2">
                <strong class="text-lg mb-2">Fecha del Pedido:</strong>
                <div class="flex items-center bg-light p-3 rounded-md space-x-2">
                  <img src="../../assets/icons/Resaltado/Simbolo/calendario-icon.svg" alt="Fecha Icono"
                    class="w-6 h-6" />
                  <span>{{ selectedpedido.fecha }}</span>
                </div>
              </div>

              <!-- Precio -->
              <div class="flex flex-col w-full md:w-1/2 ml-6">
                <strong class="text-lg mb-2">Precio:</strong>
                <div class="flex items-center bg-light p-3 rounded-md space-x-4">
                  <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Precio Icono" class="w-6 h-6" />
                  <span>{{ selectedpedido.precio }}</span>
                </div>
              </div>
            </div>

            <!-- Foto del pedido -->
            <div class="flex justify-center items-center col-span-2">
              <img :src="selectedpedido.foto" alt="Foto del Pedido"
                class="bg-light p-3 rounded-box w-36 h-36 md:w-40 md:h-40" />
            </div>

            <!-- Lista de materiales -->
            <div class="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div v-for="(material, index) in selectedpedido.materiales" :key="index"
                class="flex items-center bg-[#E5D8F7] p-3 rounded-md shadow-md">
                <img src="../../assets/icons/Resaltado/Simbolo/flor2-icon.svg" alt="Icono Material"
                  class="w-8 h-8 mr-4" />
                <span class="font-medium text-sm">{{ material }}</span>
              </div>
            </div>
          </div>

          <!-- Botón para eliminar pedido -->
          <div class="flex justify-center pt-6" v-if="selectedpedido">
            <button @click="openDeleteConfirm(selectedpedido)" class="bg-danger text-black py-3 px-12 rounded-md">
              Eliminar Pedido
            </button>
          </div>

          <!-- Ventana Emergente -->
          <transition name="slide">
            <div v-if="showDeleteConfirm"
              class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div class="relative p-8 bg-primary rounded-box text-center w-3/4 max-w-md">
                <!-- Botón para cerrar ventana -->
                <button class="absolute top-2 right-2 text-white" @click="closeDeleteConfirm"
                  aria-label="Cerrar ventana">
                  <img src="../../assets/icons/Resaltado/Accion/close-icon.svg" alt="Cerrar" class="w-8 h-8" />
                </button>

                <!-- Mensaje de confirmacion -->
                <h3 class="text-white font-bold mb-4 text-center text-[24px]">
                  ¿Estás seguro de eliminar el pedido?
                </h3>
                <img src="../../assets/icons/Resaltado/Alerta/alert-icon.svg" alt="Advertencia"
                  class="w-20 h-20 mx-auto mb-4" />

                <!-- Botones -->
                <div class="flex justify-around mt-4">
                  <button @click="confirmDeletePedido"
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
      </section>
    </div>
  </main>
</template>

<!-- Scripts -->
<script setup>
// Importaciones
import { ref, reactive, computed, watch } from "vue";
import Navbar from "../../components/Navbar.vue";

// Variables
const isAddingNewpedido = ref(false);
const selectedpedido = ref(null);
const editMode = ref(false);

const clientes = ref([
  {
    nombre: "Ana",
    apellido: "Martínez",
    correo: "ana.martinez@gmail.com",
    telefono: "0987654321",
    direccion: "Av. Siempre Viva 123",
  },
  {
    nombre: "Carlos",
    apellido: "Gómez",
    correo: "carlos.gomez@hotmail.com",
    telefono: "0991234567",
    direccion: "Calle Los Pinos 45",
  },
  {
    nombre: "María",
    apellido: "Fernández",
    correo: "maria.fernandez@gmail.com",
    telefono: "0981234567",
    direccion: "Av. Principal 678",
  },
  {
    nombre: "Diego",
    apellido: "Pérez",
    correo: "diego.perez@hotmail.com",
    telefono: "0998765432",
    direccion: "Calle Secundaria 9",
  },
  {
    nombre: "Lucía",
    apellido: "Ramírez",
    correo: "lucia.ramirez@gmail.com",
    telefono: "0976543210",
    direccion: "Calle Central 12",
  },
  {
    nombre: "Jorge",
    apellido: "Herrera",
    correo: "jorge.herrera@hotmail.com",
    telefono: "0965432109",
    direccion: "Av. La Paz 321",
  },
  {
    nombre: "Elena",
    apellido: "Lopez",
    correo: "elena.lopez@gmail.com",
    telefono: "0954321098",
    direccion: "Calle Esperanza 56",
  },
  {
    nombre: "Pedro",
    apellido: "García",
    correo: "pedro.garcia@yahoo.com",
    telefono: "0943210987",
    direccion: "Av. Las Flores 789",
  },
  {
    nombre: "Sara",
    apellido: "Ortiz",
    correo: "sara.ortiz@yahoo.com",
    telefono: "0932109876",
    direccion: "Calle Amanecer 101",
  },
  {
    nombre: "Daniel",
    apellido: "Castro",
    correo: "daniel.castro@yahoo.com",
    telefono: "0921098765",
    direccion: "Av. Montaña 202",
  },
  {
    nombre: "Claudia",
    apellido: "Mendoza",
    correo: "claudia.mendoza@yahoo.com",
    telefono: "0910987654",
    direccion: "Calle Del Sol 303",
  },
  {
    nombre: "Luis",
    apellido: "Silva",
    correo: "luis.silva@gmail.com",
    telefono: "0999988776",
    direccion: "Av. Horizonte 404",
  },
  {
    nombre: "Gabriela",
    apellido: "Rojas",
    correo: "gabriela.rojas@gmail.com",
    telefono: "0988877665",
    direccion: "Calle Luna 505",
  },
  {
    nombre: "Ricardo",
    apellido: "Cruz",
    correo: "ricardo.cruz@gmail.com",
    telefono: "0977766554",
    direccion: "Av. Río 606",
  },
  {
    nombre: "Paola",
    apellido: "Vargas",
    correo: "paola.vargas@gmail.com",
    telefono: "0966655443",
    direccion: "Calle Cascada 707",
  },
  {
    nombre: "Andrés",
    apellido: "Morales",
    correo: "andres.morales@hotmail.com",
    telefono: "0955544332",
    direccion: "Av. Serenidad 808",
  },
  {
    nombre: "Diana",
    apellido: "Navarro",
    correo: "diana.navarro@yahoo.com",
    telefono: "0944433221",
    direccion: "Calle Bosque 909",
  },
  {
    nombre: "Rodrigo",
    apellido: "Hernández",
    correo: "rodrigo.hernandez@hotmail.com",
    telefono: "0933322110",
    direccion: "Av. Valle 1010",
  },
  {
    nombre: "Carmen",
    apellido: "Torres",
    correo: "carmen.torres@hotmail.com",
    telefono: "0922211009",
    direccion: "Calle Jardines 1111",
  },
  {
    nombre: "Sebastián",
    apellido: "Álvarez",
    correo: "sebastian.alvarez@onion.com",
    telefono: "0911100098",
    direccion: "Av. Nevado 1212",
  },
]);

const materiales = reactive([
  {
    nombre: "Papel de regalo",
    descripcion: "Rollo de papel decorativo con diseños festivos",
    precio: "3.50",
    stock: 200,
    foto: null,
  },
  {
    nombre: "Cinta de satén",
    descripcion: "Cinta de satén para envolver regalos, 10m",
    precio: "2.00",
    stock: 150,
    foto: null,
  },
  {
    nombre: "Flores artificiales",
    descripcion: "Ramo de flores decorativas para adornar",
    precio: "5.50",
    stock: 100,
    foto: null,
  },
  {
    nombre: "Tarjetas personalizables",
    descripcion: "Set de 10 tarjetas para mensajes",
    precio: "4.00",
    stock: 300,
    foto: null,
  },
  {
    nombre: "Brillantina",
    descripcion: "Frasco de brillantina dorada, 200g",
    precio: "3.00",
    stock: 80,
    foto: null,
  },
  {
    nombre: "Pegatinas decorativas",
    descripcion: "Pack de 50 pegatinas temáticas",
    precio: "1.50",
    stock: 400,
    foto: null,
  },
  {
    nombre: "Cintas de papel crepé",
    descripcion: "Rollo de papel crepé de colores",
    precio: "1.75",
    stock: 200,
    foto: null,
  },
  {
    nombre: "Cajas de luces LED",
    descripcion: "Mini luces LED para decorar regalos",
    precio: "6.00",
    stock: 50,
    foto: null,
  },
  {
    nombre: "Perlas decorativas",
    descripcion: "Bolsa de perlas para adornos",
    precio: "3.25",
    stock: 120,
    foto: null,
  },
  {
    nombre: "Rosas preservadas",
    descripcion: "Rosa natural tratada para durar años",
    precio: "10.00",
    stock: 30,
    foto: null,
  },
]);

const cajas = reactive([
  {
    nombre: "Caja romántica",
    descripcion: "Caja en forma de corazón, ideal para San Valentín",
    precio: "8.00",
    stock: 50,
    foto: null,
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

const pedidos = reactive([
  {
    nombre: "Pedido 1",
    cliente: clientes.value[0].nombre + " " + clientes.value[0].apellido,
    direccion: clientes.value[0].direccion,
    fecha: "2024-11-20",
    precio: "45.00",
    materiales: [
      materiales[0].nombre,
      materiales[3].nombre,
      materiales[5].nombre,
      materiales[6].nombre,
    ],
    caja: cajas[1],
    estado: "Pendiente",
    foto: ("../../assets/icons/Cajas/Caja_1.png"),
  },
  {
    nombre: "Pedido 2",
    cliente: clientes.value[1].nombre + " " + clientes.value[1].apellido,
    direccion: clientes.value[1].direccion,
    fecha: "2024-11-20",
    precio: "35.50",
    materiales: [
      materiales[1].nombre,
      materiales[4].nombre,
      materiales[7].nombre,
    ],
    caja: cajas[2],
    estado: "Enviado",
  },
  {
    nombre: "Pedido 3",
    cliente: clientes.value[2].nombre + " " + clientes.value[2].apellido,
    direccion: clientes.value[2].direccion,
    fecha: "2024-11-19",
    precio: "55.75",
    materiales: [
      materiales[0].nombre,
      materiales[2].nombre,
      materiales[5].nombre,
      materiales[6].nombre,
      materiales[8].nombre,
    ],
    caja: cajas[3],
    estado: "Entregado",
  },
  {
    nombre: "Pedido 4",
    cliente: clientes.value[3].nombre + " " + clientes.value[3].apellido,
    direccion: clientes.value[3].direccion,
    fecha: "2024-11-18",
    precio: "65.20",
    materiales: [
      materiales[3].nombre,
      materiales[4].nombre,
      materiales[6].nombre,
      materiales[9].nombre,
    ],
    caja: cajas[4],
    estado: "Pendiente",
  },
  {
    nombre: "Pedido 5",
    cliente: clientes.value[4].nombre + " " + clientes.value[4].apellido,
    direccion: clientes.value[4].direccion,
    fecha: "2024-11-17",
    precio: "70.00",
    materiales: [
      materiales[1].nombre,
      materiales[2].nombre,
      materiales[5].nombre,
      materiales[8].nombre,
    ],
    caja: cajas[5],
    estado: "Enviado",
  },
  {
    nombre: "Pedido 6",
    cliente: clientes.value[5].nombre + " " + clientes.value[5].apellido,
    direccion: clientes.value[5].direccion,
    fecha: "2024-11-16",
    precio: "50.40",
    materiales: [
      materiales[0].nombre,
      materiales[4].nombre,
      materiales[7].nombre,
    ],
    caja: cajas[6],
    estado: "Entregado",
  },
  {
    nombre: "Pedido 7",
    cliente: clientes.value[6].nombre + " " + clientes.value[6].apellido,
    direccion: clientes.value[6].direccion,
    fecha: "2024-11-15",
    precio: "40.90",
    materiales: [
      materiales[2].nombre,
      materiales[3].nombre,
      materiales[8].nombre,
    ],
    caja: cajas[7],
    estado: "Pendiente",
  },
  {
    nombre: "Pedido 8",
    cliente: clientes.value[7].nombre + " " + clientes.value[7].apellido,
    direccion: clientes.value[7].direccion,
    fecha: "2024-11-14",
    precio: "60.00",
    materiales: [
      materiales[0].nombre,
      materiales[1].nombre,
      materiales[5].nombre,
      materiales[9].nombre,
    ],
    caja: cajas[8],
    estado: "Enviado",
  },
  {
    nombre: "Pedido 9",
    cliente: clientes.value[8].nombre + " " + clientes.value[8].apellido,
    direccion: clientes.value[8].direccion,
    fecha: "2024-11-13",
    precio: "75.00",
    materiales: [
      materiales[2].nombre,
      materiales[4].nombre,
      materiales[6].nombre,
      materiales[7].nombre,
      materiales[9].nombre,
    ],
    caja: cajas[9],
    estado: "Pendiente",
  },
  {
    nombre: "Pedido 10",
    cliente: clientes.value[9].nombre + " " + clientes.value[9].apellido,
    direccion: clientes.value[9].direccion,
    fecha: "2024-11-12",
    precio: "80.50",
    materiales: [
      materiales[0].nombre,
      materiales[5].nombre,
      materiales[7].nombre,
      materiales[8].nombre,
    ],
    caja: cajas[0],
    estado: "Entregado",
  },
]);

const searchQuery = ref("");
const filteredpedidos = computed(() => {
  return pedidos.filter((pedido) =>
    pedido.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
const showDeleteConfirm = ref(false);
const pedidoToDelete = ref(null);

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
      selectedpedido.value.estado === "Pendiente" ? "Entregado" : "Pendiente";
  }
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
const confirmDeletePedido = () => {
  if (selectedpedido.value) {
    const index = pedidos.findIndex(
      (pedido) => pedido === selectedpedido.value
    );
    if (index !== -1) {
      pedidos.splice(index, 1);
    }
    selectedpedido.value = null;
    closeDeleteConfirm();
  }
};

// Actualiza la lista de pedidos
watch(searchQuery, () => {
  filteredpedidos.value = pedidos.filter((pedido) =>
    pedido.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Inicializar la lista
filteredpedidos.value = pedidos;
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
</style>