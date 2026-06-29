export class IgController {
  constructor(IgService) {
    this.IgService = IgService;
  }

   async login(req, res) {
    try {
      const { email, password } = req.body || {};

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email y contraseña son requeridos' });
      }

      const result = await this.IgService.loginUser(email, password);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      const status = error.message && error.message.toLowerCase().includes('credenciales') ? 401 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  }

    // Registrar nuevo paciente
  async register(req, res) {
    try {
      const userData = req.body;
      const newUser = await this.IgService.registerUser(userData);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: newUser
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

}