const { Router } = require ('express')
const {getCanciones, getCancion} = require('../controllers/canciones')

const rutas = Router()

rutas.get('/', getCanciones) ///canciones?genero=pop ejemplo para buscar
rutas.get('/:cantidad', getCancion) //canciones/10 para buscar 10 canciones del genero pop
module.exports = rutas