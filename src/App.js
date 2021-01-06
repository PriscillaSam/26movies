import classNames from './App.module.css';
import { useState, useEffect } from 'react';
import { Table } from './components/Table';
import data from './data';
import { sortMovies, filterMovies, types } from './utils';

function App() {
  const [tableRows, setTableRows] = useState(() => data.rows);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortColumn, setSortColumn] = useState('number');
  const [filters, setFilters] = useState({});

  const changeSortDirection = (direction, column) => () => {
    setSortDirection(direction);

    if (sortColumn !== column) {
      setSortColumn(column);
    }
  };

  const handleFiltersChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const filteredMovies = filterMovies(data.rows, filters);
    setTableRows(filteredMovies);
  }, [filters]);

  useEffect(() => {
    const sortedMovies = sortMovies(tableRows, sortColumn, sortDirection);
    setTableRows(sortedMovies);
  }, [sortColumn, sortDirection]);

  return (
    <div className={classNames.app}>
      <Table
        columns={data.columns}
        rows={tableRows}
        types={types}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        changeSortDirection={changeSortDirection}
        handleFiltersChange={handleFiltersChange}
        filters={filters}
      />
    </div>
  );
}

export default App;
