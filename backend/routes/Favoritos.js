const express = require('express');
const router = express.Router();
const Favorito = require('../models/Favorito');

// POST /api/favoritos
router.post('/', async (req, res) => {
  try {
    const { usuarioId, videoId, title, thumbnail } = req.body;

    // Validar si ya existe
    const yaExiste = await Favorito.findOne({ usuarioId, videoId });
    if (yaExiste) {
      return res.status(400).json({ mensaje: 'Este video ya está en favoritos' });
    }

    const nuevoFavorito = new Favorito({ usuarioId, videoId, title, thumbnail });
    await nuevoFavorito.save();

    res.status(201).json({ mensaje: 'Video guardado en favoritos', favorito: nuevoFavorito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al guardar el favorito' });
  }
});

module.exports = router;
