import express from "express";
import ClientController from "../controllers/clientController.js";

const clientRouter = express.Router();
const clientController = new ClientController();

// Profile Management
clientRouter.post("/",    clientController.createClient);
clientRouter.get("/:clientId", clientController.getClient);
clientRouter.put("/:clientId", clientController.updateClient);
clientRouter.delete("/:clientId", clientController.deleteClient);

// Job Management
clientRouter.post("/jobs",         clientController.createJob);
clientRouter.get("/jobs",          clientController.listJobs);
clientRouter.get("/jobs/:jobId",   clientController.getJob);
clientRouter.put("/jobs/:jobId",   clientController.updateJob);
clientRouter.delete("/jobs/:jobId",clientController.deleteJob);

// Booking Services
clientRouter.post("/bookings",                clientController.createBooking);
clientRouter.get("/bookings/:bookingId",      clientController.getBooking);

// Feedback
clientRouter.post("/feedback",                        clientController.createFeedback);
clientRouter.get("/feedback/:feedbackId",             clientController.getFeedback);
clientRouter.get("/users/:userId/feedback",           clientController.listUserFeedback);

export default clientRouter;
