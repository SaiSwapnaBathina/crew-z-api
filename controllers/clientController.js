// import ClientService from "../services/clientService.js";

// export default class ClientController {
//   constructor() {
//     this.service = new ClientService();
//   }

//   // Profile Management
//   createClient = async (req, res) => {
//     try {
//       const client = await this.service.createClient(req.body);
//       res.status(201).json(client);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   getClient = async (req, res) => {
//     try {
//       const client = await this.service.getClient(req.params.clientId);
//       res.status(200).json(client);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   updateClient = async (req, res) => {
//     try {
//       const updated = await this.service.updateClient(req.params.clientId, req.body);
//       res.status(200).json(updated);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   deleteClient = async (req, res) => {
//     try {
//       await this.service.deleteClient(req.params.clientId);
//       res.status(200).json({ message: "Client deleted" });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   // Job Management
//   createJob = async (req, res) => {
//     try {
//       const job = await this.service.createJob(req.body);
//       res.status(201).json(job);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   listJobs = async (req, res) => {
//     try {
//       const jobs = await this.service.listJobs();
//       res.status(200).json(jobs);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   getJob = async (req, res) => {
//     try {
//       const job = await this.service.getJob(req.params.jobId);
//       res.status(200).json(job);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   updateJob = async (req, res) => {
//     try {
//       const job = await this.service.updateJob(req.params.jobId, req.body);
//       res.status(200).json(job);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   deleteJob = async (req, res) => {
//     try {
//       await this.service.deleteJob(req.params.jobId);
//       res.status(200).json({ message: "Job deleted" });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//    // Accept Job Proposal
//    acceptJobProposal = async (req, res) => {
//     try {
//       const { jobId, workerId } = req.params;
//       const clientId = req.user._id;
//       const result = await this.service.acceptJobProposal(clientId, jobId, workerId);
//       res.status(200).json(result);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   // Booking Services
//   createBooking = async (req, res) => {
//     try {
//       const clientId = req.user._id;
//       const booking = await this.service.createBooking({ ...req.body, clientId });
//       res.status(201).json(booking);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   getBooking = async (req, res) => {
//     try {
//       const booking = await this.service.getBooking(req.params.bookingId);
//       res.status(200).json(booking);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };


//   // Feedback
//   createFeedback = async (req, res) => {
//     try {
//       const feedback = await this.service.createFeedback(req.body);
//       res.status(201).json(feedback);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   getFeedback = async (req, res) => {
//     try {
//       const feedback = await this.service.getFeedback(req.params.feedbackId);
//       res.status(200).json(feedback);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

//   listUserFeedback = async (req, res) => {
//     try {
//       const list = await this.service.listUserFeedback(req.params.userId);
//       res.status(200).json(list);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
// }
import ClientService from "../services/clientService.js";

export default class ClientController {
  constructor() {
    this.service = new ClientService();
  }

  // ----------------- PROFILE MANAGEMENT -----------------
  createClient = async (req, res) => {
    try {
      const client = await this.service.createClient(req.body);
      res.status(201).json(client);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getClient = async (req, res) => {
    try {
      const client = await this.service.getClient(req.params.clientId);
      res.status(200).json(client);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateClient = async (req, res) => {
    try {
      const updated = await this.service.updateClient(req.params.clientId, req.body);
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteClient = async (req, res) => {
    try {
      await this.service.deleteClient(req.params.clientId);
      res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  //-----------LIST WORKERS -----------
  listWorkers = async (req, res) => {
    try {
      const workers = await this.service.listWorkers();
      res.status(200).json(workers);
    } catch (error) {
      res.status(400).json({ error: `Error fetching workers: ${error.message}` });
    }
  };
  

  // ----------------- JOB MANAGEMENT -----------------
  createJob = async (req, res) => {
    try {
      const job = await this.service.createJob({ ...req.body, clientId: req.user._id });
      res.status(201).json(job);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

 
  listJobs = async (req, res) => {
    try {
      //console.log("req.user inside listJobs:", req.user); // 🔍 debug this
      const clientId = req.user?.id || req.user?._id;
      if (!clientId) {
        return res.status(400).json({ error: "Client ID missing in token." });
      }
  
      const jobs = await this.service.listJobs(clientId);
      res.status(200).json(jobs);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  getJob = async (req, res) => {
    try {
      const job = await this.service.getJob(req.params.jobId);
      res.status(200).json(job);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateJob = async (req, res) => {
    try {
      const job = await this.service.updateJob(req.params.jobId, req.body);
      res.status(200).json(job);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteJob = async (req, res) => {
    try {
      await this.service.deleteJob(req.params.jobId);
      res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // ----------------- JOB APPLICATIONS -----------------
  acceptJobProposal = async (req, res) => {
    try {
      const { jobId, workerId } = req.params;
      const clientId = req.user?.id || req.user?._id;
      console.log(clientId)
      const result = await this.service.acceptJobProposal(clientId, jobId, workerId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  rejectJobProposal = async (req, res) => {
    try {
      const { jobId, workerId } = req.params;
      const clientId = req.user?.id || req.user?._id;
      const result = await this.service.rejectJobProposal(clientId, jobId, workerId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // ----------------- BOOKINGS -----------------
  
  createBooking = async (req, res) => {
    try {
      const clientId = req.user?.id || req.user?._id; // Always get client ID from logged-in user
      const booking = await this.service.createBooking(req.body, clientId);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  getBooking = async (req, res) => {
    try {
      const booking = await this.service.getBooking(req.params.bookingId);
      res.status(200).json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  listBookings = async (req, res) => {
    try {
      const clientId = req.user?.id || req.user?._id; // use logged-in client ID
      //console.log(clientId);
      const bookings = await this.service.listBookings(clientId);
      res.status(200).json(bookings);
    } catch (error) {
      res.status(400).json({ error: `Error fetching bookings: ${error.message}` });
    }
  };
  
  

  // ----------------- FEEDBACK -----------------
  createFeedback = async (req, res) => {
    try {
      const feedback = await this.service.createFeedback({ ...req.body, userId: req.user._id });
      res.status(201).json(feedback);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getFeedback = async (req, res) => {
    try {
      const feedback = await this.service.getFeedback(req.params.feedbackId);
      res.status(200).json(feedback);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  listUserFeedback = async (req, res) => {
    try {
      const feedbacks = await this.service.listUserFeedback(req.params.userId);
      res.status(200).json(feedbacks);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
