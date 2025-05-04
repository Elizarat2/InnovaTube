import { useState } from 'react';
import axios from 'axios';
import SearchFilters from './SearchFilters';
import VideoItem from './VideoItem';
import './VideoList.css';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const searchVideos = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const params = { q: searchTerm, ...filters };
      const { data } = await axios.get('/api/videos/search', { params });
      setVideos(data);
    } catch (error) {
      console.error('Error searching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="video-list-container">
      <div className="search-controls">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar videos..."
          className="search-input"
        />
        <button 
          onClick={searchVideos} 
          disabled={loading}
          className="search-button"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      <SearchFilters onFilterChange={setFilters} />

      <div className="video-grid">
        {videos.map(video => (
          <VideoItem 
            key={video.videoId}
            video={video}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;