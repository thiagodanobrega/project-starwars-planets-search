import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const columnToGrab = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [data, setData] = useState([]);
  const [order, setOrder] = useState({});
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [
    filterByNumericValues,
    setFilterByNumericValues,
  ] = useState([]);
  const state = {
    data,
    setData,
    filterByName,
    setFilterByName,
    columnToGrab,
    filterByNumericValues,
    setFilterByNumericValues,
    order,
    setOrder,
  };
  return (
    <AppContext.Provider value={ state }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
