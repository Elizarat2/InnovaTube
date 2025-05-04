

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: formData.email,
      password: formData.password,
      captchaToken: captcha
    });
    
    // Almacenar token y datos de usuario
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    
    // Redirigir y recargar datos de la app
    navigate('/');
    window.location.reload(); // Para actualizar el estado de autenticación
    
  } catch (err) {
    setErrors({
      general: err.response?.data?.message || 'Error al iniciar sesión'
    });
  }
};