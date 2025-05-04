const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);