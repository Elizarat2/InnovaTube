import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Bienvenido a InnovaTube</h1>
        <p>Descubre y guarda tus videos favoritos de YouTube</p>
        <div className="cta-buttons">
          <Link to="/register" className="cta-button primary">Regístrate Gratis</Link>
          <Link to="/login" className="cta-button secondary">Iniciar Sesión</Link>
        </div>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <h3>Busca Videos</h3>
          <p>Encuentra cualquier video de YouTube con nuestro buscador avanzado</p>
        </div>
        <div className="feature-card">
          <h3>Guarda Favoritos</h3>
          <p>Mantén organizados tus videos favoritos en un solo lugar</p>
        </div>
        <div className="feature-card">
          <h3>Accede desde cualquier lugar</h3>
          <p>Tu colección disponible en todos tus dispositivos</p>
        </div>
      </div>
    </div>
  );
};

export default Home;