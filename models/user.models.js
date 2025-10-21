// Step 4: Improved `User` Model (with UUID and Mongoose)

import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";  // import and alias uuid.v4() correctly

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: uuidv4,  // use the alias directly, not 'v4'
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,     // prevent duplicate accounts with same email
    },
  },
  {
    timestamps: true,   // adds createdAt and updatedAt automatically
    toJSON: {
      transform(doc, ret) {
        delete ret._id;  // hide internal _id field in responses
        return ret;
      },
    },
  }
);

// Create and export the User model
export const User = mongoose.model("User", userSchema, "users");
