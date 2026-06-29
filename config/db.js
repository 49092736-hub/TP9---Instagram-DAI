const path = require('path');
// Esto busca el archivo .env en la raíz real del proyecto, sin importar desde dónde corras el comando
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });  
  const { Pool } = require('pg');
  // RESTRICCIÓN DE PRUEBA:
console.log("=== CONTROL DE VARIABLES ===");
console.log("¿Detecta PGUSER?:", process.env.PGUSER);
console.log("¿Detecta PGPASSWORD?:", process.env.PGPASSWORD);
console.log("============================");

  const pool = new Pool({
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT) || 5432,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'TP9'
  });

  // Verificar conexión
  pool.on('error', (err) => {
    console.error('Error en el pool de PostgreSQL:', err);
  });

  module.exports = pool;

