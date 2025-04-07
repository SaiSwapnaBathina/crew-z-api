import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    geoLocation: {
      lat: { type: Number }, // future integration: GPS or Map APIs
      lng: { type: Number }
    }
  },
  verified: { type: Boolean, default: false }, // trust signal for workers
  preferredCategories: [String], // plumbing, carpentry, gardening, etc.
  notesForWorker: { type: String }, // “Has a pet”, “Elderly care required”, etc.

}, { timestamps: true });

export default clientSchema;
