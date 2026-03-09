import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';   // ← add this import

function AddMovie({ onAddMovie }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posterURL, setPosterURL] = useState('');
  const [rating, setRating] = useState(0);   // ← change to number, default 0

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title is required!');
      return;
    }

    if (rating === 0) {
      alert('Please select a rating (1–10)');
      return;
    }

    const newMovie = {
      title: title.trim(),
      description: description.trim(),
      posterURL: posterURL.trim() || 'https://via.placeholder.com/300x450?text=New+Movie',
      rating: Number(rating),   // already a number
    };

    onAddMovie(newMovie);

    setTitle('');
    setDescription('');
    setPosterURL('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <h2>Add a New Movie</h2>

      <input
        type="text"
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="url"
        placeholder="Poster URL *"
        value={posterURL}
        onChange={(e) => setPosterURL(e.target.value)}
        required
      />
      <small>Required: valid image link…</small>

      {/* Stars for rating input */}
      <div style={{ margin: '12px 0' }}>
        <label>Rating (0–10) *</label>
        <Rating
          onClick={(newRating) => setRating(newRating)}
          initialValue={rating}
          ratingValue={10}
          allowFraction={true}
          size={32}
          fillColor="#c2185b"
          emptyColor="#e0e0e0"
          transition
        />
        {rating > 0 && <span style={{ marginLeft: '10px' }}>{rating.toFixed(1)}</span>}
      </div>

      <button type="submit">Add Movie</button>
    </form>
  );
}

export default AddMovie;