import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  title: { type: String, required: true },          // Name of the donation
  description: { type: String, required: true },    // Details or message
  quantity: { type: Number, required: true, min: 1 }, // Quantity of pads
  location: { type: String, required: true },
  status: { type: String, enum: ["available", "booked"], default: "available" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Donor
}, { timestamps: true });

export default mongoose.model("Donation", donationSchema);
