const FilterBar = ({ filters, setFilters }) => {
  return (
    <div className="filter-bar">
      <input
        type="date"
        value={filters.date}
        onChange={e => setFilters(prev => ({ ...prev, date: e.target.value }))}
      />
      <input
        placeholder="Category"
        value={filters.category}
        onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
      />
      <input
        placeholder="Location"
        value={filters.location}
        onChange={e => setFilters(prev => ({ ...prev, location: e.target.value }))}
      />
    </div>
  );
};

export default FilterBar;
