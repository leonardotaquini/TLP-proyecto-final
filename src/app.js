import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './config/db.js';
import profesionalRoutes from './routes/profesional.routes.js';
import oficio from './routes/oficio.routes.js';

//Instancia de express
const app = express();

const PORT = process.env.PORT || 3000;

//Configuración de bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Configuración de cors
app.use(cors());

//Conexion a la db
connectDB();

//Configuración de rutas
app.use('/api/profesionales', profesionalRoutes);
app.use('/api/oficios', oficio);

//Levanto el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});