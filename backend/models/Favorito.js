const mongoose = require('mongoose');

const FavoritoSchema = new mongoose.Schema({
  usuarioId: {
    type: String,
    required: true
  },
  videoId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  fechaGuardado: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Favorito', FavoritoSchema);
