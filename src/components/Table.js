import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import fetchAPI from '../services/fetchAPI';
import Filters from './Filters';
import { filterPlanets } from '../helpers';

function Table() {
  const {
    data, setData, filterByName, filterByNumericValues, order,
  } = useContext(AppContext);

  const [filteredPlanetsList, setFilteredPlanetsList] = useState([]);

  useEffect(() => {
    const getPlanetsStarWars = async () => {
      const NUMBER_CHECK = -1;
      const results = await fetchAPI();
      results.sort((a, b) => (a.name > b.name ? 1 : NUMBER_CHECK));
      setData(results);
      setFilteredPlanetsList(results);
    };
    getPlanetsStarWars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filteredPlanets = filterPlanets(
      data, filterByName, filterByNumericValues, order,
    );
    setFilteredPlanetsList(filteredPlanets);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByName, filterByNumericValues, order]);

  return (
    <section>
      <Filters />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanetsList.map((planet) => (
            <tr key={ planet.name }>
              <td data-testId="planet-name">{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
