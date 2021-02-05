module.exports = (err, req, res, next) => {
  let errorMessage = [];
  let status;
  // console.log(err);
  // res.json(err);
  if (err.name === "SequelizeValidationError") {
    const error = err.errors.map((el) => errorMessage.push(el.message));
    status = 500;
  } else if (err.name === "LoginError") {
    errorMessage = err.message;
    status = err.status;
  } else if (err.name === "SequelizeUniqueConstraintError") {
    const error = err.errors.map((el) => errorMessage.push(el.message));
    status = 500;
  } else if (err.name === "Custom") {
    errorMessage = err.message;
    status = err.status;
  }
  res.status(status || 500).json({ errorMessage: errorMessage || err });
};
