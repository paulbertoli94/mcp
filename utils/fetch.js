import fetch from 'node-fetch';

// Funzione per fare richieste GET e restituire i dati JSON
export const getApiData = async (url, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const fullUrl = `${url}?${query}`;

  try {
    const res = await fetch(fullUrl);

    if (!res.ok) {
      throw new Error(`Errore API: ${res.status} ${res.statusText}`);
    }

    return await res.json();  // Restituisce i dati JSON
  } catch (err) {
    throw new Error(`Errore durante il fetch: ${err.message}`);
  }
};
