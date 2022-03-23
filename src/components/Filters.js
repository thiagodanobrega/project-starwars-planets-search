import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Filters() {
  const { setFilterByName } = useContext(AppContext);
  const handleChange = ({ target: { value } }) => {
    setFilterByName({ name: value });
  };
  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleChange }
      />
    </section>
  );
}

export default Filters;
