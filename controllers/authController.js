// import AuthService from "../services/authService.js";
// import Worker from "../models/workerModel.js";
// import Client from "../models/clientModel.js";

// export default class AuthController {
//   constructor() {
//     this.service = new AuthService();
//   }

//   registerWorker = async (req, res) => {
//     try {
//       const worker = await this.service.registerWorker(req.body);
//       res.status(201).json(worker);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   registerClient = async (req, res) => {
//     try {
//       const client = await this.service.registerClient(req.body);
//       res.status(201).json(client);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };


//   login = async (req, res) => {
//     try {
//       const token = await this.service.login(req.body)
//       const user =
//         await Worker.findOne({ email: req.body.email }) ||
//         await Client.findOne({ email: req.body.email })
  
//       res.status(200).json({ token, user }) // ✅ include user object
//     } catch (error) {
//       res.status(400).json({ message: error.message })
//     }
//   }
  

//   logout = async (req, res) => {
//     try {
//       await this.service.logout(req.user);
//       res.status(200).json({ message: "Logout successful" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   forgotPassword = async (req, res) => {
//     try {
//       const response = await this.service.forgotPassword(req.body.email);
//       res.status(200).json(response);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };


//   resetPassword = async (req, res) => {
//     try {
//       const response = await this.service.resetPassword(req.params.token, req.body.newPassword);
//       res.status(200).json(response);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
// }

// controllers/authController.js
import AuthService from "../services/authService.js";

export default class AuthController {
  constructor() {
    this.service = new AuthService();
  }

  registerWorker = async (req, res) => {
    try {
      const { token, user } = await this.service.registerWorker(req.body);
      res.status(201).json({
        message: "Worker registered successfully",
        token,
        id: user._id,
        name: user.name,
        role: user.role,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  registerClient = async (req, res) => {
    try {
      const { token, user } = await this.service.registerClient(req.body);
      res.status(201).json({
        message: "Client registered successfully",
        token,
        id: user._id,
        name: user.name,
        role: user.role,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { token, user } = await this.service.login(req.body);
      res.status(200).json({
        message: "Login successful",
        token,
        id: user._id,
        name: user.name,
        role: user.role,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  logout = async (req, res) => {
    try {
      await this.service.logout(req.user); // optional, if you're tracking sessions
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
