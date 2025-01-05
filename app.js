import express from 'express';
import { infoCursos } from './datos/cursos.js';
import { routerMatematicas } from './routers/matematicas.js';
import { routerProgramacion } from './routers/programacion.js';

const app = express(); // crear aplicacion express

// Routers (se usan para definir un path que será utilizado más de una vez en el routing)
// se genera un nuevo router y se le asigna una ruta. Despues se usará el router para no tener que
// escribir la misma ruta en cada path del routing (evitamos escribir '/api/cursos/programacion' en cada 
// configuración routing)
app.use('/api/cursos/programacion', routerProgramacion);
app.use('/api/cursos/matematicas', routerMatematicas);

// Routing
app.get('/', (req, res) => {
    res.send('Mi primer servidor con Express y Node.js');
});
app.get('/api/cursos', (req, res) => {
    res.send(infoCursos); // mostrar todos los cursos
});

// Escuchar
const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});