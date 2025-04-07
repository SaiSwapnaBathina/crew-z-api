import mongoose from 'mongoose';
import workerSchema from '../schemas/workerSchema.js';

const Worker = mongoose.model("Worker", workerSchema);

export default Worker;
