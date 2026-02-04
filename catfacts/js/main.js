import { getCatFact } from './api.js';
import { showLoading, showFact, showError } from './ui.js';

document.getElementById('btnFact').addEventListener('click', async () => {
  showLoading();

  try {
    const data = await getCatFact();
    showFact(data.fact);
  } catch (error) {
    showError('No se pudo obtener el dato. Revisa tu conexión.');
  }
});
