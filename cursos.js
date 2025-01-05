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
            vistas: 13200,
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

const _infoCursos = infoCursos;
export { _infoCursos as infoCursos };