const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new ApiError(401, 'Acceso no autorizado - Token requerido');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    next(new ApiError(401, 'Acceso no autorizado - Token inválido'));
  }
};

module.exports = auth;