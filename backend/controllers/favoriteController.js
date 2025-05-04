const mongoose = require('mongoose');
const Video = require('../models/Video');
const User = require('../models/User');
const logger = require('../utils/logger');

// Helper para obtener detalles del video de YouTube
const getVideoDetails = async (videoId) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet',
        id: videoId,
        key: process.env.YOUTUBE_API_KEY
      }
    });
    return response.data.items[0]?.snippet;
  } catch (error) {
    logger.error('Error al obtener detalles del video:', error);
    return null;
  }
};

exports.toggleFavorite = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { videoId } = req.body;
    const userId = req.user.id;

    // Validación básica
    if (!videoId) {
      await session.abortTransaction();
      return res.status(400).json({ 
        success: false,
        message: 'Se requiere el ID del video'
      });
    }

    // 1. Buscar o crear el video
    let video = await Video.findOne({ videoId }).session(session);
    if (!video) {
      const videoDetails = await getVideoDetails(videoId);
      
      video = new Video({
        videoId,
        title: videoDetails?.title || `Video ${videoId}`,
        thumbnail: videoDetails?.thumbnails?.medium?.url || '',
        channel: videoDetails?.channelTitle || 'Canal desconocido'
      });
      
      await video.save({ session });
    }

    // 2. Actualizar favoritos del usuario
    const user = await User.findById(userId).session(session);
    const favoriteIndex = user.favorites.findIndex(fav => fav.equals(video._id));
    
    if (favoriteIndex === -1) {
      user.favorites.push(video._id);
    } else {
      user.favorites.splice(favoriteIndex, 1);
    }

    await user.save({ session });
    await session.commitTransaction();

    // 3. Obtener lista actualizada de favoritos
    const updatedUser = await User.findById(userId)
      .populate('favorites', 'videoId title thumbnail channel')
      .select('favorites');

    res.status(200).json({
      success: true,
      action: favoriteIndex === -1 ? 'added' : 'removed',
      favorites: updatedUser.favorites
    });

  } catch (error) {
    await session.abortTransaction();
    logger.error('Error en toggleFavorite:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

// Obtener todos los favoritos
exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favorites', 'videoId title thumbnail channel')
      .select('favorites');

    res.status(200).json({
      success: true,
      count: user.favorites.length,
      data: user.favorites
    });
  } catch (error) {
    logger.error('Error al obtener favoritos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener favoritos'
    });
  }
};