const axios = require('axios')
const { request, response } = require('express')

const getLibros = (req = request, res = response) => {
    const query = req.query.q

    // url obteniendo hasta 40 resultados
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`)
    .then((response) => {
      const { items = [] } = response.data; 
      
      //selecciona 10 libros de forma aleatoria
      const librosRandom = items.sort(() => 0.5 - Math.random()).slice(0, 10);
        
      res.status(200).json({
        msg: 'Ok',
        data: librosRandom
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        msg: 'Error',
        error
      });
    });
}

const getLibro = (req = request, res = response) => {
    const { idLibro = '' } = req.params
    console.log(idLibro)
  
    axios.get(`https://www.googleapis.com/books/v1/volumes/${idLibro}`)
      .then((response) => {
        const { data } = response
        res.status(200).json({
          msg: 'Ok',
          data
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(400).json({
          msg: 'Error',
          error
        })
      })
}

module.exports = {
    getLibros,
    getLibro
}