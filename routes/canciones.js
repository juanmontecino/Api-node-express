const { Router } = require ('express')
const {getCanciones} = require('../controllers/canciones')

const rutas = Router()

rutas.get('/', getCanciones) ///canciones?genero=pop ejemplo para buscar
module.exports = rutas