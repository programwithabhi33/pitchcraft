import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
    // Null if Google OAuth login
  },
  googleId: {
    type: String,
  },
  avatar: {
    type: String,
  },
  plan: {
    type: String,
    enum: ['free'],
    default: 'free',
    required: true,
  },
  usageCount: {
    type: Number,
    default: 0,
    required: true,
  },
  usageResetAt: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      date.setDate(1);
      return date;
    },
    required: true,
  },
  senderName: String,
  senderRole: String,
  senderCompany: String,
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
