import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // like Plumbing, Electrical etc.,
  skillsRequired: { type: [String], default: [] },
  budget: { type: Number, required: true },

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

  schedule: {
    preferredDate: { type: Date },
    timeSlot: { type: String, enum: ['Morning', 'Afternoon', 'Evening'] }
  },

  status: { type: String, enum: ['open', 'in-progress', 'completed', 'cancelled'], default: 'open' },

  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  assignedWorker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },

}, { timestamps: true });

export default jobSchema;
