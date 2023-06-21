import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';

const apiKey = '';
const API_URL = `https://www.omdbapi.com/?apikey=${apiKey}`;

// const movie1 = {
//   "Title": "The Lord of the Rings: The Fellowship of the Ring",
//   "Year": "2001",
//   "imdbID": "tt0120737",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg"
// }

const App = () => {
  const [movies, setMovies] = useState([]); // default value is [];
  const [searchTerm, setSearchTerm] = useState([]);
  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie('The Lord of the Rings');
  },
    []);
  return (
    <div className="app">
      <h1> Movie Land</h1>

      <div className="search">
        <input
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // change the value in the search bar by typing, with a state
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovie(searchTerm)}
        />
      </div>
      {movies?.length > 0
        ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className='empty'>
            <h2> No movies found</h2>
          </div>
        )}
    </div>
  );
}

export default App;
