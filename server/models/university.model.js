import mongoose from 'mongoose'
import { Schema } from 'mongoose';

// Define the University schema
const universitySchema = new Schema({
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
  establishedYear: {
    type: Number,
  },
  institutes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Institute', // Reference to Institute schema
    },
  ],
  accreditation: {
    type: String, // Accreditation info (e.g., UGC, NAAC, etc.)
  },
  logoUrl: {
    type: String, // URL for the university logo
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
universitySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the model
export const University=mongoose.model('University', universitySchema);
