import express from "express";
import { createAlbum, getAllAlbums, updateAlbumById, deleteAlbumById, getAlbumById } from "../controllers/album.controller.js";
import { uploadImage, getAllImagesByAlbumId, getImageById } from "../controllers/image.controllers.js";
import multer from "multer";


const router = express.Router();

// Multer setup
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Create
router.post("/", createAlbum);

// upload image to a album
router.post("/:albumId/images", upload.single("image"), uploadImage);

router.use(express.json());

// Read
router.get("/", getAllAlbums);

// get album by id
router.get("/:albumId", getAlbumById);

// get all images by albumId
router.get("/:albumId/images", getAllImagesByAlbumId);

router.get("/:albumId/images/:imageId", getImageById);

// Update
router.post("/:albumId", updateAlbumById);

// Delete
router.delete("/:albumId", deleteAlbumById);

export default router;