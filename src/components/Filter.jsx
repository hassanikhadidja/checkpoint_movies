function Filter({ filterTitle, setFilterTitle, filterRating, setFilterRating }) {
  return (
    <div className="filter-container">
      <div className="filter-group">
        <label>Title:</label>
        <input
          type="text"
          placeholder="Search by title..."
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Minimum Rating:</label>
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(Number(e.target.value))}
        >
          <option value={0}>All</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
          <option value={5}>5+</option>
          <option value={6}>6+</option>
          <option value={7}>7+</option>
          <option value={8}>8+</option>
          <option value={9}>9+</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;