require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router/index')


const PORT = process.env["PORT"]
const app = express();

app.use(express.json());
app.use( cors({
    origin: process.env["CLIENT_URL"]
}));
app.use('/', router);

const start =  () => {
  try{
      app.listen(PORT, () => console.log(` Сервер запущен на порту - ${PORT}`))
  }catch (e) {
        console.log(e)
  }
}

start();


