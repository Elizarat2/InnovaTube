import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from './AuthLayout';
import './AuthForms.css';

const RegisterForm = () => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Campo requerido'),
      username: Yup.string()
        .required('Campo requerido')
        .min(3, 'Mínimo 3 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guiones bajos'),
      email: Yup.string()
        .email('Email inválido')
        .required('Campo requerido'),
      password: Yup.string()
        .required('Campo requerido')
        .min(6, 'Mínimo 6 caracteres'),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
        .required('Campo requerido')
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError('');
        await register(values);
      } catch (err) {
        setError(err.message || 'Error al registrar usuario');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <AuthLayout
      title="Crear Cuenta"
      footerText="¿Ya tienes una cuenta?"
      footerLink="/login"
      footerLinkText="Inicia Sesión"
    >
      <form onSubmit={formik.handleSubmit} className="auth-form">
        {error && <div className="auth-error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="name">Nombre Completo</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="form-error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="form-error">{formik.errors.username}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="form-error">{formik.errors.email}</div>
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

        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirmar Contraseña</label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirm}
          />
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
            <div className="form-error">{formik.errors.passwordConfirm}</div>
          ) : null}
        </div>

        <button 
          type="submit" 
          className="auth-button"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default RegisterForm;