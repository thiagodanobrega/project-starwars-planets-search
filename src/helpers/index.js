export const filterByPlanetName = (planetList, { name }) => {
  if (name) {
    return planetList.filter((planet) => planet.name.toLowerCase().includes(name));
  }
  return planetList;
};

export const filterByValues = (listOfPlanets, filterListByValues) => {
  if (filterListByValues.length > 0) {
    let filteredPlanets = listOfPlanets;
    filterListByValues.forEach(({ column, comparison, value }) => {
      if (comparison === 'maior que') {
        filteredPlanets = filteredPlanets
          .filter((planet) => Number(planet[column]) > Number(value));
      } else if (comparison === 'menor que') {
        filteredPlanets = filteredPlanets
          .filter((planet) => Number(planet[column]) < Number(value));
      } else {
        filteredPlanets = filteredPlanets
          .filter((planet) => Number(planet[column]) === Number(value));
      }
    });
    return filteredPlanets;
  }
  return listOfPlanets;
};

export const filterPlanets = (data, filterByName, filterByNumericValues) => {
  let filteredPlanets = filterByPlanetName(data, filterByName);
  filteredPlanets = filterByValues(filteredPlanets, filterByNumericValues);
  return filteredPlanets;
};
