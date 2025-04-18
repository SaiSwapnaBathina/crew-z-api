import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const clientSchema = new mongoose.Schema({
  username : {type : String , required:true , unique:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  name: { 
    type: String, 
    required: true 
  }, 
  phone: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    geoLocation: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  verified: { type: Boolean, default: false },
  preferredCategories: [String],
  notesForWorker: { type: String },
  role: { type: String, enum: ['client', 'worker'], required: true },
}, { timestamps: true });


clientSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

clientSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default  clientSchema;
