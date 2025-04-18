import express from "express";
import { authenticateUser } from "../middlewares/auth.js"; // JWT decoder that sets req.user
import { authRole } from "../middlewares/authRole.js";
import ClientController from "../controllers/clientController.js";

const clientRouter = express.Router();
const clientController = new ClientController();

// Profile Management
clientRouter.post("/",    clientController.createClient);
clientRouter.get("/:clientId", clientController.getClient);
clientRouter.put("/:clientId", clientController.updateClient);
clientRouter.delete("/:clientId", clientController.deleteClient);

// Job Management
clientRouter.post("/jobs",authenticateUser, authRole("client"),        clientController.createJob);
clientRouter.get("/jobs",          clientController.listJobs);
clientRouter.get("/jobs/:jobId",   clientController.getJob);
clientRouter.put("/jobs/:jobId",authenticateUser,authRole("client"),   clientController.updateJob);
clientRouter.delete("/jobs/:jobId",authenticateUser,authRole("client"),clientController.deleteJob);

// Booking Services
clientRouter.post("/bookings",                clientController.createBooking);
clientRouter.get("/bookings/:bookingId",      clientController.getBooking);

// Feedback
clientRouter.post("/feedback",                        clientController.createFeedback);
clientRouter.get("/feedback/:feedbackId",             clientController.getFeedback);
clientRouter.get("/users/:userId/feedback",           clientController.listUserFeedback);

export default clientRouter;
