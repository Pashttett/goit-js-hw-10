const BASE_URL = 'https://api.thecatapi.com';
const API_KEY = 'live_aTdozMYhj8EW2RUf1PMw45VVVFqfbTQsUWcmhcTLEjwwF3FVxPGXvCRYAPCf4ZTD';

export function fetchBreeds() {
  const URL_API = `${BASE_URL}/v1/breeds?api_key=${API_KEY}`;

  return fetch(URL_API)
    .then(resp => {
      if (!resp.ok) throw new Error(resp.status);
      return resp.json();
    })
    .then(resp => resp.map(item => ({ name: item.name, id: item.id })))
    // .catch(error  => console.log(error))
}

export function fetchCatByBreed(breedId) {
  const URL_API = `${BASE_URL}/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`;
 
  return fetch(URL_API)
    .then(resp => {
      if (!resp.ok) throw new Error(resp.status);
      return resp.json();
    })
    // .catch(error => console.log(error));
}