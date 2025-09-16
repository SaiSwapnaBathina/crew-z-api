
import ClientRepository from "../repositories/clientRepository.js";
import mongoose from "mongoose";

export default class ClientService {
  constructor() {
    this.repo = new ClientRepository();
    
  }

  // ----------------- CLIENT PROFILE -----------------
  createClient = async (data) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const client = await this.repo.client.create(data, { session });
      await session.commitTransaction();
      return client;
    } catch (error) {
      await session.abortTransaction();
      throw new Error(`Error creating client: ${error.message}`);
    } finally {
      session.endSession();
    }
  };

  getClient = async (clientId) => {
    try {
      return await this.repo.client.findById(clientId);
    } catch (error) {
      throw new Error(`Error fetching client: ${error.message}`);
    }
  };

  updateClient = async (clientId, data) => {
    try {
      return await this.repo.client.findByIdAndUpdate(clientId, data);
    } catch (error) {
      throw new Error(`Error updating client: ${error.message}`);
    }
  };

  deleteClient = async (clientId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await this.repo.deleteClientAndAll(clientId, { session });
      await session.commitTransaction();
      return { message: "Client and related records deleted" };
    } catch (error) {
      await session.abortTransaction();
      throw new Error(`Error deleting client: ${error.message}`);
    } finally {
      session.endSession();
    }
  };



  // Fetch all active and verified workers
  listWorkers = async () => {
    try {
      return await this.repo.worker.find(
        { isActive: true } // ✅ only active worker
      );
    } catch (error) {
      throw new Error(`Error fetching workers: ${error.message}`);
    }
  };
  



  // ----------------- JOB MANAGEMENT -----------------
  createJob = async (data) => {
    try {
      return await this.repo.job.create(data);
    } catch (error) {
      throw new Error(`Error creating job: ${error.message}`);
    }
  };

  
  listJobs = async (clientId) => {
    try {
      //console.log("Filtering jobs with client ID:", clientId); // 👀
      return await this.repo.job.find({ client: clientId }, ['assignedWorker']);
    } catch (error) {
      throw new Error(`Error listing jobs: ${error.message}`);
    }
  };
  

  getJob = async (jobId) => {
    try {
      return await this.repo.job.findById(jobId);
    } catch (error) {
      throw new Error(`Error fetching job: ${error.message}`);
    }
  };

  updateJob = async (jobId, data) => {
    try {
      return await this.repo.job.findByIdAndUpdate(jobId, data);
    } catch (error) {
      throw new Error(`Error updating job: ${error.message}`);
    }
  };

  deleteJob = async (jobId) => {
    try {
      await this.repo.job.findByIdAndDelete(jobId);
      return { message: "Job deleted" };
    } catch (error) {
      throw new Error(`Error deleting job: ${error.message}`);
    }
  };

  // ----------------- JOB APPLICATION MANAGEMENT -----------------

  acceptJobProposal = async (clientId, jobId, workerId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const job = await this.repo.job.findOne(
        { _id: jobId, isAvailable: true },
        { session }
      );
  
      if (!job) throw new Error("Job not found or already booked");
      if (job.client.toString() !== clientId.toString()) {
        throw new Error("Unauthorized access to job");
      }
  
      if (!job.applicants.map(String).includes(workerId)) {
        throw new Error("Worker has not applied for this job");
      }
  
      job.assignedWorker = workerId;
      job.applicants = [];
      job.isAvailable = false;
  
      await job.save({ session });
      await session.commitTransaction();
  
      return { message: "client accepted for job", job };
    } catch (error) {
      await session.abortTransaction();
      throw new Error(`Error accepting proposal: ${error.message}`);
    } finally {
      session.endSession();
    }
  };
  // acceptJobProposal = async (clientId, jobId, workerId, isDirect = false) => {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();
  
  //   try {
  //     // ✅ CORRECTED session usage here
  //     const job = await this.repo.job
  //       .findOne({ _id: jobId, isAvailable: true })
  //       .session(session);
  
  //     if (!job) throw new Error("Job not found or already booked");
  //     if (job.client.toString() !== clientId.toString()) {
  //       throw new Error("Unauthorized access to job");
  //     }
  
  //     if (!isDirect && !job.applicants.map(String).includes(workerId)) {
  //       throw new Error("Worker has not applied for this job");
  //     }
  
  //     job.assignedWorker = workerId;
  //     job.applicants = [];
  //     job.isAvailable = false;
  
  //     await job.save({ session });
  //     await session.commitTransaction();
  
  //     return { message: "Worker accepted for job", job };
  //   } catch (error) {
  //     await session.abortTransaction();
  //     throw new Error(`Error accepting proposal: ${error.message}`);
  //   } finally {
  //     session.endSession();
  //   }
  // };
  
  

  rejectJobProposal = async (clientId, jobId, workerId) => {
    try {
      const job = await this.repo.job.findById(jobId);
  
      if (!job) throw new Error("Job not found");
  
      if (!job.client || job.client.toString() !== clientId.toString()) {
        throw new Error("Unauthorized: You don't own this job");
      }
  
      job.applicants = job.applicants.filter(
        id => id && id.toString() !== workerId.toString()
      );
  
      await job.save();
      return { message: "Worker proposal rejected" };
    } catch (error) {
      throw new Error(`Error rejecting proposal: ${error.message}`);
    }
  };
  
  // ----------------- BOOKINGS -----------------
 
  createBooking = async (data, clientId) => {
    try {
      const { worker, scheduledDate, timeSlot, source, job } = data;
  
      if (!["direct", "application"].includes(source)) 
        throw new Error("Invalid booking source");
  
      // For direct bookings, job is optional
      if (source === "application" && !job) 
        throw new Error("Job ID is required for application booking");
  
      const bookingData = {
        client: clientId,
        worker,
        scheduledDate,
        timeSlot,
        source,
        job: job || undefined
      };
  
      const booking = await this.repo.booking.create(bookingData);
  
      return booking;
    } catch (error) {
      throw new Error(`Error creating booking: ${error.message}`);
    }
  };
  
  
  
  getBooking = async (bookingId) => {
    try {
      return await this.repo.booking.findById(bookingId);
    } catch (error) {
      throw new Error(`Error fetching booking: ${error.message}`);
    }
  };

  listBookings = async (clientId) => {
    try {
      // Correct field name is 'client'
      //console.log(clientId)
      return await this.repo.booking.find({ client: clientId }, ["worker", "job"]);
    } catch (error) {
      throw new Error(`Error listing bookings: ${error.message}`);
    }
  };
  

  // ----------------- FEEDBACK -----------------
  createFeedback = async (data) => {
    try {
      return await this.repo.feedback.create(data);
    } catch (error) {
      throw new Error(`Error creating feedback: ${error.message}`);
    }
  };

  getFeedback = async (feedbackId) => {
    try {
      return await this.repo.feedback.findById(feedbackId);
    } catch (error) {
      throw new Error(`Error fetching feedback: ${error.message}`);
    }
  };

  listUserFeedback = async (userId) => {
    try {
      return await this.repo.feedback.find({ userId });
    } catch (error) {
      throw new Error(`Error listing feedback: ${error.message}`);
    }
  };
}
