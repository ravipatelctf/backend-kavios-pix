// src/models/user.models.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.virtual('userId').get(function() {
  return this._id.toString();
});

export const User = mongoose.model("User", userSchema, "users");
