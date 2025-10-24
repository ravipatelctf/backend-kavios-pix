import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
        type: String,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sharedUsers: [{
        type: String,
    }]
  },
  {
    timestamps: true,
  }
);

export const Album = mongoose.model("Album", albumSchema, "albums");
