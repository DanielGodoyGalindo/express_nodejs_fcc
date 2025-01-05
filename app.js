import express from 'express';
import { infoCursos } from './cursos.js';
const app = express();

// Routers (se usan para definir un path que será utilizado más de una vez en el routing)
// se genera un nuevo router y se le asigna una ruta. Despues se usará el router para no tener que
// escribir la misma ruta en cada path del routing (evitamos escribir '/api/cursos/programacion' en cada 
// configuración routing)
const routerProgramacion = express.Router();
app.use('/api/cursos/programacion', routerProgramacion);

// Routing
app.get('/', (req, res) => {
    res.send('Mi primer servidor con Express y Node.js');
});

app.get('/api/cursos', (req, res) => {
    res.send(infoCursos); // mostrar todos los cursos
});

// Si usamos routing sin router se configuraría así
/* app.get('/api/cursos/programacion', (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion)); // cursos programación
}); */

// Usando un router en el que se define la ruta '/api/cursos/programacion' se hace así:
routerProgramacion.get('/', (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion)); // cursos programación
});

// Parámetro url (Se usa para generar una url dinámica)
// Parametro query (se pasan por la url como ?ordenar=campo)
app.get('/api/cursos/programacion/:lenguaje', (req, res) => {
    const lenguajeParam = req.params.lenguaje; // obtener parametro url
    let resultado = infoCursos.programacion.filter(curso => curso.lenguaje === lenguajeParam);
    if (resultado.length === 0) // cero resultados
        return res.status(404).send(`No se han encontrado resultados para el lenguaje: ${lenguajeParam}`);
    if (req.query.ordenar === 'vistas') { // ordenar si hay parametro query (?ordenar=vistas)
        return res.send(JSON.stringify(resultado.sort((a, b) => b.vistas - a.vistas)));
    }
    res.send(JSON.stringify(resultado)); // mostrar resultado
});

// Dos parámetros url
app.get('/api/cursos/programacion/:lenguaje/:nivel', (req, res) => {
    const lenguajeParam = req.params.lenguaje;
    const nivelParam = req.params.nivel;
    const resultado = infoCursos.programacion.filter(curso => curso.lenguaje === lenguajeParam && curso.nivel === nivelParam);
    return resultado.length === 0
        ? res.status(404).send(`Curso de ${lenguajeParam} y nivel ${nivelParam} no localizado.`)
        : res.send(JSON.stringify(resultado));
});

app.get('/api/cursos/matematicas', (req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas)); // cursos matemáticas
});

app.get('/api/cursos/matematicas/:tema', (req, res) => {
    const temaParam = req.params.tema; // obtener parametro 'tema'
    const resultado = infoCursos.matematicas.filter(curso => curso.tema === temaParam);
    if (resultado.length === 0)
        return res.status(404).send(`No existe el tema: ${temaParam}`);
    res.send(JSON.stringify(resultado));
});

// Escuchar
const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});