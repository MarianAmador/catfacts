import { getCatFact } from './api.js';
import { showLoading, showFact, showError } from './ui.js';

const btn = document.getElementById('btnFact');

btn.addEventListener('click', async () => {
  btn.disabled = true;
  showLoading();

  try {
    const data = await getCatFact();
    showFact(data.fact);

  } catch (error) {
    if (error.message === 'Tiempo de espera agotado') {
      showError('El gato tiró el router… intenta otra vez');
    } else {
      showError('No se pudo obtener el dato. Revisa tu conexión.');
    }

  } finally {
    btn.disabled = false;
  }
});
