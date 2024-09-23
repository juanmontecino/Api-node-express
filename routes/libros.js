const { Router } = require('express')
const { getLibros, getLibro } = require('../controllers/libros')

const rutas = Router()

rutas.get('/', getLibros)
rutas.get('/:idLibro', getLibro)

module.exports = rutas
