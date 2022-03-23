const filterByPlanetName = (planetList, { name }) => {
  if (name) {
    return planetList.filter((planet) => planet.name.toLowerCase().includes(name));
  }
  return planetList;
};

export default filterByPlanetName;
