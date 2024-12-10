/* Importaciones */
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// Axios
axios.defaults.baseURL = 'https://cuenta-me.up.railway.app/api/admin';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Variables
const app = createApp(App);

// Configuración global para Axios
app.config.globalProperties.$axios = axios;

// Exportaciones
app.use(router); 
app.mount('#app');