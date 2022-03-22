const fetchAPI = async () => {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const { results } = await fetch(endpoint).then((response) => response.json());
  return results;
};

export default fetchAPI;
