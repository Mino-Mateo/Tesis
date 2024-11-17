/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colores personalizados
      colors: {
        primary: '#8568AD',   // Color principal
        secondary: '#8A8FB9', // Color secundario
        light: '#E0D3F5',     // Color claro (fondo suave)
        success: '#95CF68',   // Color para éxito
        danger: '#DA6B65',    // Color para error o peligro
        warning: '#EBBA53',   // Color de advertencia
        neutral: '#4B3C68',   // Color neutro (para textos oscuros)
        simple: '#8A8A8A',    // Color simple para textos
        content: '#E9D8FD',   // Color para los rellenos
        
        // Colores adicionales
        'primary-light': '#B8A2D7',   // Variación más clara del color primario
        'primary-dark': '#5C3F88',    // Variación más oscura del color primario
        'secondary-light': '#A1A8D9', // Variación más clara del color secundario
        'secondary-dark': '#6C739E',  // Variación más oscura del color secundario
        
        // Colores de texto
        'text-light': '#F7F7F7',       // Texto claro
        'text-dark': '#333333',        // Texto oscuro
        
        // Colores de fondo
        'bg-light': '#F5F5F5',         // Fondo claro
        'bg-dark': '#2C2C2C',          // Fondo oscuro
        
        // Colores de estados
        'hover-primary': '#A17EB3',    // Hover sobre el color primario
        'hover-secondary': '#9A9DB8',  // Hover sobre el color secundario
        'focus-primary': '#6F4A92',    // Focus en el color primario
        'focus-secondary': '#6C719C',  // Focus en el color secundario
        'active-primary': '#4C3D7C',   // Activo sobre el color primario
        'active-secondary': '#585A76', // Activo sobre el color secundario
      },
      
      // Bordes redondeados
      borderRadius: {
        box: '20px',        // Borde de caja
        button: '50px',     // Borde de botones
        'card': '12px',     // Borde para tarjetas
        'input': '8px',     // Borde para inputs
        ms: '10px',        // Muestreo
      },
      
      // Sombras personalizadas
      boxShadow: {
        'sm': '0 2px 4px rgba(0, 0, 0, 0.1)',  // Sombra ligera
        'md': '0 4px 8px rgba(0, 0, 0, 0.2)',  // Sombra media
        'lg': '0 6px 12px rgba(0, 0, 0, 0.3)',  // Sombra fuerte
        'xl': '0 8px 16px rgba(0, 0, 0, 0.4)',  // Sombra extra fuerte
        'pr': '4px 5px 16px 1px rgba(89, 89, 89, 1)',  // Sombra extra fuerte
      },
      
      // Fuentes personalizadas
      fontFamily: {
        sans: ['Josefin Sans', 'sans-serif'],  // Fuente para el texto general
        heading: ['Poppins', 'sans-serif'],   // Fuente para los encabezados
      },
    },
  },
  plugins: [],
}