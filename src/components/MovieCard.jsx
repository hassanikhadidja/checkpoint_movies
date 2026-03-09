import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

function MovieCard({ movie, index, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState({ ...movie });
  const navigate = useNavigate();

  if (!movie || !movie.title) {
    return (
      <div className="movie-card">
        <div className="movie-info">
          <h3>Invalid Movie</h3>
          <p>Error loading data</p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editedMovie.title.trim() || editedMovie.rating === undefined) {
      alert("Title and rating are required!");
      return;
    }
    onEdit(movie, {
      ...editedMovie,
      rating: Number(editedMovie.rating),
    });
    setIsEditing(false);
  };

  const handleCardClick = () => {
    if (!isEditing) {
      navigate(`/movie/${index}`);
    }
  };

  if (isEditing) {
    return (
      <div className="movie-card editing">
        <div className="movie-info">
          <h3>Edit Movie</h3>

          <input
            name="title"
            value={editedMovie.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <textarea
            name="description"
            value={editedMovie.description || ''}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            name="posterURL"
            value={editedMovie.posterURL}
            onChange={handleChange}
            placeholder="Poster URL"
          />
          <input
            name="trailerLink"
            value={editedMovie.trailerLink || ''}
            onChange={handleChange}
            placeholder="Trailer embed URL[](https://www.youtube.com/embed/...)"
          />

          <div style={{ margin: '12px 0' }}>
            <label>Rating (0–10):</label>
            <Rating
              onClick={(newRating) => setEditedMovie((prev) => ({ ...prev, rating: newRating }))}
              initialValue={editedMovie.rating || 0}
              ratingValue={10}
              allowFraction={true}
              size={28}
              fillColor="#c2185b"
              emptyColor="#e0e0e0"
              transition
            />
          </div>

          <div className="card-actions">
            <button className="btn-edit" onClick={handleSave}>Save</button>
            <button className="btn-delete" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <img
        src={movie.posterURL}
        alt={movie.title}
        className="poster"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/240x340?text=No+Poster';
        }}
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>

        <div className="rating-stars">
          <Rating
            initialValue={movie.rating}
            ratingValue={10}
            allowFraction={true}
            readonly={true}
            size={22}
            fillColor="#c2185b"
            emptyColor="#e0e0e0"
          />
          <span className="rating-number">({movie.rating.toFixed(1)})</span>
        </div>

        <p className="description">
          {movie.description
            ? movie.description.substring(0, 90) + (movie.description.length > 90 ? '...' : '')
            : 'No description'}
        </p>
      </div>

      <div className="card-actions">
        <button
          className="btn-edit"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          Edit
        </button>
        <button
          className="btn-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(movie);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default MovieCard;