const express = require('express');
const mongoose = require('mongoose');
const { registerUser, findUserByCredentials } = require('./userController');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Para servir tus archivos HTML/JS/CSS

// Conectar a MongoDB
connectDB();

// Rutas de API
app.post('/api/auth/register', async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await findUserByCredentials(username, password);
        
        // En producción, nunca devuelvas la contraseña
        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        };
        
        res.json(userData);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});