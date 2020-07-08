module.exports = function(err, _, res, _) {
  console.log(err);
  let statusCode = 500;
  let message = "internal server error";

  if (err.response) {
    if (err.response.data.fault.faultstring === "Invalid ApiKey") {
      statusCode = 401;
      message = "Invalid ApiKey";
    }
  }

  switch (err.name) {
    case "SequelizeValidationError":
      message = [];
      err.errors.forEach((error) => {
        message.push(error.message);
      });
      statusCode = 400;
      break;
    case "SequelizeUniqueConstraintError":
      message = [];
      err.errors.forEach((error) => {
        message.push(error.message);
      });
      statusCode = 400;
      break;
    case "ValidationError":
      message = err.message;
      statusCode = err.statusCode;
      break;
    case "JsonWebTokenError":
      message = "Token not valid";
      statusCode = 401;
      break;
  }

  res.status(statusCode).json({
    message: message,
  });
};
