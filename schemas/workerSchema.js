import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const workerSchema = new mongoose.Schema({
  username : {type : String , required:true , unique:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Added required password field
  role: { type: String, default: "worker" }, // Add this
  name: { 
    type: String, 
    required: true 
  },
  phone: { type: String, required: true },
  bio: { type: String },
  skills: { type: [String], required: true },
  experienceYears: { type: Number, default: 0 },
  
  availability: {
    days: { type: [String], default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
    timeSlots: { type: [String], default: ["Morning", "Afternoon", "Evening"] }
  },
  workHistory: [{
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    review: { type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }
  }],
  documents: {
    aadharNumber: { type: String },
    idProofURL: { type: String }
  },
  languages: { type: [String], default: ["English"] },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Pre-save hook to hash password before saving
workerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Enhanced matchPassword method using bcrypt.compare
workerSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default workerSchema;
