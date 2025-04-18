// src/services/ClientService.js

import ClientRepository from "../repositories/clientRepository.js";
import mongoose from "mongoose";

export default class ClientService {
  constructor() {
    this.repo = new ClientRepository();
  }

  // Create client profile
  createClient = async (data) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const client = await this.repo.client.create(data, { session });
      await session.commitTransaction();
      return client;
    } catch (error) {
      await session.abortTransaction();
      throw Error(`Error while creating client: ${error.message}`);
    } finally {
      session.endSession();
    }
  };

  // Fetch a single client
  getClient = async (clientId) => {
    try {
      const client = await this.repo.client.findById(clientId);
      return client;
    } catch (error) {
      throw Error(`Error while fetching client: ${error.message}`);
    }
  };

  // Update client profile
  updateClient = async (clientId, data) => {
    try {
      const updated = await this.repo.client.findByIdAndUpdate(clientId, data);
      return updated;
    } catch (error) {
      throw Error(`Error while updating client: ${error.message}`);
    }
  };

  // Delete client and cascade related data
  deleteClient = async (clientId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await this.repo.deleteClientAndAll(clientId, { session });
      await session.commitTransaction();
      return { message: "Client and related records deleted" };
    } catch (error) {
      await session.abortTransaction();
      throw Error(`Error while deleting client: ${error.message}`);
    } finally {
      session.endSession();
    }
  };

  // Create a new job for client
  createJob = async (data) => {
    try {
      const job = await this.repo.job.create(data);
      return job;
    } catch (error) {
      throw Error(`Error while creating job: ${error.message}`);
    }
  };

  // List all jobs (optionally filter by client)
  listJobs = async (filter = {}) => {
    try {
      const jobs = await this.repo.job.find(filter);
      return jobs;
    } catch (error) {
      throw Error(`Error while listing jobs: ${error.message}`);
    }
  };

  // Get a specific job
  getJob = async (jobId) => {
    try {
      const job = await this.repo.job.findById(jobId);
      return job;
    } catch (error) {
      throw Error(`Error while fetching job: ${error.message}`);
    }
  };

  // Update a job
  updateJob = async (jobId, data) => {
    try {
      const updated = await this.repo.job.findByIdAndUpdate(jobId, data);
      return updated;
    } catch (error) {
      throw Error(`Error while updating job: ${error.message}`);
    }
  };

  // Delete a job
  deleteJob = async (jobId) => {
    try {
      await this.repo.job.findByIdAndDelete(jobId);
      return { message: "Job deleted" };
    } catch (error) {
      throw Error(`Error while deleting job: ${error.message}`);
    }
  };

  // Book a service
  createBooking = async (data) => {
    try {
      const booking = await this.repo.booking.create(data);
      return booking;
    } catch (error) {
      throw Error(`Error while creating booking: ${error.message}`);
    }
  };

  // Fetch a booking
  getBooking = async (bookingId) => {
    try {
      const booking = await this.repo.booking.findById(bookingId);
      return booking;
    } catch (error) {
      throw Error(`Error while fetching booking: ${error.message}`);
    }
  };

  // Submit feedback
  createFeedback = async (data) => {
    try {
      const feedback = await this.repo.feedback.create(data);
      return feedback;
    } catch (error) {
      throw Error(`Error while creating feedback: ${error.message}`);
    }
  };

  // Get specific feedback
  getFeedback = async (feedbackId) => {
    try {
      const fb = await this.repo.feedback.findById(feedbackId);
      return fb;
    } catch (error) {
      throw Error(`Error while fetching feedback: ${error.message}`);
    }
  };

  // List all feedback for a user
  listUserFeedback = async (userId) => {
    try {
      const list = await this.repo.feedback.find({ user: userId });
      return list;
    } catch (error) {
      throw Error(`Error while listing user feedback: ${error.message}`);
    }
  };
}
