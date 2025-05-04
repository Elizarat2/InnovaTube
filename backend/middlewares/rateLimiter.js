const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // Límite de peticiones
  message: 'Demasiados intentos desde esta IP, intenta de nuevo en 15 minutos'
});

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 1000
});

module.exports = { authLimiter, apiLimiter };