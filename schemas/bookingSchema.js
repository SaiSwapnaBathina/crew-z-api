import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
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

  serviceNotes: {
    type: String,
    default: ""
  }

}, { timestamps: true });

export default bookingSchema;
