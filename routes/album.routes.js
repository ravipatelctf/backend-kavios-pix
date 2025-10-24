import express from "express";
import { createAlbum, getAllAlbums, updateAlbumById, deleteAlbumById } from "../controllers/album.controller.js";

const router = express.Router();
router.use(express.json());

// Create
router.post("/", createAlbum);

// Read
router.get("/", getAllAlbums);

// Update
router.put("/:albumId", updateAlbumById);

// Delete
router.delete("/:albumId", deleteAlbumById);

export default router;