import express from "express";
import validate from "../middleware/validation.js";
import { createUserSchema, updateUserSchema } from "../utils/schemas/userSchema.js";
import {
  createUserController,
  exportUsers,
  getGroupedUsers,
  updateUserController,
  deleteUser,
} from "../controllers/userController.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { userEmailExists, userExists } from "../middleware/user.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("You are live");
});
router.get("/users/weekly", asyncWrapper(getGroupedUsers));
router.get("/users/export", asyncWrapper(exportUsers));
router.post(
  "/user",
  validate(createUserSchema),
  asyncWrapper(userEmailExists),
  asyncWrapper(createUserController),
);
router.patch(
  "/user/:id",
  validate(updateUserSchema),
  asyncWrapper(userExists),
  asyncWrapper(updateUserController),
);
router.delete("/user/:id", asyncWrapper(userExists), asyncWrapper(deleteUser));

export default router;
