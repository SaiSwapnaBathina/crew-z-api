import express from "express";
import AuthController from "../controllers/authController.js";

const authRouter = express.Router();
const authController = new AuthController();

// Worker sign-up
authRouter.post("/register/worker", authController.registerWorker);
// Client sign-up
authRouter.post("/register/client", authController.registerClient);
// Common login/logout
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

// // Forgot Password
// authRouter.post("/forgot-password", authController.forgotPassword);
// // Reset Password
// authRouter.post("/reset-password/:token", authController.resetPassword);

export default authRouter;
