import { createUser, getPublicKeyService } from "../services/userService.js";
import { sendResponse } from "../utils/responseHandler.js";

export const createUserController = async (req, res) => {
  const { email, role, status } = req.body;
  const user = await createUser({ email, role, status });
  return sendResponse(res, { success: true, message: "User created successfully", data: user });
};

export const getPublicKeyController = (req, res) => {
  const pubKey = getPublicKeyService();
  return sendResponse(res, { success: true, message: "Public key fetched", data: pubKey });
};
