import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Request", RequestSchema);
