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

module.exports = {
    getCanciones
   }
