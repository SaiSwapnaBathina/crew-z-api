import AuthService from "../services/authService.js";

export default class AuthController {
  constructor() {
    this.service = new AuthService();
  }

  registerWorker = async (req, res) => {
    try {
      const worker = await this.service.registerWorker(req.body);
      res.status(201).json(worker);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  registerClient = async (req, res) => {
    try {
      const client = await this.service.registerClient(req.body);
      res.status(201).json(client);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const token = await this.service.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  logout = async (req, res) => {
    try {
      await this.service.logout(req.user);
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  forgotPassword = async (req, res) => {
    try {
      const response = await this.service.forgotPassword(req.body.email);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  resetPassword = async (req, res) => {
    try {
      const response = await this.service.resetPassword(req.params.token, req.body.newPassword);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
