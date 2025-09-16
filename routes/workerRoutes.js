// import express from 'express';
// import WorkerController from '../controllers/workerController.js';

// const workerRouter = express.Router();
// const controller = new WorkerController();

// // ——— Profile Management ———
// workerRouter.post('/', controller.createProfile);
// workerRouter.get('/:workerId', controller.getProfile);
// workerRouter.put('/:workerId', controller.updateProfile);
// workerRouter.delete('/:workerId', controller.deleteProfile);

// // ——— Job Applications ———
// workerRouter.post('/jobs/:jobId/apply', controller.applyForJob);
// workerRouter.get('/:workerId/applications', controller.viewAppliedJobs);
// workerRouter.get('/:workerId/applications/:applicationId/status', controller.getApplicationStatus);

// export default workerRouter;
import express from 'express';
import WorkerController from '../controllers/workerController.js';
import { authenticateUser } from '../middlewares/auth.js';
import { authRole } from '../middlewares/authRole.js';

const workerRouter = express.Router();
const controller = new WorkerController();

// View all open jobs posted by any client
workerRouter.get('/jobs', authenticateUser, authRole('worker'), controller.listOpenJobs);//static route above dynamic route to avoid confusion

// ——— PROFILE MANAGEMENT ———
workerRouter.post('/', authenticateUser, authRole('worker'), controller.createProfile);
workerRouter.get('/:workerId', authenticateUser, authRole('worker'), controller.getProfile);
workerRouter.put('/:workerId', authenticateUser, authRole('worker'), controller.updateProfile);
workerRouter.delete('/:workerId', authenticateUser, authRole('worker'), controller.deleteProfile);

// ——— JOBS VIEW & APPLICATION ———


// Apply for a job
workerRouter.post('/jobs/:jobId/apply', authenticateUser, authRole('worker'), controller.applyForJob);

// View all jobs this worker has applied for
workerRouter.get('/:workerId/applications', authenticateUser, authRole('worker'), controller.viewAppliedJobs);

// Get status of a specific application
workerRouter.get('/:workerId/applications/:applicationId/status', authenticateUser, authRole('worker'), controller.getApplicationStatus);

// ——— BOOKINGS ———
// List all bookings assigned to this worker
workerRouter.get('/:workerId/bookings', authenticateUser, authRole('worker'), controller.listBookings);

// Get details of a single booking
workerRouter.get('/:workerId/bookings/:bookingId', authenticateUser, authRole('worker'), controller.getBooking);

// ——— FEEDBACK ———
// List all feedback received for this worker
workerRouter.get('/:workerId/feedback', authenticateUser, authRole('worker'), controller.listFeedback);

export default workerRouter;
