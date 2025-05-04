const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validateRecaptcha } = require('../middlewares/recaptcha');
const ApiResponse = require('../utils/apiResponse');

// Registro de usuario con reCAPTCHA
exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password, recaptchaToken } = req.body;

    // Validar reCAPTCHA
    await validateRecaptcha(recaptchaToken);

    // Verificar usuario existente
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json(new ApiResponse(null, 'El usuario ya existe', false));
    }

    // Crear usuario
    const user = new User({ name, username, email, password });
    await user.save();

    // Generar JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
      expiresIn: process.env.JWT_EXPIRE 
    });

    res.status(201).json(new ApiResponse({ token }, 'Usuario registrado exitosamente'));
  } catch (error) {
    next(error);
  }
};

// Login de usuario
exports.login = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json(new ApiResponse(null, 'Credenciales inválidas', false));
    }

    // Generar JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    res.json(new ApiResponse({ token }, 'Inicio de sesión exitoso'));
  } catch (error) {
    next(error);
  }
};