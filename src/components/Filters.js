import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { removeColumn } from '../helpers';

function Filters() {
  const {
    setFilterByName,
    columnToGrab,
    filterByNumericValues,
    setFilterByNumericValues,
    setOrder,
  } = useContext(AppContext);
  const [columnList, setColumnList] = useState(columnToGrab);
  const state = {
    column: 'population',
    comparison: 'maior que',
    value: 0,
  };
  const stateOrder = {
    column: 'population',
    sort: '',
  };
  const [localState, setLocalState] = useState(state);
  const [localStateOrder, setLocalStateOrder] = useState(stateOrder);

  useEffect(() => {
    setColumnList(columnToGrab);
  }, [columnToGrab]);

  const handleChangeFilter = ({ target: { name, value } }) => {
    setLocalState({ ...localState, [name]: value });
  };

  const handleChangeOrder = ({ target: { name, value } }) => {
    setLocalStateOrder({ ...localStateOrder, [name]: value });
  };

  const handleClickOrder = () => {
    setOrder(localStateOrder);
  };

  const handleChangeName = ({ target: { value } }) => {
    setFilterByName({ name: value });
  };

  const handleClickFilter = () => {
    setFilterByNumericValues([...filterByNumericValues, localState]);
  };

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
  };

  const removeFilter = (column) => {
    const arr = filterByNumericValues.filter((obj) => obj.column !== column);
    setFilterByNumericValues(arr);
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
        data-testid="column-filter"
        onChange={ handleChangeFilter }
      >
        {columnList.map((item, index) => (
          <option
            key={ index }
          >
            {item}
          </option>
        ))}
      </select>
      <select
        name="comparison"
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

      <select
        name="column"
        data-testid="column-sort"
        onChange={ handleChangeOrder }
      >
        {columnToGrab.map((column, index) => (
          <option
            key={ index }
          >
            {column}
          </option>
        ))}
      </select>

      <label htmlFor="order-asc">
        Ascendente
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          name="sort"
          value="ASC"
          onChange={ handleChangeOrder }
        />
      </label>

      <label htmlFor="order-desc">
        Descendente
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          name="sort"
          value="DESC"
          onChange={ handleChangeOrder }
        />
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleClickOrder }
      >
        Ordenar
      </button>

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover Filtros
      </button>
      {
        filterByNumericValues.length > 0 ? (
          filterByNumericValues.map(({ column, comparison, value }) => (
            <div key={ column } data-testid="filter">
              <p>{`${column} ${comparison} ${value}`}</p>
              <button
                type="button"
                onClick={ () => removeFilter(column) }
              >
                X
              </button>
            </div>
          ))
        ) : ''
      }
    </section>
  );
}

export default Filters;
