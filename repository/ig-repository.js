export class IgRepository{
    constructor(database) {
        this.db=database;
    }

    async register(userData) {
    // Insertar en tabla `usuarios` y luego en `perfiles_paciente` (si aplica)
    const { nombre_completo, nombre_usuario, email, password, foto_perfil, biografia} = userData;

    // Crear usuario
    const { data: userData, error: userError } = await this.db
      .from('usuarios')
      .insert({
        email: email,
        password: password,
        usuario: nombre_usuario,
        nombre: nombre_completo.split(' ')[0],
        email: email,
        foto_perfil: foto_perfil,
        biografia: biografia
      })
      .select(' id, nombre, apellido, mail, password, foto_perfil, biografia')
      .single();

    if (userError) {
      throw new Error(`Error al crear usuario: ${userError.message}`);
    }

  }

  async loginUser(email, password) {
    const normalized = (email || '').toString().trim().toLowerCase();
    if (!normalized) return null;

    const { data, error } = await this.db
      .from('usuarios')
      .select('id, email, password')
      .maybeSingle();

    if (error) {
      throw new Error(`Error al iniciar sesión: ${error.message}`);
    }

    return data || null;
  }
}


