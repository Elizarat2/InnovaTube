import { useState } from 'react';
import './VideoItem.css';

const VideoItem = ({ video, isFavorite, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="video-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="video-thumbnail-container">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="video-thumbnail"
        />
        {isHovered && (
          <button 
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            onClick={() => onToggleFavorite(video.videoId, isFavorite)}
            aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        )}
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
      </div>
    </div>
  );
};

export default VideoItem;