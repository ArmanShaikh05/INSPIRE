import mongoose from 'mongoose'
import { Schema } from 'mongoose';

// Define the Student schema
const studentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  password:{
    type:String,
    required:true
  },
  batch:String,
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  contactInformation: {
    phone: {
      type: String,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
  },
  enrollmentNumber: {
    type: String,
    // unique: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  graduationDate: {
    type: Date,
  },
  institute: {
    // type: Schema.Types.ObjectId,
    // ref: 'Institute', // Reference to Institute schema
    // required: true,
    type:String
  },
  course: {
    type: String,
  },
  yearOfStudy: {
    type: Number,
    enum: [1, 2, 3, 4], // Assuming a max of 6 years
  },
  profilePictureUrl: {
    type: String, // URL for the student's profile picture
  },
  guardianDetails: {
    fatherName: {
      type: String,
    },
    motherName: {
      type: String,
    },
    guardianContact: {
      type: String,
    },
  },
  role:{
    type:String,
    default:'Student'
},
  academicRecords: [
    {
      semester: {
        type: Number,
      },
      GPA: {
        type: Number,
        min: 0,
        max: 10, // Assuming GPA is out of 10
      },
      subjects: [
        {
          name: {
            type: String,
          },
          score: {
            type: Number,
            min: 0,
            max: 100, // Assuming subject scores are out of 100
          },
        },
      ],
    },
  ],
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
studentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the model
export const Student=mongoose.model('Student', studentSchema);
