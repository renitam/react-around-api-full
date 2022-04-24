const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');
const auth = require('./middleware/auth');
const { createUser, login } = require('./controllers/users');
const { DB_ADDRESS } = require('./utils/config');

// set port to 3000
const { PORT = 3000 } = process.env;

// create express app
const app = express();

// connect to MongoDB server - create aroundb db
// include options to prevent app from crashing
mongoose.connect(DB_ADDRESS);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// define sign in and login routes
app.post('/signin', login);
app.post('/signup', createUser);

// protect remaining routes & define user._id for authorized user
app.use(auth);

// define user & card route middleware
app.use(routes);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next(err);
});

// set listener for app API
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
