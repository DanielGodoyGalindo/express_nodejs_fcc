import express from 'express';
const routerMatematicas = express.Router();
import { matematicas } from '../datos/cursos.js';

routerMatematicas.get('/', (req, res) => {
    res.send(JSON.stringify(matematicas)); // cursos matemáticas
});

routerMatematicas.get('/:tema', (req, res) => {
    const temaParam = req.params.tema; // obtener parametro 'tema'
    const resultado = matematicas.filter(curso => curso.tema === temaParam);
    if (resultado.length === 0)
        return res.status(404).send(`No existe el tema: ${temaParam}`);
    res.send(JSON.stringify(resultado));
});

// module.exports.routerMatematicas = routerMatematicas;
export { routerMatematicas };