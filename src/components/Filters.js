import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { removeColumn } from '../helpers';

function Filters() {
  const {
    setFilterByName,
    columnToGrab,
    filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(AppContext);
  const [columnList, setColumnList] = useState(columnToGrab);
  const state = {
    column: 'population',
    comparison: 'maior que',
    value: 0,
  };
  const [localState, setLocalState] = useState(state);

  useEffect(() => {
    setColumnList(columnToGrab);
  }, [columnToGrab]);

  const handleChangeFilter = ({ target: { name, value } }) => {
    setLocalState({ ...localState, [name]: value });
  };

  const handleChangeName = ({ target: { value } }) => {
    setFilterByName({ name: value });
  };

  const handleClickFilter = () => {
    setFilterByNumericValues([...filterByNumericValues, localState]);
  };

  useEffect(() => {
    const listColumn = removeColumn(columnToGrab, filterByNumericValues);
    setColumnList(listColumn);
    setLocalState({ ...localState, column: listColumn[0] });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByNumericValues]);

  return (
    <section>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleChangeName }
      />
      <select
        name="column"
        value={ localState.column }
        data-testid="column-filter"
        onChange={ handleChangeFilter }
      >
        {columnList.map((item, index) => (
          <option
            key={ index }
            value={ item }
          >
            {item}
          </option>
        ))}
      </select>
      <select
        name="comparison"
        value={ localState.comparison }
        data-testid="comparison-filter"
        onChange={ handleChangeFilter }
      >
        <option value="maior que" selected>maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        name="value"
        data-testid="value-filter"
        value={ localState.value }
        onChange={ handleChangeFilter }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickFilter }
      >
        Filtrar
      </button>
    </section>
  );
}

export default Filters;
