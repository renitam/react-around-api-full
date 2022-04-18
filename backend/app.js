const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

// set port to 3000
const { PORT = 3000 } = process.env;

// create express app
const app = express();

// connect to MongoDB server - create aroundb db
// include options to prevent app from crashing
mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '621efa836e094bad8d0c3b6a', // paste the _id of the test user created in the previous step
  };
  next();
});

// define routes using express app
app.use(routes);

// set listener for app API
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
