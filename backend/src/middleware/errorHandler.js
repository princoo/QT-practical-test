import { sendResponse } from "../utils/responseHandler.js";

// eslint-disable-next-line no-unused-vars
const ErrorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Internal Server Error";

  sendResponse(res, { success: false, statusCode: errStatus, message: errMsg });
};

export default ErrorHandler;
