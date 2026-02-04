export async function getCatFact() {
  const response = await fetch('https://catfact.ninja/fact');

  if (!response.ok) {
    throw new Error('Error en la respuesta de la API');
  }

  return response.json();
}
