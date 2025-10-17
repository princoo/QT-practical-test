import {
  createUserService,
  deleteUserService,
  getAllusers,
  getGroupedUsersService,
  getPublicKeyService,
  updateUserService,
} from "../services/userService.js";
import { encodeUsers } from "../utils/proto.js";
import { sendBinaryResponse, sendResponse } from "../utils/responseHandler.js";

export const createUserController = async (req, res) => {
  const { email, role, status } = req.body;
  const user = await createUserService({ email, role, status });
  return sendResponse(res, { success: true, message: "User created successfully", data: user });
};

export async function updateUserController(req, res) {
  const { id } = req.params;
  const result = await updateUserService(id, req.body);

  return sendResponse(res, {
    success: true,
    message: "User updated successfully",
    data: result.data,
  });
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  await deleteUserService(id);

  return sendResponse(res, {
    success: true,
    message: "User deleted successfully",
  });
}
export async function getGroupedUsers(req, res) {
  const users = await getGroupedUsersService();
  return sendResponse(res, { success: true, message: "Users fetched", data: users });
}

export async function exportUsers(req, res) {
  const users = await getAllusers();
  const buffer = await encodeUsers(users);
  return sendBinaryResponse(res, buffer, {
    contentType: "application/x-protobuf",
  });
}
export const getPublicKeyController = (req, res) => {
  const pubKey = getPublicKeyService();
  return sendResponse(res, { success: true, message: "Public key fetched", data: pubKey });
};
