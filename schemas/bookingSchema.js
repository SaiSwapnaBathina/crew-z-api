// // import mongoose from "mongoose";

// // const bookingSchema = new mongoose.Schema({
// //   job: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "Job",
// //     required: true
// //   },

// //   client: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "Client",
// //     required: true
// //   },

// //   worker: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "Worker",
// //     required: true
// //   },

// //   scheduledDate: {
// //     type: Date,
// //     required: true
// //   },

// //   timeSlot: {
// //     type: String,
// //     enum: ["Morning", "Afternoon", "Evening"],
// //     required: true
// //   },

// //   status: {
// //     type: String,
// //     enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
// //     default: "pending"
// //   },

// //   serviceNotes: {
// //     type: String,
// //     default: ""
// //   },
// //   source: {
// //     type: String,
// //     enum: ["application", "direct"],
// //     default: "application"
// //   }

// // }, { timestamps: true });

// // export default bookingSchema;
// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema({
//   job: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Job",
//     required: true
//   },
//   client: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Client",
//     required: true
//   },
//   worker: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Worker",
//     required: true
//   },
//   scheduledDate: {
//     type: Date,
//     required: true
//   },
//   timeSlot: {
//     type: String,
//     enum: ["Morning", "Afternoon", "Evening"],
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
//     default: "pending"
//   },
//   source: {
//     type: String,
//     enum: ["application", "direct"], // "direct" for client-booked, "application" for worker-applied
//     required: true
//   },
//   paymentStatus: {
//     type: String,
//     enum: ["pending", "paid", "failed", "refunded"],
//     default: "pending"
//   },
//   serviceNotes: {
//     type: String,
//     default: ""
//   },
//   // Optional: Ratings & feedback after service completion
//   rating: {
//     type: Number,
//     min: 1,
//     max: 5
//   },
//   feedback: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Feedback"
//   }
// }, { timestamps: true });

// // Index to prevent double-booking of the same worker for same date/time
// bookingSchema.index({ worker: 1, scheduledDate: 1, timeSlot: 1 }, { unique: true });

// export default bookingSchema;
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: function() { return this.source === "application"; } // only required for application bookings
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    enum: ["Morning", "Afternoon", "Evening"],
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
    default: "pending"
  },
  source: {
    type: String,
    enum: ["application", "direct"], // direct = client booked, application = worker applied
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending"
  },
  serviceNotes: {
    type: String,
    default: ""
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  feedback: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feedback"
  }
}, { timestamps: true });

// Prevent double-booking of same worker at same date/time
bookingSchema.index({ worker: 1, scheduledDate: 1, timeSlot: 1 }, { unique: true });

export default bookingSchema;
