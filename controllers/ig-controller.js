const { StatusCodes } = require('http-status-codes');

class IgController {
  constructor(IgService) {
    this.IgService = IgService;
  }

  // ============ AUTENTICACIÓN ============

  // Login de Usuario
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await this.IgService.loginUser(email, password);
      
      return res.status(StatusCodes.OK).json({ 
        success: true, 
        data: result 
      });
    } catch (error) {
      console.error('Error en controlador login:', error);
      
      const status = error.message && error.message.toLowerCase().includes('credenciales') 
        ? StatusCodes.UNAUTHORIZED 
        : StatusCodes.INTERNAL_SERVER_ERROR;

      return res.status(status).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  // Registrar nuevo usuario
  async register(req, res) {
    try {
      const userData = req.body;
      const newUser = await this.IgService.registerUser(userData);

      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: newUser
      });
    } catch (error) {
      console.error('Error en controlador register:', error);
      
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message
      });
    }
  }

  // ============ PERFIL ============

  // Obtener perfil del usuario autenticado
  async getProfile(req, res) {
    try {
      const userId = req.user.id;

      const usuario = await this.IgService.getUserById(userId);

      if (!usuario) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      const publicaciones = await this.IgService.getPublicacionesByUserId(userId);

      return res.status(StatusCodes.OK).json({
        success: true,
        data: {
          usuario,
          publicaciones,
          totalPublicaciones: publicaciones.length,
          totalLikes: publicaciones.reduce((sum, pub) => sum + pub.likes, 0)
        }
      });
    } catch (error) {
      console.error('Error en getProfile:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  }

  // Actualizar perfil del usuario autenticado
  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const updateData = req.body;

      const usuarioActualizado = await this.IgService.updateUser(userId, updateData);

      if (!usuarioActualizado) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      return res.status(StatusCodes.OK).json({
        success: true,
        message: 'Perfil actualizado exitosamente',
        data: usuarioActualizado
      });
    } catch (error) {
      console.error('Error en updateProfile:', error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message
      });
    }
  }

  // ============ PUBLICACIONES ============

  // Crear nueva publicación
  async createPost(req, res) {
    try {
      const { url_imagen, descripcion } = req.body;
      const usuario_id = req.user.id;

      const publicacion = await this.IgService.createPublicacion({
        url_imagen,
        descripcion,
        usuario_id
      });

      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Publicación creada exitosamente',
        data: publicacion
      });
    } catch (error) {
      console.error('Error en createPost:', error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: error.message
      });
    }
  }

  // Obtener feed (todas las publicaciones)
  async getFeed(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;

      const publicaciones = await this.IgService.getAllPublicaciones(limit, offset);

      return res.status(StatusCodes.OK).json({
        success: true,
        data: {
          publicaciones,
          page,
          limit,
          total: publicaciones.length
        }
      });
    } catch (error) {
      console.error('Error en getFeed:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  }
}

// Exportación en formato CommonJS para mantener consistencia con los middlewares
module.exports = IgController;