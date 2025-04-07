import mongoose from 'mongoose';
import feedbackSchema from '../schemas/feedbackSchema.js';

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
