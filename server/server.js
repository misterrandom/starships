const express = require('express');

const app = express();
const cors = require('cors');
const axios = require("axios");

app.use(cors());

app.get('/api/starships', async (req, res) => {
  const { data } = await axios.get("https://swapi.info/api/starships");
  res.status(200).json(data)
});

app.get('/api/films', async (req, res) => {
  const { data } = await axios.get("https://swapi.info/api/films");
  res.status(200).json(data)
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});