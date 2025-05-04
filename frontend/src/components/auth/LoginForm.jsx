import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from './AuthLayout';
import './AuthForms.css';

const LoginForm = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      emailOrUsername: '',
      password: ''
    },
    validationSchema: Yup.object({
      emailOrUsername: Yup.string().required('Campo requerido'),
      password: Yup.string().required('Campo requerido')
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError('');
        await login(values);
      } catch (err) {
        setError(err.message || 'Error al iniciar sesión');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <AuthLayout
      title="Iniciar Sesión"
      footerText="¿No tienes una cuenta?"
      footerLink="/register"
      footerLinkText="Regístrate"
    >
      <form onSubmit={formik.handleSubmit} className="auth-form">
        {error && <div className="auth-error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="emailOrUsername">Email o Usuario</label>
          <input
            id="emailOrUsername"
            name="emailOrUsername"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.emailOrUsername}
          />
          {formik.touched.emailOrUsername && formik.errors.emailOrUsername ? (
            <div className="form-error">{formik.errors.emailOrUsername}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="form-error">{formik.errors.password}</div>
          ) : null}
        </div>

        <button 
          type="submit" 
          className="auth-button"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>

        <div className="auth-extra">
          <Link to="/forgot-password" className="auth-link">¿Olvidaste tu contraseña?</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;