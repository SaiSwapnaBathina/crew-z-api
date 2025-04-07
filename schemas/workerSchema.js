import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  bio: { type: String }, 
  skills: { type: [String], required: true }, 
  experienceYears: { type: Number, default: 0 },

  availability: {
    days: { type: [String], default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
    timeSlots: { type: [String], default: ["Morning", "Afternoon", "Evening"] }
  },

  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },

  workHistory: [{
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    review: { type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }
  }],

  documents: {
    aadharNumber: { type: String },
    idProofURL: { type: String },
  },

  languages: { type: [String], default: ["English"] },

  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }

}, { timestamps: true });

export default workerSchema;
