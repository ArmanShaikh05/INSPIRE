import mongoose from 'mongoose'
import { Schema } from 'mongoose';

// Define the Institute schema
const instituteSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  location: {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    postalCode: {
      type: String,
    },
  },
  contactInformation: {
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  departments: [
    {
      name: {
        type: String,
      },
      hod: {
        type: String, // Head of Department name
      },
      contactEmail: {
        type: String,
      },
    },
  ],
  alumni: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Alumni', // Reference to the Alumni schema
    },
  ],
  eventsOrganized: [
    {
      eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event', // Reference to the Event schema
      },
      eventName: {
        type: String,
      },
      eventDate: {
        type: Date,
      },
    },
  ],
  establishedYear: {
    type: Number,
  },
  instituteRanking: {
    type: Number, // Ranking of the institute
  },
  logoUrl: {
    type: String, // URL to the institute's logo
  },
  description: {
    type: String, // Brief description of the institute
  },
  role:{
    type:String,
    default:'Institute'
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
instituteSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the model
export const Institute=mongoose.model('Institute', instituteSchema);
