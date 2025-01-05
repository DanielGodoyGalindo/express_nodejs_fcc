import express from 'express';
const routerProgramacion = express.Router();
import { programacion } from '../datos/cursos.js';

// Middleware:
// las funciones middleware se ejecutan despues de recibir una solicitud y antes
// de enviar una respuesta. Tienen acceso al objeto de la solicitud, al objeto de la
// respuesta y a next(), que es una funcion que se llama para ejecutar el próximo middleware.
routerProgramacion.use(express.json());

// Si usamos routing sin router se configuraría así
/* app.get('/api/cursos/programacion', (req, res) => {
    res.send(JSON.stringify(programacion)); // cursos programación
}); */

// Usando un router en el que se define la ruta '/api/cursos/programacion' se hace así:
routerProgramacion.get('/', (req, res) => {
    // res.send(JSON.stringify(programacion)); // cursos programación
    res.json(programacion); // el método json() envia directamente una respuesta en formato json
});

// Parámetro url (Se usa para generar una url dinámica)
// Parametro query (se pasan por la url como ?ordenar=campo)
routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguajeParam = req.params.lenguaje; // obtener parametro url
    let resultado = programacion.filter(curso => curso.lenguaje === lenguajeParam);
    if (resultado.length === 0) // cero resultados
        return res.status(404).send(`No se han encontrado resultados para el lenguaje: ${lenguajeParam}`);
    if (req.query.ordenar === 'vistas') { // ordenar si hay parametro query (?ordenar=vistas)
        return res.send(JSON.stringify(resultado.sort((a, b) => b.vistas - a.vistas)));
    }
    // res.send(JSON.stringify(resultado)); // mostrar resultado
    res.json(resultado); // mostrar resultado

});

// Dos parámetros url
routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguajeParam = req.params.lenguaje;
    const nivelParam = req.params.nivel;
    const resultado = programacion.filter(curso => curso.lenguaje === lenguajeParam && curso.nivel === nivelParam);
    return resultado.length === 0
        ? res.status(404).send(`Curso de ${lenguajeParam} y nivel ${nivelParam} no localizado.`)
        : res.send(JSON.stringify(resultado));
});

// Método post para agregar nuevos cursos en formato json
routerProgramacion.post('/', (req, res) => {
    let cursoNuevo = req.body; // extraer del cuerpo de la solicitud
    programacion.push(cursoNuevo);
    res.send(JSON.stringify(programacion));
});

// Método put para actualizar un curso (se pasa su id en la url como parámetro)
routerProgramacion.put('/:id', (req, res) => {
    const cursoAModificar = req.body; // obtener curso nuevo
    const idParametro = req.params.id; // obtener id del curso
    const indice = programacion.findIndex(curso => curso.id == idParametro); // obtener indice del curso
    if (indice != -1) // si se ha encontrado
        programacion[indice] = cursoAModificar; // reemplazar curso
    res.send(JSON.stringify(programacion)); // mostrar listado json de cursos
});

// Método patch (sólo actualiza pares clave-valor que se indiquen, no todo el curso completo como hace put)
routerProgramacion.patch('/:id', (req, res) => {
    const infoActualizada = req.body; // obtener propiedades a actualizar
    const idParametro = req.params.id; // id pasado como parametro
    const indice = programacion.findIndex(curso => curso.id == idParametro); // indice del curso
    if (indice != -1) { // se ha encontrado el curso
        const cursoAModificar = programacion[indice];
        // Copiar todas las propiedades de un objeto a otro (y reemplazar si ya existen)
        Object.assign(cursoAModificar, infoActualizada);
    }
    res.send(JSON.stringify(programacion));
});

// Método delete
routerProgramacion.delete('/:id', (req, res) => {
    const idParametro = req.params.id; // obtener id del curso a eliminar
    const indice = programacion.findIndex(curso => curso.id == idParametro); // indice del curso
    if (indice != -1) // si existe el curso
        programacion.splice(indice, 1); // eliminar curso
    res.send(JSON.stringify(programacion));
});

export { routerProgramacion };