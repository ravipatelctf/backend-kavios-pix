import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    // imageName: {
    //     type: String,
    //     required: true,
    // },
    // tags: [{
    //     type: String,
    //     default: []
    // }],
    // size: {
    //     type: Number,
    //     required: true,
    // }
}, {
    timestamps: true,
});

export const Image = mongoose.model("Image", imageSchema, "images");