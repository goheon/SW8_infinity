const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');

const apiRouter = require('./routes/api');

const { errorHandler } = require('./middlewares/error-handler');

require('./passport')();

require('dotenv').config();
mongoose.connect(
  `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PW}@infinitydb.uzbnsom.mongodb.net/`
);
mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected');
});

var app = express();

app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api', apiRouter);
app.use('/static', express.static(path.resolve(__dirname, 'views', 'static')));
app.use(express.static('views'));
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

app.use('/', (req, res) => res.sendFile(path.resolve('views', 'index.html')));

module.exports = app;
