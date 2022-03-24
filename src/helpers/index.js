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

function changePosition(arr, from, to) {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
  return arr;
}

const orderList = (listOfPlanets, order) => {
  if (Object.keys(order).length > 0) {
    let orderedPlanets = [...listOfPlanets];
    const { column, sort } = order;
    orderedPlanets.forEach((obj, index) => {
      if (obj[column] === 'unknown') {
        const indexTo = orderedPlanets.length - 1;
        orderedPlanets = changePosition(orderedPlanets, index, indexTo);
      }
    });
    orderedPlanets.sort((a, b) => (sort === 'ASC' ? a[column] - b[column]
      : b[column] - a[column]));
    return orderedPlanets;
  }
  return listOfPlanets;
};

export const filterPlanets = (data, filterByName, filterByNumericValues, order) => {
  let filteredPlanets = filterByPlanetName(data, filterByName);
  filteredPlanets = filterByValues(filteredPlanets, filterByNumericValues);
  filteredPlanets = orderList(filteredPlanets, order);
  return filteredPlanets;
};

export const removeColumn = (columnList, filterListByValues) => {
  if (filterListByValues.length > 0) {
    let columnListRemoved = columnList;
    filterListByValues.forEach(({ column }) => {
      columnListRemoved = columnListRemoved.filter((item) => item !== column);
    });
    return columnListRemoved;
  }
  return columnList;
};
