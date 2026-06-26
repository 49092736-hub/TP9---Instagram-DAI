require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { StatusCodes } = require('http-status-codes');
const pool = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API TP9 en funcionamiento' });
});

app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.status(StatusCodes.OK).json(result.rows);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
