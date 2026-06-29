import pool from '../config/db.js';

class IgService {
  constructor() {
    this.pool = pool;
  }
  async registerUser(userData) {
    const { nombre_completo, nombre_usuario, email, password, foto_perfil, biografia } = userData;

    const query = `
      INSERT INTO usuarios (nombre_completo, nombre_usuario, email, password, foto_perfil, biografia)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, nombre_completo, nombre_usuario, email, foto_perfil, biografia
    `;

    try {
      const result = await this.pool.query(query, [
        nombre_completo,
        nombre_usuario,
        email,
        password,
        foto_perfil || null,
        biografia || null
      ]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`Error al registrar usuario: ${error.message}`);
    }
  }

  async loginUser(email, password) {
    const query = `
      SELECT id, nombre_completo, nombre_usuario, email, foto_perfil, biografia
      FROM usuarios
      WHERE email = $1 AND password = $2
    `;

    try {
      const result = await this.pool.query(query, [email, password]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
  }

  async getUserById(id) {
    const query = `
      SELECT id, nombre_completo, nombre_usuario, email, foto_perfil, biografia
      FROM usuarios
      WHERE id = $1
    `;

    try {
      const result = await this.pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }

  async updateUser(id, userData) {
    const { nombre_completo, nombre_usuario, foto_perfil, biografia } = userData;

    const query = `
      UPDATE usuarios
      SET nombre_completo = COALESCE($2, nombre_completo),
          nombre_usuario = COALESCE($3, nombre_usuario),
          foto_perfil = COALESCE($4, foto_perfil),
          biografia = COALESCE($5, biografia)
      WHERE id = $1
      RETURNING id, nombre_completo, nombre_usuario, email, foto_perfil, biografia
    `;

    try {
      const result = await this.pool.query(query, [
        id,
        nombre_completo,
        nombre_usuario,
        foto_perfil,
        biografia
      ]);

      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }

  // ============ PUBLICACIONES ============

  async createPublicacion(publicacionData) {
    const { url_imagen, descripcion, usuario_id } = publicacionData;

    const query = `
      INSERT INTO publicaciones (url_imagen, descripcion, usuario_id, likes, fecha_creacion)
      VALUES ($1, $2, $3, 0, NOW())
      RETURNING id, url_imagen, descripcion, likes, fecha_creacion, usuario_id
    `;

    try {
      const result = await this.pool.query(query, [
        url_imagen,
        descripcion,
        usuario_id
      ]);

      return result.rows[0];
    } catch (error) {
      throw new Error(`Error al crear publicación: ${error.message}`);
    }
  }

  async getPublicacionesByUserId(usuario_id) {
    const query = `
      SELECT id, url_imagen, descripcion, likes, fecha_creacion, usuario_id
      FROM publicaciones
      WHERE usuario_id = $1
      ORDER BY fecha_creacion DESC
    `;

    try {
      const result = await this.pool.query(query, [usuario_id]);
      return result.rows;
    } catch (error) {
      throw new Error(`Error al obtener publicaciones: ${error.message}`);
    }
  }

  async getAllPublicaciones(limit = 20, offset = 0) {
    const query = `
      SELECT p.id, p.url_imagen, p.descripcion, p.likes, p.fecha_creacion, p.usuario_id,
             u.nombre_usuario, u.foto_perfil
      FROM publicaciones p
      JOIN usuarios u ON p.usuario_id = u.id
      ORDER BY p.fecha_creacion DESC
      LIMIT $1 OFFSET $2
    `;

    try {
      const result = await this.pool.query(query, [limit, offset]);
      return result.rows;
    } catch (error) {
      throw new Error(`Error al obtener publicaciones: ${error.message}`);
    }
  }

  async likePublicacion(publicacion_id) {
    const query = `
      UPDATE publicaciones
      SET likes = likes + 1
      WHERE id = $1
      RETURNING id, likes
    `;

    try {
      const result = await this.pool.query(query, [publicacion_id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Error al dar like: ${error.message}`);
    }
  }

  async deletePublicacion(id, usuario_id) {
    const query = `
      DELETE FROM publicaciones
      WHERE id = $1 AND usuario_id = $2
      RETURNING id
    `;

    try {
      const result = await this.pool.query(query, [id, usuario_id]);
      return result.rows[0] ? true : false;
    } catch (error) {
      throw new Error(`Error al eliminar publicación: ${error.message}`);
    }
  }
}

module.exports = IgRepository;


