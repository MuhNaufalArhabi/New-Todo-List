const error = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = "Internal Server Error";

  if (err.name === "invalidLogin") {
    code = 404;
    message = "Username or password wrong";
  } else if (err.name === "notFound") {
    code = 404;
    message = "Not Found";
  } else if (err.name === "InvalidToken" || err.name === `JsonWebTokenError`) {
    code = 401;
    message = `Invalid token`;
  } else if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  }

  res.status(code).json({ message });
};

module.exports = error;
