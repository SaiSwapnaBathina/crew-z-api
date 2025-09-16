
import WorkerService from "../services/workerService.js";

export default class WorkerController {
  constructor() {
    this.service = new WorkerService();
  }

  // ——— PROFILE MANAGEMENT ———
  createProfile = async (req, res) => {
    try {
      const worker = await this.service.createProfile({ ...req.body, userId: req.user._id });
      res.status(201).json(worker);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getProfile = async (req, res) => {
    try {
      const worker = await this.service.getProfile(req.params.workerId);
      res.status(200).json(worker);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateProfile = async (req, res) => {
    try {
      const updated = await this.service.updateProfile(req.params.workerId, req.body);
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteProfile = async (req, res) => {
    try {
      await this.service.deleteProfile(req.params.workerId);
      res.status(200).json({ message: "Worker profile deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // ——— JOBS ———
  listOpenJobs = async (req, res) => {
    try {
      const jobs = await this.service.listOpenJobs();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // ——— JOB APPLICATIONS ———
 
  applyForJob = async (req, res) => {
    try {
      const workerId = req.user?.id || req.user?._id; // ← get from authenticated user
      const jobId = req.params.jobId;
      //console.log(workerId);
      const application = await this.service.applyForJob(workerId, jobId);
      res.status(201).json(application);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  viewAppliedJobs = async (req, res) => {
    try {
      const applications = await this.service.viewAppliedJobs(req.params.workerId);
      res.status(200).json(applications);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getApplicationStatus = async (req, res) => {
    try {
      const status = await this.service.getApplicationStatus(req.params.workerId, req.params.applicationId);
      res.status(200).json(status);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // ——— BOOKINGS ———
  listBookings = async (req, res) => {
    try {
      const bookings = await this.service.listBookings(req.params.workerId);
      res.status(200).json(bookings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getBooking = async (req, res) => {
    try {
      const booking = await this.service.getBooking(req.params.workerId, req.params.bookingId);
      res.status(200).json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // ——— FEEDBACK ———
  listFeedback = async (req, res) => {
    try {
      const feedback = await this.service.listFeedback(req.params.workerId);
      res.status(200).json(feedback);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
