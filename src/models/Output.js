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

// Force refresh the model in development to ensure schema changes are picked up
if (mongoose.models.Output) {
  delete mongoose.models.Output;
}

const Output = mongoose.model("Output", OutputSchema);

export default Output;
