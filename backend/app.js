const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { apiLimiter } = require('./middlewares/rateLimiter');
const errorHandler = require('./utils/errorHandler');

const app = express();

// Middlewares de seguridad
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Rate limiting para API
app.use('/api', apiLimiter);

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/videos', require('./routes/videos'));

// Manejo de errores
app.use(errorHandler);

module.exports = app;