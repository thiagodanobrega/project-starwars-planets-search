import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import fetchAPI from '../services/fetchAPI';
import Filters from './Filters';
import filterByPlanetName from '../helpers';

function Table() {
  const { data, setData, filterByName } = useContext(AppContext);
  const [planetsFilteredList, setPlanetsFilteredList] = useState([]);

  useEffect(() => {
    const getPlanetsStarWars = async () => {
      const results = await fetchAPI();
      setData(results);
      setPlanetsFilteredList(results);
    };
    getPlanetsStarWars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const planetsFiltered = filterByPlanetName(data, filterByName);
    setPlanetsFilteredList(planetsFiltered);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByName]);

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
          {planetsFilteredList.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
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
