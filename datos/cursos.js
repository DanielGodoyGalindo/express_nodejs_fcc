let infoCursos = {
    'programacion': [
        {
            id: 1,
            titulo: 'Aprende Python',
            lenguaje: 'python',
            vistas: 15000,
            nivel: 'basico'
        },
        {
            id: 2,
            titulo: 'Python intermedio',
            lenguaje: 'python',
            vistas: 18200,
            nivel: 'intermedio'
        },
        {
            id: 3,
            titulo: 'Aprende JavaScript',
            lenguaje: 'javascript',
            vistas: 102200,
            nivel: 'basico'
        }
    ],
    'matematicas': [
        {
            id: 1,
            titulo: 'Aprende Calculo',
            tema: 'calculo',
            vistas: 12400,
            nivel: 'basico'
        }, {
            id: 2,
            titulo: 'Aprende Algebra',
            tema: 'algebra',
            vistas: 15700,
            nivel: 'basico'
        }
    ]
}

// Exportación: podemos exportar todo el objeto infoCursos o sólo las propiedades que queramos
// En este caso exporto todo el objeto y además cada una de sus propiedades. De esta manera
// puedo importar en los routers de matematicas y de programación sólo los cursos de cada materia
const matematicas = infoCursos;
const programacion = infoCursos.programacion;
export { matematicas, programacion, infoCursos };