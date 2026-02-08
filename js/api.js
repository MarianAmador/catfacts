const FACT_URL = 'https://catfact.ninja/fact';
const IMAGE_URL = 'https://api.thecatapi.com/v1/images/search';


const MAX_RETRIES = 2;
const RETRY_DELAY = 500;


const FAILURE_LIMIT = 3;
const COOLDOWN_TIME = 10000;

let failureCount = 0;
let circuitOpenUntil = null;


export async function getCatFact() {
  return fetchWithProtection(FACT_URL, async (data) => data.fact);
}


export async function getCatImage() {
  return fetchWithProtection(IMAGE_URL, async (data) => data[0].url);
}


async function fetchWithProtection(url, parser) {

  if (circuitOpenUntil && Date.now() < circuitOpenUntil) {
    throw new Error('Circuit breaker open');
  }

  let attempt = 0;

  while (attempt <= MAX_RETRIES) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(url, {
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error('Bad response');
      }

      const data = await response.json();

     
      failureCount = 0;
      circuitOpenUntil = null;

      return await parser(data);

    } catch (error) {
      attempt++;
      failureCount++;

      if (failureCount >= FAILURE_LIMIT) {
        circuitOpenUntil = Date.now() + COOLDOWN_TIME;
        throw new Error('Circuit breaker open');
      }

      if (attempt > MAX_RETRIES) {
        if (error.name === 'AbortError') {
          throw new Error('Tiempo de espera agotado');
        }
        throw error;
      }

      await wait(RETRY_DELAY);

    } finally {
      clearTimeout(timeoutId);
    }
  }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
