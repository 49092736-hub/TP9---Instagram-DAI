    // src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Conexión a la Base de Datos (Pool de pg)
const pool = require('./config/db.js');

// 2. Importar Capas (Inyección de dependencias)
const IgService = require('./services/ig-services.js');
const IgController = require('./controllers/ig-controller.js');

// 3. Importar Router y Middlewares
const { requireAuth, validateRegister, validateLogin, validateCreatePublicacion } = require('./middlewares/ig-middlewares.js');

const app = express();

// 4. Middlewares Globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (Configurado de forma nativa e integrada con la librería cors instalada)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// 5. Inicializar la Lógica por Capas (Pasando el Pool al Servicio, y el Servicio al Controlador)
const igService = new IgService(pool);
const igController = new IgController(igService);

// ============================================
// 6. REGISTRO DE RUTAS (API REST)
// ============================================

// --- Rutas Públicas ---
app.post('/api/auth/register', validateRegister, (req, res) => igController.register(req, res));
app.post('/api/auth/login', validateLogin, (req, res) => igController.login(req, res));
app.get('/api/publicaciones', (req, res) => igController.getFeed(req, res));

// --- Rutas Protegidas (Requieren pasar requireAuth) ---
app.get('/api/usuarios/perfil', requireAuth, (req, res) => igController.getProfile(req, res));
app.put('/api/usuarios/perfil', requireAuth, (req, res) => igController.updateProfile(req, res));
app.post('/api/publicaciones', requireAuth, validateCreatePublicacion, (req, res) => igController.createPost(req, res));


// --- Diagnóstico del Servidor ---
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Instagram Cat Backend está funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// --- Manejo de rutas no encontradas (404) ---
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// --- Manejo de errores general (500) ---
app.use((err, req, res, next) => {
  console.error(' Error detectado en el servidor:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;