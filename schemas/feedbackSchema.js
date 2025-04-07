import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },

  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String },
  isAnonymous: { type: Boolean, default: false },

  professionalism: { type: Number, min: 1, max: 5 },
  punctuality: { type: Number, min: 1, max: 5 },
  qualityOfWork: { type: Number, min: 1, max: 5 }

}, { timestamps: true });

export default feedbackSchema;
