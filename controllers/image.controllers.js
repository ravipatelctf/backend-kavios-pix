
import { Image } from "../models/image.models.js";
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req, res) => {
    const { albumId } = req.params;
    const { imageName, tags, isFavorite, comments } = req.body;
    try {
        const file = req.file;
        if (!file) {
            res.status(400).send("No file uploaded")
        }
        // Upload to cloudinary
        const result = await cloudinary.uploader.upload(file.path, {folder: "uploads"});
        console.log("result:", result);

        // Save to mongoDB
        const newImage = new Image({albumId, imageUrl: result.secure_url, size: result.bytes, imageName, tags, isFavorite, comments});
        await newImage.save();

        res.status(200).json({message: "Image uploaded successfully.", imageUrl: result.secure_url});
    } catch (error) {
        console.error("Image upload failed:", error);
        res.status(500).json({message: "Image upload failed.", error: error});
    }
}


export const getAllImagesByAlbumId = async (req, res) => {
    const { albumId } = req.params;
    try {
        const allImages = await Image.find({albumId});
        if (!allImages) {
            return res.status(404).json({error: "No image found."});
        }
        res.status(200).json(allImages);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to fetch images."});
    }
}

export const getImageById = async (req, res) => {
    const { imageId } = req.params;
    try {
        const targetImage = await Image.findById(imageId);
        if (!targetImage) {
            return res.status(404).json({error: "No image found."});
        }
        res.status(200).send(targetImage);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to fetch image."});
    }
}


export const getAllImages = async (req, res) => {
    try {
        const allImages = await Image.find();
        if (!allImages) {
            return res.status(404).json({error: "No image found."});
        }
        res.status(200).send(allImages);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to fetch images."});
    }
}

export const getAllFavoriteImages = async (req, res) => {
    try {
        const favoriteImages = await Image.find({isFavourite: true});
        if (!favoriteImages) {
            return res.status(404).json({error: "No image found."});
        }
        res.status(200).send(favoriteImages);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to fetch favorite images."});
    }
}