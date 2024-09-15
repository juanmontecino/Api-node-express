const axios = require('axios')
const { request, response } = require('express')

const getNoticias = (req = request, res = response) => {
  const { desde = '', hasta = '' } = req.query

  const apiKey = process.env.NEWS_API_KEY
  const desdeDate = desde ? `&from=${desde}` : '';
  const hastaDate = hasta ? `&to=${hasta}` : '';

  if (!apiKey) {
    return res.status(500).json({
      msg: 'Error: API key no configurada',
    });
  }

  try{
    const apiUrl = `https://newsapi.org/v2/everything?q=argentina&pagesize=50${desdeDate}${hastaDate}&apiKey=${apiKey}`;
    axios.get(apiUrl)
      .then((response) => {
        const { data } = response;
        res.status(200).json({
          msg: 'Ok',
          data
        });
      })
      .catch((error) => {
        // handle error
        console.log(error)
        res.status(400).json({
          msg: 'Error',
          error
        })
      })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error interno del servidor',
    });
  }

}

const getNoticia = (req = request, res = response) => {
    const { cantidad = '' } = req.params
    const apiKey = process.env.NEWS_API_KEY

    if (!apiKey) {
        return res.status(500).json({
          msg: 'Error: API key no configurada',
        });
    }
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=argentina&pagesize=${cantidad}&apiKey=${apiKey}`;
        axios.get(apiUrl)
        .then((response) => {
            const { data } = response;
            res.status(200).json({
            msg: 'Ok',
            data
            });
        })
        .catch((error) => {
            // handle error
            console.log(error)
            res.status(400).json({
            msg: 'Error',
            error
            })
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
        msg: 'Error interno del servidor',
        });
    }
  
}  
module.exports = {
 getNoticias,
 getNoticia
}
