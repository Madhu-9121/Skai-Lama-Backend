const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const router = require('./routes/lama.routes');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use('/v1', router);

module.exports = app;
