import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import AddMovie from './components/AddMovie';
import MovieDetails from './components/MovieDetails';
import './App.css';

function App() {
  const [movies, setMovies] = useState([
    // your 4 initial movies here (same as before)
    { title: "Inception", 
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", 
      posterURL: "https://tse2.mm.bing.net/th/id/OIP.b8WjJA8J2IJgblXaSliy3QHaLH?rs=1&pid=ImgDetMain&o=7&rm=3", 
      rating: 8,
      trailerLink: "https://www.youtube.com/embed/YoHD9XEInc0?si=6Tz_5BRGkxqHm1UJ"
    },
    { title: "The Matrix", 
      description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.", 
      posterURL: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", 
      rating: 5, 
      trailerLink:"https://www.youtube.com/embed/vKQi3bBA1y8?si=49vYytRMuUVgKoaR" },
    { title: "Interstellar", 
      description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft...", 
      posterURL: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", 
      rating: 3, 
      trailerLink: "https://www.youtube.com/embed/zSWdZVtXT7E?si=_RKyD9Cb7gQ2HK7h" },
    { title: "Parasite", 
      description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.", 
      posterURL: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", 
      rating: 9, 
      trailerLink: "https://www.youtube.com/embed/isOGD_7hNIY?si=Kqi-UO0ECbeoVKet" },
  ]);

  const [filterTitle, setFilterTitle] = useState('');
  const [filterRating, setFilterRating] = useState(0);

  const addMovie = (newMovie) => {
    setMovies(prev => [...prev, newMovie]);
  };

  const deleteMovie = (movieToDelete) => {
    if (window.confirm(`Delete "${movieToDelete.title}"?`)) {
      setMovies(prev => prev.filter(m => m !== movieToDelete));
    }
  };

  const editMovie = (oldMovie, updatedMovie) => {
    setMovies(prev =>
      prev.map(m => (m === oldMovie ? updatedMovie : m))
    );
  };

  const filteredMovies = movies.filter(movie => {
    const titleMatch = movie.title.toLowerCase().includes(filterTitle.toLowerCase().trim());
    const ratingMatch = movie.rating >= filterRating;
    return titleMatch && ratingMatch;
  });

return (
    <div className="app">
      <h1>My Favorite Movies</h1>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddMovie onAddMovie={addMovie} />
              <Filter
                filterTitle={filterTitle}
                setFilterTitle={setFilterTitle}
                filterRating={filterRating}
                setFilterRating={setFilterRating}
              />
              <MovieList
                movies={filteredMovies}
                onDelete={deleteMovie}
                onEdit={editMovie}
              />
            </>
          }
        />

        <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
      </Routes>
    </div>
  );
}

export default App;