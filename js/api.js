export async function getCatFact() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos

  try {
    const response = await fetch('https://catfact.ninja/fact', {
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error('Error de la API');
    }

    return await response.json();

  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Tiempo de espera agotado');
    }
    throw error;

  } finally {
    clearTimeout(timeoutId);
  }
}
