export const sendResponse = (
  res,
  { success = true, message = "", data = null, statusCode = 200 },
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export const sendBinaryResponse = (res, buffer, options = {}) => {
  const { contentType = "application/octet-stream", statusCode = 200 } = options;
  return res.status(statusCode).set("Content-Type", contentType).send(buffer);
};
