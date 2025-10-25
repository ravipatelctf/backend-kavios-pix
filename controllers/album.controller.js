import { Album } from "../models/album.models.js";

// Create
export const createAlbum = async (req, res) => {
    const { name, description, ownerId } = req.body;
    try {
        const newAlbum = new Album({ name, description, ownerId });
        await newAlbum.save();
        res.status(201).json({message: "Album created successfully."});
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Failed to create album."})
    }
}

// Read
export const getAllAlbums = async (req, res) => {
    try {
        const allAlbums = await Album.find();
        if (!allAlbums) {
            return res.status(404).json({error: "Albums Not Found."});
        }
        res.status(200).json({message: "Albums data fetched successfully.", data: allAlbums});
    } catch (error) {
        res.status(500).json({error: "Failed to fetch albums data."});
    }
}

// find by id
export const getAlbumById = async (req, res) => {
    try {
        const targetAlbum = await Album.findById(req.params.albumId);
        if (!targetAlbum) {
            return res.status(404).json({error: "Album Not Found."});
        }
        res.status(200).json({message: "Album data fetched successfully.", data: targetAlbum});
    } catch (error) {
        res.status(500).json({error: "Failed to fetch album data."});
    }
}

// Update
export const updateAlbumById = async (req, res) => {
    const { albumId } = req.params;
    const { name, description } = req.body;
    try {
        const updatedAlbum = await Album.findByIdAndUpdate(albumId, { name, description }, {new: true});
        if (!updatedAlbum) {
            return res.status(404).json({error: "Album Not Found"});
        }
        res.status(200).json({message: "Album updated successfully", data: updatedAlbum});
    } catch (error) {
        res.status(500).json({error: "Failed to update album."});
    }
}


// Delete
export const deleteAlbumById = async (req, res) => {
    const { albumId } = req.params;
    try {
        const deletedAlbum = await Album.findByIdAndDelete(albumId);
        if (!deletedAlbum) {
            return res.status(404).json({error: "Album Not Found."});
        }
        res.status(200).json({message: "Album deleted successfully."});
    } catch (error) {
        res.status(500).json({error: "Failed to delete album."});
    }
}