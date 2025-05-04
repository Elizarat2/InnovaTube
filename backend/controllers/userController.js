const User = require('./userModel');

const registerUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const findUserByCredentials = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    // Aquí deberías comparar contraseñas hasheadas en producción
    if (user.password !== password) {
      throw new Error('Contraseña incorrecta');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
  findUserByCredentials
};