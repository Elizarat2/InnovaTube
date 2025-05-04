import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './NavbarStyles.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">InnovaTube</Link>
      </div>
      
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">
              Inicio
            </Link>
            <Link to="/favorites" className="nav-link">
              Favoritos
            </Link>
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="nav-link">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;