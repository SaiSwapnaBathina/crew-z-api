

import express from "express";
import { authenticateUser } from "../middlewares/auth.js"; // JWT decoder that sets req.user
import { authRole } from "../middlewares/authRole.js";
import ClientController from "../controllers/clientController.js";

const clientRouter = express.Router();
const clientController = new ClientController();


//----------direct booking------- static routes must be first as per express order otherwise errors
clientRouter.get("/bookings", authenticateUser, authRole("client"), clientController.listBookings); // List all client bookings
// ----------------- FIND WORKERS -----------------
clientRouter.get("/workers", authenticateUser, authRole("client"), clientController.listWorkers);


// ----------------- JOB MANAGEMENT -----------------
// Create a new job
clientRouter.post("/jobs", authenticateUser, authRole("client"), clientController.createJob);

// List all jobs posted by this client
clientRouter.get("/jobs", authenticateUser, authRole("client"), clientController.listJobs);


//----------direct booking------- static routes must be first as per express order otherwise errors"client"), clientController.listBookings); // List all client bookings
clientRouter.get("/bookings/:bookingId", authenticateUser, authRole("client"), clientController.getBooking);



// Get single job details
clientRouter.get("/jobs/:jobId", authenticateUser, authRole("client"), clientController.getJob);

// Update job
clientRouter.put("/jobs/:jobId", authenticateUser, authRole("client"), clientController.updateJob);

// Delete job
clientRouter.delete("/jobs/:jobId", authenticateUser, authRole("client"), clientController.deleteJob);

// ----------------- JOB APPLICATION MANAGEMENT -----------------
// Accept a worker application for a job
clientRouter.post(
  "/jobs/:jobId/accept/:workerId",
  authenticateUser,
  authRole("client"),
  clientController.acceptJobProposal
);

// Reject a worker application (can be handled as delete)
clientRouter.delete(
  "/jobs/:jobId/reject/:workerId",
  authenticateUser,
  authRole("client"),
  clientController.rejectJobProposal
);


// ----------------- PROFILE MANAGEMENT -----------------
clientRouter.post("/", clientController.createClient); // Optional: only if admin can create
clientRouter.get("/:clientId", authenticateUser, authRole("client"), clientController.getClient);
clientRouter.put("/:clientId", authenticateUser, authRole("client"), clientController.updateClient);
clientRouter.delete("/:clientId", authenticateUser, authRole("client"), clientController.deleteClient);


// ----------------- BOOKINGS -----------------
// Direct booking by client
clientRouter.post("/bookings", authenticateUser, authRole("client"), clientController.createBooking);



// ----------------- FEEDBACK -----------------
clientRouter.post("/feedback", authenticateUser, clientController.createFeedback);
clientRouter.get("/feedback/:feedbackId", authenticateUser, clientController.getFeedback);
clientRouter.get("/users/:userId/feedback", authenticateUser, clientController.listUserFeedback);

export default clientRouter;

