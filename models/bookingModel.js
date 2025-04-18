import mongoose from "mongoose";
import bookingSchema from "../schemas/bookingSchema.js";

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
