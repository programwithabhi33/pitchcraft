import mongoose from "mongoose";

const OutputSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: ["cold_email"],
    required: true,
    default: "cold_email",
  },
  tone: {
    type: String,
    enum: ["Formal", "Friendly", "Bold"],
    required: true,
  },
  inputs: {
    role: String,
    service: String,
    clientName: String,
    industry: String,
    context: String,
  },
  content: {
    type: String,
    required: true,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Output || mongoose.model("Output", OutputSchema);
