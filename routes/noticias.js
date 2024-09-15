const { Router } = require('express')
const { getNoticias, getNoticia } = require('../controllers/noticias')

const rutas = Router()

rutas.get('/', getNoticias)
rutas.get('/:cantidad', getNoticia)


module.exports = rutas
