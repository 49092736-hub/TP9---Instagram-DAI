const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { StatusCodes } = require('http-status-codes');

// ============================================
// MIDDLEWARE 1: AUTENTICACIÓN JWT
// ============================================
// Propósito: Intercepta solicitudes a rutas protegidas, valida el token JWT
// y adjunta los datos del usuario al request para que los controladores
// puedan acceder a req.user.id sin volver a consultarlo.
// ============================================

const requireAuth = async (req, res, next) => {
  try {
    // 1. Leer header Authorization
    const authHeader = req.headers.authorization;
    
    // 2. Validar que existe el header y sigue formato "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Token no proporcionado. Use formato: Authorization: Bearer <token>'
      });
    }

    // 3. Extraer el token (remover "Bearer " y espacios)
    const token = authHeader.slice(7).trim();

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Token vacío o inválido'
      });
    }

    // 4. Verificar firma del token con JWT_SECRET
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: 'Token expirado'
        });
      }
      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: 'Token inválido'
        });
      }
      throw jwtError;
    }

    // 5. Consultar la BD para obtener datos completos del usuario
    // (No confiamos solo en el token; verificamos que el usuario aún existe)
    const resultado = await pool.query(
      'SELECT id, nombre_completo, nombre_usuario, email, foto_perfil, biografia FROM usuarios WHERE id = $1',
      [decoded.id]
    );

    if (resultado.rows.length === 0) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // 6. Adjuntar datos del usuario al request
    req.user = resultado.rows[0];
    
    // 7. Permitir que la solicitud continúe al siguiente middleware/controlador
    next();

  } catch (err) {
    console.error('Error en authMiddleware:', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error al validar autenticación'
    });
  }
};

// ============================================
// MIDDLEWARE 2: VALIDACIÓN DE DATOS
// ============================================
// Propósito: Validar que los datos enviados en el body cumplen
// con los requisitos antes de ejecutar lógica en la BD.
// Cada validador es específico para una operación.
// ============================================

// Validador para REGISTRO de usuario
const validateRegister = (req, res, next) => {
  try {
    const { nombre_completo, nombre_usuario, email, password, foto_perfil, biografia } = req.body;

    // 1. Validar campos obligatorios
    if (!nombre_completo || !nombre_completo.trim()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Campo requerido: nombre_completo'
      });
    }

    if (!nombre_usuario || !nombre_usuario.trim()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Campo requerido: nombre_usuario'
      });
    }

    if (!email || !email.trim()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Campo requerido: email'
      });
    }

    if (!password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Campo requerido: password'
      });
    }

    // 3. Validar longitud mínima de contraseña
    if (password.length < 6) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
    }

    // 6. Validar campos opcionales (foto_perfil debe ser una URL válida si se envía)
    if (foto_perfil && foto_perfil.trim()) {
      try {
        new URL(foto_perfil);
      } catch (_) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'foto_perfil debe ser una URL válida'
        });
      }
    }

    // Si todas las validaciones pasaron, continuar
    next();

  } catch (err) {
    console.error('Error en validateRegister:', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error en validación de datos'
    });
  }
};

// Validador para LOGIN
const validateLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validar que ambos campos existan
    if (!email || !email.trim()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Campo requerido: email'
      });
    }

    if (!password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Campo requerido: password'
      });
    }

    // 2. Validar formato básico del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Email inválido'
      });
    }

    // 3. Validar que la contraseña no esté vacía
    if (password.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Contraseña requerida'
      });
    }

    next();

  } catch (err) {
    console.error('Error en validateLogin:', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error en validación de datos'
    });
  }
};

// Validador para CREAR PUBLICACIÓN
const validateCreatePublicacion = (req, res, next) => {
  try {
    const { url_imagen, descripcion } = req.body;

    // 1. Validar campos obligatorios
    if (!url_imagen || !url_imagen.trim()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Campo requerido: url_imagen'
      });
    }

    if (!descripcion || !descripcion.trim()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Campo requerido: descripcion'
      });
    }

    // 2. Validar que url_imagen es una URL válida
    try {
      new URL(url_imagen);
    } catch (_) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'url_imagen debe ser una URL válida'
      });
    }

    // 3. Validar longitud mínima de descripción
    if (descripcion.trim().length < 5) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'La descripción debe tener al menos 5 caracteres'
      });
    }

    // 4. Validar longitud máxima de descripción
    if (descripcion.length > 2000) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'La descripción no puede exceder 2000 caracteres'
      });
    }

    next();

  } catch (err) {
    console.error('Error en validateCreatePublicacion:', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error en validación de datos'
    });
  }
};

// ============================================
// EXPORTAR MIDDLEWARES
// ============================================

module.exports = {
  // Autenticación
  requireAuth,

  // Validación de datos
  validateRegister,
  validateLogin,
  validateCreatePublicacion
};
