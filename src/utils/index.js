export const types = {
  number: 'number',
  title: 'text',
  releaseDate: 'date',
  productionBudget: 'money',
  worldwideBoxOffice: 'money'
};

const formatDate = (date) => {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
};

export function sortMovies(movies, column, direction) {
  const moviesSlice =
    column === 'releaseDate'
      ? movies.map((movie) => ({
          formatedReleaseDate: new Date(formatDate(movie.releaseDate)),
          ...movie
        }))
      : movies.slice();

  let sortColumn = column === 'releaseDate' ? 'formatedReleaseDate' : column;

  const compareNumbers = (a, b) => (direction === 'asc' ? a - b : b - a);

  const compareStrings = (a, b) =>
    direction === 'asc'
      ? a.localeCompare(b, 'en', { sensitivity: 'base' })
      : b.localeCompare(a, 'en', { sensitivity: 'base' });

  const compareFnsMap = {
    number: compareNumbers,
    money: compareNumbers,
    text: compareStrings,
    date: compareNumbers
  };

  return moviesSlice.sort((a, b) =>
    compareFnsMap[types[column]](a[sortColumn], b[sortColumn])
  );
}

export function filterMovies(movies, filters) {
  return movies.filter((movie) =>
    Object.keys(filters).every((filter) => {
      return movie[filter]?.toString().toLowerCase().includes(filters[filter]);
    })
  );
}
