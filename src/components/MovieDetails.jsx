import { useParams, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

function MovieDetails({ movies }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const movieIndex = Number(id);
  const movie = movies[movieIndex];

  if (!movie) {
    return (
      <div className="movie-details">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <h2>Movie not found</h2>
      </div>
    );
  }

  return (
    <div className="movie-details">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <h1>{movie.title}</h1>

      <div className="details-content">
        <img src={movie.posterURL} alt={movie.title} className="details-poster" />

        <div className="details-info">
          <div className="details-rating">
            <Rating
              initialValue={movie.rating}
              ratingValue={10}
              allowFraction={true}
              readonly={true}
              size={32}
              fillColor="#c2185b"
              emptyColor="#e0e0e0"
            />
            <span>{movie.rating.toFixed(1)} / 10</span>
          </div>

          <h3>Description</h3>
          <p>{movie.description || 'No description available.'}</p>

          <h3>Trailer</h3>
          {movie.trailerLink ? (
            <div className="video-container">
              <iframe
                src={movie.trailerLink}
                title={`${movie.title} trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>No trailer available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;