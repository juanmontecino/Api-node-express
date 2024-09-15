const axios = require('axios')
const { request, response } = require('express')

const getEmpleados = (req = request, res = response) => {
  const { lastname = '' } = req.query
  console.log(lastname)
  const filtro = (lastname) ? `?lastname=${lastname}` : ''

  axios.get(`https://66e63b2317055714e5892b35.mockapi.io/api/v1/empleados/empleados${filtro}`)
    .then((response) => {
      const { data = [] } = response

      res.status(200).json({
        msg: 'Ok',
        data
      })
    })
    .catch((error) => {
      // handle error
      console.log(error)
      res.status(400).json({
        msg: 'Error',
        error
      })
    })
}

const getEmpleado = (req = request, res = response) => {
  const { idEmpleado = '' } = req.params
  console.log(idEmpleado)

  axios.get(`https://66c78f59732bf1b79fa6e8c7.mockapi.io/api/v1/empleados/${idEmpleado}`)
    .then((response) => {
      const { data } = response
      res.status(200).json({
        msg: 'Ok',
        data
      })
    })
    .catch((error) => {
      // handle error
      console.log(error)
      res.status(400).json({
        msg: 'Error',
        error
      })
    })
}

module.exports = {
  getEmpleados,
  getEmpleado
}
