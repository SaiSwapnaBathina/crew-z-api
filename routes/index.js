import { Router } from "express";
import authRouter from "./authRoutes.js";
import clientRouter from "./clientRoutes.js";
import workerRouter from "./workerRoutes.js";

const router = Router();

// router.get("", (req, res) => {
//   res.send("Welcome!").status(200);
// });
router.get('/', (req, res) => {
  res.status(200).json({
    message: '🛠️ Crew-Z API is up and running!',
    status: 'OK',
    time: new Date().toISOString(),
  });
});



router.use("/auth", authRouter);
router.use("/client", clientRouter);
router.use("/workers", workerRouter);

export default router;