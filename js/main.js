import { getCatFact, getCatImage } from './api.js';

const btn = document.getElementById('btnFact');
const factText = document.getElementById('fact');
const statusText = document.getElementById('status');
const catImage = document.getElementById('catImage');

btn.addEventListener('click', async () => {
  statusText.textContent = 'Cargando gatito... 🐾';
  factText.textContent = '';
  catImage.style.display = 'none';

  try {
    const [fact, imageUrl] = await Promise.all([
      getCatFact(),
      getCatImage()
    ]);

    factText.textContent = fact;
    catImage.src = imageUrl;
    catImage.style.display = 'block';

    statusText.textContent = '';

  } catch (error) {
    if (error.message === 'Circuit breaker open') {
      statusText.textContent = '🙀 El michi está descansando. Intenta en unos segundos.';
    } else if (error.message === 'Tiempo de espera agotado') {
      statusText.textContent = '🐢 El gatito se tardó demasiado. Intenta otra vez.';
    } else {
      statusText.textContent = '😿 No se pudo obtener el dato. Revisa tu conexión.';
    }

    console.error(error);
  }
});
