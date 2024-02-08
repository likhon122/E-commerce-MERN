const errorResponse = (
  res,
  { statusCode = 500, message = "Something Broke!" }
) => {
  res.status(statusCode).json({
    success: false,
    message
  });
};

const successResponse = (
  res,
  { statusCode = 200, message = "Successful", payload = {} }
) => {
  res.status(statusCode).json({
    success: true,
    message,
    payload
  });
};

module.exports = { errorResponse, successResponse };
