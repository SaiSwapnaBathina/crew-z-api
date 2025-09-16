// import AuthRepository from "../repositories/AuthRepository.js";
// import jwt from "jsonwebtoken";
// import crypto from "crypto";
// import transporter from "../config/emailTransporter.js";
// import { JWT_SECRET } from "../config/config.js";
// import Worker from "../models/workerModel.js";
// import Client from "../models/clientModel.js";

// // Helper to get model and repo dynamically
// const getModelAndRepo = (role) => {
//   const model = role === "worker" ? Worker : Client;
//   return { model, repository: new AuthRepository(model) };
// };

// export default class AuthService {
//   // Register user (worker/client)
//   register = async (data, role) => {
//     const { model, repository } = getModelAndRepo(role);
//     const existingUser = await repository.findOne({ email: data.email });
//     if (existingUser) throw Error(`${role} already exists`);
//     data.role = role;
//     const doc = new model(data); // Use correct model to trigger pre('save')
//     return await doc.save();
//   };

//   registerWorker = (data) => this.register(data, "worker");
//   registerClient = (data) => this.register(data, "client");

//   // Login
//   login = async ({ email, password }) => {
//     const user =
//       await Worker.findOne({ email }) ||
//       await Client.findOne({ email });

//     if (!user) throw new Error("User not found. Please register.");
//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) throw new Error("Invalid password");
//     // if (!user) return res.status(404).json({ message: "User not found. Please register." });
//     // if (!isMatch) return res.status(401).json({ message: "Invalid password." });


//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role,
//         email: user.email,
//         name: user.name,
//       },
//       JWT_SECRET,
//       { expiresIn: "1y" }
//     );
//     console.log("login successfull and token generated")
//     return token;
    
//   };

//   // Logout
//   logout = async () => {
//     return { message: "Logout is handled client-side by discarding the token." };
//   };

//   // Forgot Password
//   forgotPassword = async (email) => {
//     const user =
//       await Worker.findOne({ email }) ||
//       await Client.findOne({ email });

//     if (!user) throw new Error("User not found");

//     const token = crypto.randomBytes(32).toString("hex");
//     const expiry = Date.now() + 3600000;

//     const model = user.role === "worker" ? Worker : Client;
//     await model.findByIdAndUpdate(user._id, {
//       resetPasswordToken: token,
//       resetPasswordExpires: expiry,
//     });

//     const link = `https://crewz-client.vercel.app/reset-password/${token}`;
//     await transporter.sendMail({
//       to: email,
//       from: "bathinasaiswapna@gmail.com",
//       subject: "Reset Your Password",
//       html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
//     });

//     return { message: "Reset link sent to your email" };
//   };

//   // Reset Password
//   resetPassword = async (token, newPassword) => {
//     const user =
//       await Worker.findOne({
//         resetPasswordToken: token,
//         resetPasswordExpires: { $gt: Date.now() },
//       }) ||
//       await Client.findOne({
//         resetPasswordToken: token,
//         resetPasswordExpires: { $gt: Date.now() },
//       });

//     if (!user) throw new Error("Invalid or expired token");

//     user.password = newPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save(); // Trigger pre-save hooks like password hashing

//     return { message: "Password reset successful" };
//   };
//     verifyToken = async (token) => {
//       try {
//         if (!token) {
//           throw Error("Token not provided");
//         }
//         const decoded = jwt.verify(token, JWT_SECRET);
//         if (!decoded) {
//           throw Error("Invalid token");
//         }
//         return decoded;
//       } catch (error) {
//         throw Error(`Error while verifying token: ${error.message}`);
//       }
//     };
  
// }
import AuthRepository from "../repositories/AuthRepository.js";
import jwt from "jsonwebtoken";
import Worker from "../models/workerModel.js";
import Client from "../models/clientModel.js";
import { JWT_SECRET } from "../config/config.js";

// Dynamically switch model/repo
const getModelAndRepo = (role) => {
  const model = role === "worker" ? Worker : Client;
  return { model, repository: new AuthRepository(model) };
};

export default class AuthService {
  // General-purpose register handler
  register = async (data, role) => {
    const { model, repository } = getModelAndRepo(role);

    // Check if email already exists
    const existingUser = await repository.findOne({ email: data.email });
    if (existingUser) throw new Error(`${role} with this email already exists`);

    // Set role explicitly
    data.role = role;

    // Create new user
    const newUser = new model(data);
    const savedUser = await newUser.save();

    // Sign JWT
    const token = this.generateToken(savedUser);

    return {
      token,
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        role: savedUser.role,
      },
    };
  };

  // Role-specific register methods
  registerWorker = (data) => this.register(data, "worker");
  registerClient = (data) => this.register(data, "client");

  // Login handler
  login = async ({ email, password }) => {
    // Find user in either model
    const user = await Worker.findOne({ email }) || await Client.findOne({ email });
    if (!user) throw new Error("User not found. Please register.");

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error("Invalid password");

    // Generate JWT
    const token = this.generateToken(user);

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
    };
  };

  // Generate JWT helper
  generateToken = (user) => {
    return jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: "1y" }
    );
  };

  // Logout (stateless JWT)
  logout = async () => {
    return { message: "Logout handled client-side by clearing the token." };
  };
}

