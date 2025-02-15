import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './config.js';
import pruebita from './routes/prueba.routes.js'
import { connectDB } from './db.js';

const app = express();

app.use(morgan('dev'));

// Middleware para manejar JSON
app.use(express.json());

app.use(cors()); // Esto permite todas las solicitudes desde cualquier origen

connectDB();

app.use(pruebita)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });