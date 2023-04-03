const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let lib = require('./myutil.js');
let jsonData = lib.readFile('./data/data.json');
const app = express();
const jsonFilePath = './data/data.json';

app.use('/form', express.static(path.join(__dirname, 'form')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/form/form.html`));
});

app.get('/post', (req, res) => {
  res.sendFile(path.join(`${__dirname}/post-it/post.html`));
});

app.get('/data/data.json', (req, res) => {
  res.sendFile(path.join(`${__dirname}/data/data.json`));
});

app.get('/viewPost', (req, res) => {
  res.sendFile(path.join(`${__dirname}/post-it/post.html`));
});


app.post('/viewPost', (req, res) => {
  res.redirect((path.join(`/viewPost`)));
});


app.post('/add', (req, res) => {
  const nickname = {
    nickname: req.body.nickname,
    commento: req.body.commento
  };

  // leggi i dati dal file JSON
  let data = JSON.parse(fs.readFileSync(jsonFilePath));

  // aggiungi il nuovo nickname all'array dei nickname
  lib.addElementToJSON(data, nickname);
  lib.writeFileJSON('./data/data.json', data);

  console.log(`Il nickname ${nickname.nickname} con commento "${nickname.commento}" è stato salvato nel file JSON! (ip: ${req.ip})`);
  res.redirect((path.join(`/post`)));
});



app.listen(3000, () => {
  console.log('Server started on port 3000');
});

