const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

// Pull in middleware and constants
const routes = require('./routes/routes');
const { createUser, login } = require('./controllers/users');
const { validateUser, validateLogin } = require('./middleware/validation');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { DB_ADDRESS } = require('./utils/config');
const ServerError = require('./errors/server-err');

// set port to 3000
const { PORT = 3000 } = process.env;

// create express app
const app = express();

// connect to MongoDB server - create aroundb db
// include options to prevent app from crashing
mongoose.connect(DB_ADDRESS);

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Server crash testing for code reviewer
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(requestLogger); // enable request logger

// define sign in and login routes
app.post('/signup', validateUser, createUser);
app.post('/signin', validateLogin, login);

// protect remaining routes & define user._id for authorized user
app.use(routes); // define user & card route middleware

app.use(errorLogger); // enable error logger

app.use(errors()); // error handlers for celebrate

// api generated errors
app.use((err, req, res, next) => {
  if (err.statusCode !== 500) {
    res.status(err.statusCode || 500).send({ message: err.message || `An error occurred on the server: ${err.message}` });
  } else {
    const serverErr = new ServerError(`An error occurred on the server: ${err.message}`);
    res.status(serverErr.statusCode).send({ message: serverErr.message });
  }
});

// set listener for app API
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
