import CrudRepository from "./crudRepository.js";
import Client from "../models/clientModel.js";
import Job from "../models/jobModel.js";
import Booking from "../models/bookingModel.js";
import Feedback from "../models/feedbackModel.js";

export default class ClientRepository {
  constructor() {
    this.client   = new CrudRepository(Client);
    this.job      = new CrudRepository(Job);
    this.booking  = new CrudRepository(Booking);
    this.feedback = new CrudRepository(Feedback);
  }

  // Custom method to cascade delete all related data
  deleteClientAndAll = async (clientId, options = {}) => {
    const { session } = options;
    await this.client.findByIdAndDelete(clientId, { session });
    await this.job.deleteMany({ client: clientId }, { session });
    await this.booking.deleteMany({ client: clientId }, { session });
    await this.feedback.deleteMany({ client: clientId }, { session });
  };
}
