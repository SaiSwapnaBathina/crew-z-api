import AuthRepository from "../repositories/AuthRepository.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import transporter from "../config/emailTransporter.js";
import { JWT_SECRET } from "../config/config.js";
import Worker from "../models/WorkerModel.js";
import Client from "../models/ClientModel.js";

// Helper to get model and repo dynamically
const getModelAndRepo = (role) => {
  const model = role === "worker" ? Worker : Client;
  return { model, repository: new AuthRepository(model) };
};

export default class AuthService {
  // Register user (worker/client)
  register = async (data, role) => {
    const { model, repository } = getModelAndRepo(role);
    const existingUser = await repository.findOne({ email: data.email });
    if (existingUser) throw Error(`${role} already exists`);
    data.role = role;
    const doc = new model(data); // Use correct model to trigger pre('save')
    return await doc.save();
  };

  registerWorker = (data) => this.register(data, "worker");
  registerClient = (data) => this.register(data, "client");

  // Login
  login = async ({ email, password }) => {
    const user =
      await Worker.findOne({ email }) ||
      await Client.findOne({ email });

    if (!user) throw new Error("User not found. Please register.");
    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error("Invalid password");

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: "1y" }
    );
    console.log("login successfull and token generated")
    return token;
    
  };

  // Logout
  logout = async () => {
    return { message: "Logout is handled client-side by discarding the token." };
  };

  // Forgot Password
  forgotPassword = async (email) => {
    const user =
      await Worker.findOne({ email }) ||
      await Client.findOne({ email });

    if (!user) throw new Error("User not found");

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 3600000;

    const model = user.role === "worker" ? Worker : Client;
    await model.findByIdAndUpdate(user._id, {
      resetPasswordToken: token,
      resetPasswordExpires: expiry,
    });

    const link = `https://crewz-client.vercel.app/reset-password/${token}`;
    await transporter.sendMail({
      to: email,
      from: "bathinasaiswapna@gmail.com",
      subject: "Reset Your Password",
      html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
    });

    return { message: "Reset link sent to your email" };
  };

  // Reset Password
  resetPassword = async (token, newPassword) => {
    const user =
      await Worker.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      }) ||
      await Client.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

    if (!user) throw new Error("Invalid or expired token");

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save(); // Trigger pre-save hooks like password hashing

    return { message: "Password reset successful" };
  };
}
