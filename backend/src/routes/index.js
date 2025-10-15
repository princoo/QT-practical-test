import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("You are live on Cats Care");
});

export default router;