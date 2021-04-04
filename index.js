require('dotenv').config();
const express = require('express')
const cors = require('cors');

const router = require('./src/routes');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})