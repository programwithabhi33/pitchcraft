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
  },
  googleId: {
    type: String,
  },
  avatar: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationOTP: {
    type: String,
  },
  verificationOTPExpires: {
    type: Date,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
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
  senderWebsite: String,
  senderTone: {
    type: String,
    default: 'Friendly',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Force refresh the model in development to ensure schema changes are picked up
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.model('User', UserSchema);

export default User;
