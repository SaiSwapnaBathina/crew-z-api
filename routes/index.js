import { Router } from "express";
import authRouter from "./authRoutes.js";
import clientRouter from "./clientRoutes.js";

const router = Router();

router.get("", (req, res) => {
  res.send("Welcome!").status(200);
});

router.use("/auth", authRouter);
router.use("/client", clientRouter);


export default router;