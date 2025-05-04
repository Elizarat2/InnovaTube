import { useState } from 'react';
import './SearchFilters.css';

const SearchFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: 'video',
    duration: 'any',
    date: 'any',
    sort: 'relevance'
  });

  const handleChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="search-filters">
      <div className="filter-group">
        <label>Tipo:</label>
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="video">Videos</option>
          <option value="playlist">Listas</option>
          <option value="channel">Canales</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Duración:</label>
        <select name="duration" value={filters.duration} onChange={handleChange}>
          <option value="any">Cualquier duración</option>
          <option value="short">Cortos (menos de 4 min)</option>
          <option value="medium">Medianos (4-20 min)</option>
          <option value="long">Largos (+20 min)</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Ordenar por:</label>
        <select name="sort" value={filters.sort} onChange={handleChange}>
          <option value="relevance">Relevancia</option>
          <option value="date">Fecha de subida</option>
          <option value="viewCount">Número de vistas</option>
          <option value="rating">Calificación</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;