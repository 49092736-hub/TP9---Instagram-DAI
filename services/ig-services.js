import jwt from 'jsonwebtoken';


export class IgService {
  constructor(IgRepository) {
    this.IgRepository = IgRepository;
  }

    async registerUser(userData) {
    
    const validation = validateUserData(userData);
    if (!validation.isValid) {
      throw new Error(`Errores de validación: ${validation.errors.join(', ')}`);
    }

    // Verificar si el email ya existe
    const existingUser = await this.IgRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const createPayload = {
      email: userData.email,
      password: userData.password,
      nombre: userData.nombre_completo.split(' ')[0],
      apellido: userData.nombre_completo.split(' ')[1],
      foto_perfil: userData.foto_perfil,
      usuario: userData.nombre_usuario,
      biografia: userData.biografia
    };

    }

    async loginUser(email, password) {
    const user = await this.IgRepository.loginUser(email, password);
    if (!user) {
        throw new Error('Credenciales inválidas');
    }   
    return user;
    }

}