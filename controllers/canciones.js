const axios = require('axios');
const { request, response } = require('express');

const getCanciones = (req = request, res = response) => {
  const { genero = 'rock' } = req.query; //genero musical

  const apiKey = process.env.APIKEYMUSICA; //utilizo lastFM api
  const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${genero}&api_key=${apiKey}&format=json`;

  if (!apiKey) {
    return res.status(500).json({
      msg: 'Error: API key no configurada',
    });
  }

  try {
    axios.get(apiUrl)
      .then((response) => {
        const { tracks } = response.data;
        res.status(200).json({
          msg: `Canciones mas conocidas en el género ${genero}`,
          canciones: tracks.track, 
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          msg: 'Error al obtener las canciones',
          error,
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error interno del servidor',
    });
  }
};
const getCancion = (req = request, res = response) => {
  const { cantidad = '' } = req.params; //recibimos la cantidad de canciones por parametro
  const apiKey = process.env.APIKEYMUSICA;

  if (!apiKey) {
    return res.status(500).json({
      msg: 'Error: API key no configurada',
    });
  }

  try {
    //muestra del genero rkt
    const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=RKT&api_key=${apiKey}&format=json`;

    axios.get(apiUrl)
      .then((response) => {
        const { tracks } = response.data;

        //limita la cantidad de cancioens y las guarda en una variable para manejarlas mejor cuando las mostremos
        const cancionesLimitadas = tracks.track.slice(0, parseInt(cantidad));

        res.status(200).json({
          msg: `Las ${cantidad} canciones más conocidas en el género pop`,
          canciones: cancionesLimitadas,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          msg: 'Error al obtener las canciones',
          error,
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error interno del servidor',
    });
  }
}

module.exports = {
    getCanciones,
    getCancion
   }