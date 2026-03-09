import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';   // ← add this import

function MovieCard({ movie, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState({ ...movie });

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
    setEditedMovie(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editedMovie.title.trim() || !editedMovie.rating) {
      alert("Title and rating are required!");
      return;
    }
    onEdit(movie, {
      ...editedMovie,
      rating: Number(editedMovie.rating),
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="movie-card">
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
            value={editedMovie.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            name="posterURL"
            value={editedMovie.posterURL}
            onChange={handleChange}
            placeholder="Poster URL"
          />

          {/* Interactive rating during edit */}
          <div style={{ margin: '12px 0' }}>
            <label>Rating (0–10):</label>
            <Rating
              onClick={(newRating) => setEditedMovie(prev => ({ ...prev, rating: newRating }))}
              initialValue={editedMovie.rating}
              ratingValue={10}          // ← scale 0–10
              allowFraction={true}      // allow 8.5, 7.7 etc.
              size={28}
              fillColor="#c2185b"
              emptyColor="#e0e0e0"
              transition
            />
          </div>

          <div className="card-actions">
            <button className="btn-edit" onClick={handleSave}>Save</button>
            <button className="btn-delete" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-card">
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

        {/* Read-only stars instead of text */}
        <div className="rating-stars" style={{ margin: '8px 0' }}>
          <Rating
            initialValue={movie.rating}
            ratingValue={10}
            allowFraction={true}
            readonly={true}
            size={22}
            fillColor="#c2185b"
            emptyColor="#e0e0e0"
          />
          <span style={{ marginLeft: '8px', fontSize: '0.9rem', color: '#555' }}>
            {movie.rating.toFixed(1)}
          </span>
        </div>

        <p className="description">{movie.description || 'No description'}</p>
      </div>

      <div className="card-actions">
        <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="btn-delete" onClick={() => onDelete(movie)}>Delete</button>
      </div>
    </div>
  );
}

export default MovieCard;