const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, password, captchaToken } = req.body;
  
  // 1. Validar ReCaptcha (opcional pero recomendado)
  if (!captchaToken) {
    return res.status(400).json({ message: 'Token ReCaptcha inválido' });
  }

  try {
    // 2. Verificar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // 3. Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // 4. Crear token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 5. Responder con token y datos básicos del usuario
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username
      }
    });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};