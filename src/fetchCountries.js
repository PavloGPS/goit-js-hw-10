export function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1';
  const END_POINT_NAME = '/name';

  const params = new URLSearchParams({
    fields:"name,capital,population,flags,languages",    
  });
   
  console.log(name);
  // return fetch("https://jsonplaceholder.typicode.com/users").then(
  return fetch(`${BASE_URL}${END_POINT_NAME}/${name}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
