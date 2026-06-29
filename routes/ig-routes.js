
import express from 'express';

export const createPatientRoutes = (igController) => {
const router = express.Router();

const { requireAuth, validateRegister, validateLogin, validateCreatePublicacion } = require('./middlewares/ig-middlewares');
const igController = require('./controllers/ig-controller');

// Ruta PÚBLICA de registro
app.post('/registro', validateRegister, igController.register);

// Ruta PÚBLICA de login
app.post('/login', validateLogin, igController.login);

// Ruta PROTEGIDA - crear publicación (requiere auth + validación)
app.post('/publicaciones', requireAuth, validateCreatePublicacion, igController.createPublicacion);

// Ruta PROTEGIDA - obtener mis publicaciones
app.get('/mis-publicaciones', requireAuth, igController.getMyPublicaciones);
  }