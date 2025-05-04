const mongoose = require('mongoose');
const logger = require('../utils/logger');
// Asegúrate que este código se ejecute al iniciar tu servidor
require('./db')(); // Esto conectará a MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    logger.info('✅ MongoDB conectado correctamente');
    
    // Verificar conexión
    const db = mongoose.connection;
    db.on('error', (error) => logger.error('Error de conexión:', error));
    db.once('open', () => logger.info('📊 Conexión a MongoDB establecida'));
    
  } catch (err) {
    logger.error('❌ Error al conectar a MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;