const mongoose = require('mongoose');
const User = require('../models/User');
const Video = require('../models/Video');
const logger = require('../logs/logger');
const { faker } = require('@faker-js/faker');

const seedDatabase = async () => {
  try {
    // Limpiar base de datos
    await User.deleteMany();
    await Video.deleteMany();

    // Crear usuario admin
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@innovatube.com',
      username: 'admin',
      password: 'Admin123',
      passwordConfirm: 'Admin123',
      role: 'admin'
    });

    // Crear usuarios de prueba
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: 'Password123',
        passwordConfirm: 'Password123'
      });
    }
    await User.insertMany(users);

    logger.info('Database seeded successfully');
  } catch (err) {
    logger.error('Error seeding database:', err);
  } finally {
    mongoose.disconnect();
  }
};

module.exports = seedDatabase;