require('dotenv').config();
const app = require('./app'); // Importa configuración de Express desde la raíz

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
  console.log(`🚀 Clon Instagram Gatos - Backend escuchando en http://${HOST}:${PORT}`);
});