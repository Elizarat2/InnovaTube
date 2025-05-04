const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { toggleFavorite, getFavorites } = require('../controllers/favoriteController');
const { searchVideos } = require('../controllers/videoController');

// Buscar videos
router.get('/search', protect, searchVideos);

// Gestión de favoritos
router.post('/favorites/toggle', protect, toggleFavorite);
router.get('/favorites', protect, getFavorites);

module.exports = router;