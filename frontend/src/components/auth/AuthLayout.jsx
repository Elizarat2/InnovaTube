import { Link } from 'react-router-dom';
import './AuthLayout.css';

const AuthLayout = ({ children, title, footerText, footerLink, footerLinkText }) => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">{title}</h1>
          <div className="auth-logo">
            <span>InnovaTube</span>
          </div>
        </div>
        
        <div className="auth-content">
          {children}
        </div>
        
        <div className="auth-footer">
          <p>{footerText} <Link to={footerLink} className="auth-link">{footerLinkText}</Link></p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;