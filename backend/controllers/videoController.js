const Video = require('../models/Video');
const ApiResponse = require('../utils/apiResponse');
const axios = require('axios');
const logger = require('../utils/logger');

class VideoController {
  // Buscar videos en YouTube
  async searchVideos(req, res, next) {
    try {
      const { q: query, pageToken = '' } = req.query;
      
      if (!query) {
        throw new ApiError(400, 'El parámetro de búsqueda es requerido');
      }

      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: query,
          type: 'video',
          pageToken,
          key: process.env.YOUTUBE_API_KEY
        }
      });

      const videos = response.data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt
      }));

      res.json(new ApiResponse({
        videos,
        nextPageToken: response.data.nextPageToken,
        prevPageToken: response.data.prevPageToken
      }));
    } catch (error) {
      logger.error('Error en búsqueda de videos:', error);
      next(error);
    }
  }

  // Agregar a favoritos
  async addFavorite(req, res, next) {
    try {
      const { videoId } = req.body;
      const userId = req.user.id;

      // Obtener detalles del video de YouTube
      const videoDetails = await this.getVideoDetails(videoId);

      const existingVideo = await Video.findOne({ videoId, user: userId });
      if (existingVideo) {
        throw new ApiError(400, 'Este video ya está en tus favoritos');
      }

      const video = await Video.create({
        ...videoDetails,
        user: userId
      });

      res.status(201).json(new ApiResponse(video, 'Video agregado a favoritos'));
    } catch (error) {
      next(error);
    }
  }

  // Helper para obtener detalles del video
  async getVideoDetails(videoId) {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet',
        id: videoId,
        key: process.env.YOUTUBE_API_KEY
      }
    });

    if (!response.data.items.length) {
      throw new ApiError(404, 'Video no encontrado');
    }

    const item = response.data.items[0];
    return {
      videoId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt
    };
  }
}

module.exports = new VideoController();

// Agregar a favoritos
exports.addFavorite = async (req, res, next) => {
  try {
    const { videoId, title, thumbnail } = req.body;
    
    const existingVideo = await Video.findOne({ 
      videoId, 
      user: req.user.id 
    });

    if (existingVideo) {
      return res.status(400).json(
        new ApiResponse(null, 'El video ya está en favoritos', false)
      );
    }

    const video = await Video.create({
      videoId,
      title,
      thumbnail,
      user: req.user.id
    });

    res.status(201).json(new ApiResponse(video));
  } catch (error) {
    next(error);
  }
};