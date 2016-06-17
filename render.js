'use strict';
const express = require('express');
const app = express();
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index', { title: 'Olá Vágner', message: 'Seja bem vindo' });
});

app.listen(3000, function () {
  console.log('Servidor rodando em locahost:3000');
});