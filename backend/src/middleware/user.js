import prisma from "../config/db.js";
import { sendResponse } from "../utils/responseHandler.js";

export async function userExists(req, res, next) {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return sendResponse(res, { success: false, statusCode: 404, message: "User not found" });
  }
  next();
}

export async function userEmailExists(req, res, next) {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    return sendResponse(res, { success: false, statusCode: 400, message: "User already exists" });
  }
  next();
}
