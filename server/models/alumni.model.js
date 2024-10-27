import mongoose from 'mongoose'
import { Schema } from 'mongoose';

// Define the Alumni schema
const alumniSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  password:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  linkedInProfile: {
    type: String,
    required: true,
    unique: true,
  },
  employmentStatus: {
    currentEmployer: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    careerPath: {
      type: String,
    },
    yearsOfExperience: {
      type: Number,
    },
    expertiseAreas: {
      type: [String],
    },
  },
  contactInformation: {
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  institute: {
    type: Schema.Types.ObjectId,
    ref: 'Institute', // Reference to Institute Schema
    required: true,
  },
  verificationStatus: {
    type: String,
    enum: ['Pending', 'Verified', 'Rejected'],
    default: 'Pending',
  },
  hodVerificationDate: {
    type: Date,
  },
  eventsParticipated: [
    {
      eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
      role: {
        type: String,
        enum: ['Speaker', 'Mentor', 'Panelist'],
      },
      participationDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  badges: [
    {
      badgeName: {
        type: String,
        enum: ['Conferencing Enthusiast', 'Mentorship Master', 'Referral Expert', 'Global Elite', 'Expert Leader'],
      },
      dateAwarded: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  rankings: {
    totalPoints: {
      type: Number,
      default: 0,
    },
    currentRank: {
      type: String,
    },
  },
  role:{
    type:String,
    default:'Alumni'
},
  blockchainHash: {
    type: String, // Store the blockchain verification hash here
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware for automatic timestamping
alumniSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the model
export const Alumni=mongoose.model('Alumni', alumniSchema);
