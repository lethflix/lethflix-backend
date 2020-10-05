const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const Database = require('./db');
const version = require('../package.json').version;

const getcontent = require('./endpoints/getcontent');
const getmostrecentupload = require('./endpoints/getmostrecentupload');
const tunnel = require('./endpoints/tunnel');
const upload = require('./endpoints/upload');
const verify = require('./endpoints/verify');

const db = new Database()
const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 80;

app.get('/', (req, res) =>
  res.send({
      "Lethflix Backend API": `Version ${version}`
  }));
app.get('/getcontent', getcontent);
app.get('/getmostrecentupload', getmostrecentupload);
app.get('/tunnel', tunnel);
app.post('/upload', upload);
app.get('/verify', verify);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});
