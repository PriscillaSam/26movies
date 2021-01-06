import { ReactSVG } from 'react-svg';
import classNames from './Table.module.css';

const Table = ({
  columns,
  rows,
  types,
  filters,
  sortColumn,
  sortDirection,
  changeSortDirection,
  handleFiltersChange
}) => {
  return (
    <table title="Movies" className={classNames.table}>
      <thead>
        <tr>
          {columns.map(({ id, title }) => (
            <th key={id}>
              <div className={classNames[`th-container`]}>
                <div className={classNames[`column-title`]}>
                  <div className={classNames[`sort-section`]}>
                    <button
                      className={classNames[`sort-btn-ascending`]}
                      title="ascending"
                      onClick={changeSortDirection('asc', id)}
                      disabled={sortColumn === id && sortDirection === 'asc'}
                    >
                      <ReactSVG src="/icons/order-ascending.svg" />
                    </button>
                    <button
                      title="descending"
                      onClick={changeSortDirection('desc', id)}
                      disabled={sortColumn === id && sortDirection === 'desc'}
                    >
                      <ReactSVG src="/icons/order-descending.svg" />
                    </button>
                  </div>
                  {title}
                </div>
                <input
                  type="text"
                  className={classNames[`input-filter`]}
                  placeholder={`Filter by ${title}`}
                  name={id}
                  value={filters[id]}
                  onChange={handleFiltersChange}
                />
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {columns.map(({ id }) => (
              <td className={classNames[`cell-type-${types[id]}`]} key={id}>
                {row[id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
