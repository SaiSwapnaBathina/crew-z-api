import ClientService from "../services/clientService.js";

export default class ClientController {
  constructor() {
    this.service = new ClientService();
  }

  // Profile Management
  createClient = async (req, res) => {
    try {
      const client = await this.service.createClient(req.body);
      res.status(201).json(client);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getClient = async (req, res) => {
    try {
      const client = await this.service.getClient(req.params.clientId);
      res.status(200).json(client);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateClient = async (req, res) => {
    try {
      const updated = await this.service.updateClient(req.params.clientId, req.body);
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteClient = async (req, res) => {
    try {
      await this.service.deleteClient(req.params.clientId);
      res.status(200).json({ message: "Client deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Job Management
  createJob = async (req, res) => {
    try {
      const job = await this.service.createJob(req.body);
      res.status(201).json(job);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  listJobs = async (req, res) => {
    try {
      const jobs = await this.service.listJobs();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getJob = async (req, res) => {
    try {
      const job = await this.service.getJob(req.params.jobId);
      res.status(200).json(job);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateJob = async (req, res) => {
    try {
      const job = await this.service.updateJob(req.params.jobId, req.body);
      res.status(200).json(job);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteJob = async (req, res) => {
    try {
      await this.service.deleteJob(req.params.jobId);
      res.status(200).json({ message: "Job deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Booking Services
  createBooking = async (req, res) => {
    try {
      const booking = await this.service.createBooking(req.body);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getBooking = async (req, res) => {
    try {
      const booking = await this.service.getBooking(req.params.bookingId);
      res.status(200).json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Feedback
  createFeedback = async (req, res) => {
    try {
      const feedback = await this.service.createFeedback(req.body);
      res.status(201).json(feedback);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getFeedback = async (req, res) => {
    try {
      const feedback = await this.service.getFeedback(req.params.feedbackId);
      res.status(200).json(feedback);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  listUserFeedback = async (req, res) => {
    try {
      const list = await this.service.listUserFeedback(req.params.userId);
      res.status(200).json(list);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
