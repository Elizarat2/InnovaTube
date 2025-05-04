import { useState, useEffect } from 'react';
import axios from 'axios';
import VideoItem from '../components/videos/VideoItem';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get('/api/videos/favorites');
        setFavorites(data);
      } catch (err) {
        setError('Error al cargar favoritos');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (videoId) => {
    try {
      await axios.delete(`/api/videos/favorites/${videoId}`);
      setFavorites(favorites.filter(video => video.videoId !== videoId));
    } catch (err) {
      setError('Error al eliminar de favoritos');
    }
  };

  if (loading) return <div className="loading">Cargando favoritos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="favorites-page">
      <h1>Tus Videos Favoritos</h1>
      {favorites.length === 0 ? (
        <p className="no-favorites">No tienes videos favoritos aún</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map(video => (
            <VideoItem 
              key={video.videoId}
              video={video}
              isFavorite={true}
              onToggleFavorite={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;