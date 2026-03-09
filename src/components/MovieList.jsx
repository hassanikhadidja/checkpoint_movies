import MovieCard from './MovieCard';

function MovieList({ movies, onDelete, onEdit }) {
  if (!movies || movies.length === 0) {
    return <div className="no-movies">No movies match your filter 😔</div>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          movie={movie}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default MovieList;