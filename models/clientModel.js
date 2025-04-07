import mongoose from 'mongoose';
import clientSchema from '../schemas/clientSchema.js';

const Client = mongoose.model("Client", clientSchema);

export default Client;
