// Import our custom CSS
import '../../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

/**
 * Carga componentes HTML dinámicamente.
 * @param {string} component - Nombre del componente (sin extensión).
 * @param {string} target - Selector del elemento donde insertar el componente.
 */
async function loadComponent(component, target) {
  try {
    const response = await fetch(`../components/${component}.html`);
    if (!response.ok) throw new Error(`Error cargando ${component}`);
    const html = await response.text();
    document.querySelector(target).innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Configura el cambio de tema entre claro y oscuro al hacer clic en un botón.
 * Se ejecuta cuando el contenido del documento ha sido completamente cargado.
 */
document.addEventListener('DOMContentLoaded', async () => {
  // Cargar componentes comunes
  await loadComponent('header', 'header');
  await loadComponent('footer', 'footer');

  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  // Verificar que los elementos existen antes de asignar eventos
  if (!themeToggleBtn || !themeIcon) return;

  // Aplicar el tema guardado en LocalStorage o 'light' por defecto
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-bs-theme', savedTheme);
  themeIcon.classList.add(savedTheme === 'dark' ? 'bi-moon' : 'bi-sun');

  /**
   * Evento que alterna el tema entre claro y oscuro.
   */
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Aplicar el nuevo tema y guardarlo en LocalStorage
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Cambiar el icono según el nuevo tema
    themeIcon.classList.replace(currentTheme === 'light' ? 'bi-sun' : 'bi-moon', newTheme === 'dark' ? 'bi-moon' : 'bi-sun');
  });
});
