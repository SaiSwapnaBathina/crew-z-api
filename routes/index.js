import { Router } from "express";
import authRouter from "./authRoutes.js";

const router = Router();
router.use("/auth", authRouter);

router.get("", (req, res) => {
  res.send("Welcome!").status(200);
});

export default router;