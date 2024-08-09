// models/Application.js
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['applied', 'interview', 'offer', 'rejected'],
    default: 'applied',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Application', applicationSchema);
