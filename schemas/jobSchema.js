// import mongoose from "mongoose";

// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   category: { type: String, required: true }, // like Plumbing, Electrical etc.,
//   skillsRequired: { type: [String], default: [] },
//   budget: { type: Number, required: true },

//   location: {
//     street: { type: String },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String },
//     geoLocation: {
//       lat: { type: Number },
//       lng: { type: Number }
//     }
//   },

//   schedule: {
//     preferredDate: { type: Date },
//     timeSlot: { type: String, enum: ['Morning', 'Afternoon', 'Evening'] }
//   },

//   status: { type: String, enum: ['open', 'in-progress', 'completed', 'cancelled'], default: 'open' },

//   client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
//   assignedWorker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker',default: null },
//   applicants: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Worker",
//     default: []
//   }],
//   isAvailable: {
//     type: Boolean,
//     default: true
//   }

// }, { timestamps: true });

// export default jobSchema;
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  // Basic job info
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Plumbing, Electrical
  skillsRequired: { type: [String], default: [] },
  budget: { type: Number, required: true },

  // Location details
  location: {
    street: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String },
    geoLocation: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },

  // Schedule preferences
  schedule: {
    preferredDate: { type: Date },
    timeSlot: { type: String, enum: ['Morning', 'Afternoon', 'Evening'] }
  },

  // Job status
  status: { type: String, enum: ['open', 'in-progress', 'completed', 'cancelled'], default: 'open' },
  isAvailable: { type: Boolean, default: true }, // For direct booking or proposal acceptance

  // Client who posted the job
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },

  // Worker assignments
  assignedWorker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', default: null },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Worker", default: [] }],

  // Optional: for tracking direct booking source
  bookingSource: { type: String, enum: ['direct', 'application'], default: 'application' },

  // Optional: feedback reference after job completion
  feedback: { type: mongoose.Schema.Types.ObjectId, ref: 'Feedback', default: null },

}, { timestamps: true });

// Index commonly queried fields
jobSchema.index({ client: 1 });
jobSchema.index({ assignedWorker: 1 });
jobSchema.index({ isAvailable: 1 });
jobSchema.index({ status: 1 });

export default jobSchema;
