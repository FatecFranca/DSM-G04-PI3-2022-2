// Carrega as variáveis de ambiente (arquivo .env)
require ('dotenv').config();
const { setupRoutes } = require('./routes');
const { noCache } = require('./middlewares/noCache');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();

app.use(noCache())
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
setupRoutes(app)

module.exports = app;
