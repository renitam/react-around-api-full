module.exports.serverError = (res, err) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    // Needs a db id numerical 24 characters
    res.status(400).send({ message: `Error: Invalid data. ${err}` });
  } else if (err.name === 'ResourceError') {
    res.status(404).send({ message: `Error: Requested resource not found. ${err}` });
  } else {
    res.status(500).send({ message: `An error has occurred on the server. ${err}` });
  }
};

module.exports.authError = (res, err) => {
  res.status(403).send({ message: `Authorization required. ${err}` });
};

const ForbiddenError = (message) => {
  
}

const NotFoundError = (messages) => {

}