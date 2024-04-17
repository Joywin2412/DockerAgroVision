const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalURL}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log(req.url)
  const statusCode = res.status.Code === 200 ? 500 : res.status.Code;
  console.log(err)
  res.status(statusCode);
  
};

module.exports = { notFound, errorHandler };
