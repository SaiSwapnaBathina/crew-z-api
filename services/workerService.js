// import WorkerRepository from "../repositories/workerRepository.js";
// import mongoose from "mongoose";

// export default class WorkerService {
//   constructor() {
//     this.repo = new WorkerRepository();
//   }

//   createProfile = async (data) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//       const worker = await this.repo.worker.create(data, { session });
//       await session.commitTransaction();
//       return worker;
//     } catch (error) {
//       await session.abortTransaction();
//       throw Error(`Error while creating worker: ${error.message}`);
//     } finally {
//       session.endSession();
//     }
//   };

//   getProfile = async (workerId) => {
//     try {
//       const worker = await this.repo.worker.findById(workerId);
//       return worker;
//     } catch (error) {
//       throw Error(`Error while fetching worker: ${error.message}`);
//     }
//   };

//   updateProfile = async (workerId, data) => {
//     try {
//       const updated = await this.repo.worker.findByIdAndUpdate(workerId, data);
//       return updated;
//     } catch (error) {
//       throw Error(`Error while updating worker: ${error.message}`);
//     }
//   };

//   deleteProfile = async (workerId) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//       await this.repo.deleteWorkerAndAll(workerId, { session });
//       await session.commitTransaction();
//       return { message: "Worker and related records deleted" };
//     } catch (error) {
//       await session.abortTransaction();
//       throw Error(`Error while deleting worker: ${error.message}`);
//     } finally {
//       session.endSession();
//     }
//   };

//   applyForJob = async (jobId, data) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();
  
//     try {
//       // Step 1: Fetch job and ensure it's available
//       const job = await this.repo.job.findOne({ _id: jobId, isAvailable: true }).session(session);
//       if (!job) throw new Error("Job not found or unavailable");
  
//       // Step 2: Check if worker already applied
//       if (job.applicants.includes(data.worker)) {
//         throw new Error("Worker has already applied for this job");
//       }
  
//       // Step 3: Add worker to applicants
//       job.applicants.push(data.worker);
//       await job.save({ session });
  
//       await session.commitTransaction();
//       return { message: "Applied successfully", jobId, workerId: data.worker };
//     } catch (error) {
//       await session.abortTransaction();
//       throw Error(`Error while applying for job: ${error.message}`);
//     } finally {
//       session.endSession();
//     }
//   };
//   viewAppliedJobs = async (workerId) => {
//     try {
//       const appliedJobs = await this.repo.job.find({ applicants: workerId });
//       return appliedJobs;
//     } catch (error) {
//       throw Error(`Error while fetching applied jobs: ${error.message}`);
//     }
//   };
//   getApplicationStatus = async (workerId, jobId) => {
//     try {
//       const job = await this.repo.job.findById(jobId);
  
//       if (!job) throw new Error("Job not found");
  
//       const hasApplied = job.applicants.includes(workerId);
//       if (!hasApplied) throw new Error("Worker has not applied for this job");
  
//       return {
//         jobId: job._id,
//         status: job.status,
//         submittedAt: job.updatedAt,
//         title: job.title,
//         client: job.client,
//       };
//     } catch (error) {
//       throw Error(`Error while fetching application status: ${error.message}`);
//     }
//   };
   

 
// }
import WorkerRepository from "../repositories/workerRepository.js";
import mongoose from "mongoose";

export default class WorkerService {
  constructor() {
    this.repo = new WorkerRepository();
  }

  // ——— PROFILE MANAGEMENT ———
  createProfile = async (data) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const worker = await this.repo.worker.create([data], { session });
      await session.commitTransaction();
      return worker[0];
    } catch (error) {
      await session.abortTransaction();
      throw new Error(`Error while creating worker: ${error.message}`);
    } finally {
      session.endSession();
    }
  };

  getProfile = async (workerId) => {
    try {
      const worker = await this.repo.worker.findById(workerId);
      if (!worker) throw new Error("Worker not found");
      return worker;
    } catch (error) {
      throw new Error(`Error while fetching worker: ${error.message}`);
    }
  };

  updateProfile = async (workerId, data) => {
    try {
      const updated = await this.repo.worker.findByIdAndUpdate(workerId, data, { new: true });
      return updated;
    } catch (error) {
      throw new Error(`Error while updating worker: ${error.message}`);
    }
  };

  deleteProfile = async (workerId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await this.repo.deleteWorkerAndAll(workerId, { session });
      await session.commitTransaction();
      return { message: "Worker and related records deleted" };
    } catch (error) {
      await session.abortTransaction();
      throw new Error(`Error while deleting worker: ${error.message}`);
    } finally {
      session.endSession();
    }
  };

  // ——— JOBS ———
  listOpenJobs = async () => {
    try {
      // Return all open jobs for all clients
      return await this.repo.job.find({ isAvailable: true, status: "open" });
    } catch (error) {
      throw new Error(`Error while fetching jobs: ${error.message}`);
    }
  };

  // ——— JOB APPLICATIONS ———
  // applyForJob = async (workerId, jobId, data) => {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();
  //   try {
  //     const job = await this.repo.job.findOne({ _id: jobId, isAvailable: true }).session(session);
  //     if (!job) throw new Error("Job not found or unavailable");

  //     if (job.applicants.includes(workerId)) throw new Error("Worker has already applied for this job");

  //     job.applicants.push(workerId);
  //     await job.save({ session });

  //     await session.commitTransaction();
  //     return { message: "Applied successfully", jobId, workerId };
  //   } catch (error) {
  //     await session.abortTransaction();
  //     throw new Error(`Error while applying for job: ${error.message}`);
  //   } finally {
  //     session.endSession();
  //   }
  // };
  applyForJob = async (workerId, jobId, data) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const job = await this.repo.job.findOne(
        { _id: jobId, isAvailable: true },
        { session } // Now works because your CrudRepo supports session
      );
  
      if (!job) throw new Error("Job not found or unavailable");
  
      if (job.applicants.includes(workerId)) {
        throw new Error("Worker has already applied for this job");
      }
  
      job.applicants.push(workerId);
      await job.save({ session });
  
      await session.commitTransaction();
      return { message: "Applied successfully", jobId, workerId };
    } catch (error) {
      await session.abortTransaction();
      throw new Error(`Error while applying for job: ${error.message}`);
    } finally {
      session.endSession();
    }
  };
  
  viewAppliedJobs = async (workerId) => {
    try {
      return await this.repo.job.find({ applicants: workerId });
    } catch (error) {
      throw new Error(`Error while fetching applied jobs: ${error.message}`);
    }
  };

  getApplicationStatus = async (workerId, jobId) => {
    try {
      const job = await this.repo.job.findById(jobId);
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
    } catch (error) {
      throw new Error(`Error while fetching application status: ${error.message}`);
    }
  };

  // ——— BOOKINGS ———
  listBookings = async (workerId) => {
    try {
      return await this.repo.booking.find({ worker: workerId }, ["client", "job"]);
    } catch (error) {
      throw new Error(`Error while fetching bookings: ${error.message}`);
    }
  };

  getBooking = async (workerId, bookingId) => {
    try {
      const booking = await this.repo.booking.findOne({ _id: bookingId, worker: workerId }, ["client", "job"]);
      if (!booking) throw new Error("Booking not found");
      return booking;
    } catch (error) {
      throw new Error(`Error while fetching booking: ${error.message}`);
    }
  };

  // ——— FEEDBACK ———
  listFeedback = async (workerId) => {
    try {
      return await this.repo.feedback.find({ worker: workerId }).populate("client job");
    } catch (error) {
      throw new Error(`Error while fetching feedback: ${error.message}`);
    }
  };
}
