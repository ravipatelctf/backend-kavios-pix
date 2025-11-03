import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    size: {
        type: Number
    },
    imageName: {
        type: String,
    },
    tags: [{
        type: String,
        default: [],
    }],
    isFavourite: {
        type: Boolean,
        default: false
    },
    comments: [{
        type: String,
        default: [],
    }]
}, {
    timestamps: true,
});

export const Image = mongoose.model("Image", imageSchema, "images");