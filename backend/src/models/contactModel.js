const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      trim: true,
      lowercase: true,
      maxlength: [200, 'Email cannot exceed 200 characters'],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        'Please provide a valid email address',
      ],
    },
    service: {
      type: String,
      trim: true,
      default: 'Web development',
    },
    budget: {
      type: String,
      trim: true,
      default: "Let's discuss",
    },
    message: {
      type: String,
      required: [true, 'Please tell us about your project'],
      trim: true,
      minlength: [5, 'Message must be at least 5 characters long'],
      maxlength: [5000, 'Message cannot exceed 5000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'replied', 'closed'],
      default: 'new',
    },
    emailSent: {
      type: Boolean,
      default: false,
    },
    emailMessageId: {
      type: String,
      default: null,
    },
    autoReplySent: {
      type: Boolean,
      default: false,
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
