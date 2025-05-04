const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

// Configuración CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1000,
  message: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde'
});

const securityMiddleware = (app) => {
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(apiLimiter);
  app.use(hpp());
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
};

module.exports = securityMiddleware;