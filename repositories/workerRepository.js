// import CrudRepository from "./crudRepository.js";
// import Worker from "../models/workerModel.js";
// import Job from "../models/jobModel.js";
// import Booking from "../models/bookingModel.js";
// import Feedback from "../models/feedbackModel.js";

// export default class WorkerRepository {
//   constructor() {
//     this.worker = new CrudRepository(Worker);
//     this.job = new CrudRepository(Job);
//     this.booking = new CrudRepository(Booking);
//     this.feedback = new CrudRepository(Feedback);
//   }

//   /**
//    * Deletes a worker and all related records in a single flow.
//    * @param {string} workerId - ID of the worker to delete.
//    * @param {object} options - Optional Mongoose options, e.g., { session } for transactions.
//    */
//   deleteWorkerAndAll = async (workerId, options = {}) => {
//     await this.worker.findByIdAndDelete(workerId, options);
//     await this.job.deleteMany({ worker: workerId }, options);
//     await this.booking.deleteMany({ worker: workerId }, options);
//     await this.feedback.deleteMany({ user: workerId }, options);
//   };
// }
import CrudRepository from "./crudRepository.js";
import Worker from "../models/workerModel.js";
import Job from "../models/jobModel.js";
import Booking from "../models/bookingModel.js";
import Feedback from "../models/feedbackModel.js";

export default class WorkerRepository {
  constructor() {
    this.worker = new CrudRepository(Worker);
    this.job = new CrudRepository(Job);
    this.booking = new CrudRepository(Booking);
    this.feedback = new CrudRepository(Feedback);
  }

  /**
   * Deletes a worker and all related records (jobs, bookings, feedback)
   * in a single transaction.
   * @param {string} workerId - ID of the worker to delete.
   * @param {object} options - Optional Mongoose options, e.g., { session }.
   */
  deleteWorkerAndAll = async (workerId, options = {}) => {
    await this.worker.findByIdAndDelete(workerId, options);
    await this.job.deleteMany({ assignedWorker: workerId }, options);
    await this.booking.deleteMany({ worker: workerId }, options);
    await this.feedback.deleteMany({ worker: workerId }, options);
  };

  /**
   * List all jobs a worker has applied for.
   * @param {string} workerId
   */
  listAppliedJobs = async (workerId) => {
    return await this.job.find({ applicants: workerId });
  };

  /**
   * Get a specific job application status for a worker.
   * @param {string} workerId
   * @param {string} jobId
   */
  getApplicationStatus = async (workerId, jobId) => {
    const job = await this.job.findById(jobId);
    if (!job) throw new Error("Job not found");
    const hasApplied = job.applicants.includes(workerId);
    if (!hasApplied) throw new Error("Worker has not applied for this job");
    return {
      jobId: job._id,
      status: job.status,
      submittedAt: job.updatedAt,
      title: job.title,
      client: job.client,
    };
  };

  /**
   * Fetch all bookings for a worker.
   * @param {string} workerId
   */
  listBookings = async (workerId) => {
    return await this.booking.find({ worker: workerId }).populate("client job");
  };

  /**
   * Fetch a single booking for a worker.
   * @param {string} workerId
   * @param {string} bookingId
   */
  getBooking = async (workerId, bookingId) => {
    const booking = await this.booking.findOne({ _id: bookingId, worker: workerId }).populate("client job");
    if (!booking) throw new Error("Booking not found");
    return booking;
  };

  /**
   * Fetch all feedback for a worker.
   * @param {string} workerId
   */
  listFeedback = async (workerId) => {
    return await this.feedback.find({ worker: workerId }).populate("client job");
  };

  /**
   * Fetch all open jobs for worker dashboard.
   */
  listOpenJobs = async () => {
    return await this.job.find({ isAvailable: true, status: "open" }).populate("client");
  };
}
