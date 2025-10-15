import express from "express";
import validate from "../middleware/validation.js";
import { createUserSchema } from "../utils/schemas/userSchema.js";
import { createUserController } from "../controllers/userController.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("You are live");
});
router.post("/user", validate(createUserSchema), asyncWrapper(createUserController));

export default router;
