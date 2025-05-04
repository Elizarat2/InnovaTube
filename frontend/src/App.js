import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estados
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('search');
  const [isLoading, setIsLoading] = useState(false);

  // Datos de ejemplo (simulando API)
  const sampleVideos = [
    {
      id: '1',
      title: 'Cómo crear una aplicación web moderna',
      thumbnail: 'https://via.placeholder.com/300x180?text=Video+1',
      isFavorite: false
    },
    {
      id: '2',
      title: 'Introducción a JavaScript avanzado',
      thumbnail: 'https://via.placeholder.com/300x180?text=Video+2',
      isFavorite: false
    },
    {
      id: '3',
      title: 'Aprende React en 30 minutos',
      thumbnail: 'https://via.placeholder.com/300x180?text=Video+3',
      isFavorite: true
    }
  ];

  // Efecto para cargar datos iniciales
  useEffect(() => {
    setVideos(sampleVideos);
  }, []);

  // Funciones de favoritos
  const toggleFavorite = (videoId) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId
          ? { ...video, isFavorite: !video.isFavorite }
          : video
      )
    );
    
    // Aquí iría la llamada a tu backend
    console.log(`Video ${videoId} actualizado en favoritos`);
  };

  // Funcionalidad de búsqueda
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      
      // Simulación de búsqueda con timeout
      setTimeout(() => {
        const newVideos = [
          ...sampleVideos,
          {
            id: Date.now().toString(),
            title: `Resultado para: ${searchQuery}`,
            thumbnail: 'https://via.placeholder.com/300x180?text=Nuevo+Video',
            isFavorite: false
          }
        ];
        setVideos(newVideos);
        setIsLoading(false);
      }, 1000);
    }
  };

  // Filtrar videos según la pestaña activa
  const displayedVideos = activeTab === 'favorites'
    ? videos.filter(video => video.isFavorite)
    : videos;

  return (
    <div className="app">
      <header className="header">
        <h1>InnovaTube</h1>
        <div className="user-section">
          <span>Usuario Demo</span>
          <button className="logout-btn">Cerrar sesión</button>
        </div>
      </header>

      <div className="container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            Buscar Videos
          </button>
          <button
            className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Mis Favoritos
          </button>
        </div>

        {activeTab === 'search' && (
          <div className="search-section">
            <input
              type="text"
              placeholder="Buscar videos en YouTube..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="loading">Cargando videos...</div>
        ) : (
          <div className="video-grid">
            {displayedVideos.length > 0 ? (
              displayedVideos.map(video => (
                <div key={video.id} className="video-card">
                  <div className="video-thumbnail">
                    <img src={video.thumbnail} alt={video.title} />
                  </div>
                  <div className="video-info">
                    <h3>{video.title}</h3>
                    <button
                      onClick={() => toggleFavorite(video.id)}
                      className={video.isFavorite ? 'remove-fav' : 'add-fav'}
                    >
                      {video.isFavorite ? '❤️ Quitar de favoritos' : '⭐ Añadir a favoritos'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                {activeTab === 'favorites'
                  ? 'No tienes videos favoritos aún'
                  : 'No se encontraron videos'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;