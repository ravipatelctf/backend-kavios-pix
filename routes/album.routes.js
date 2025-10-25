import express from "express";
import { createAlbum, getAllAlbums, updateAlbumById, deleteAlbumById, getAlbumById } from "../controllers/album.controller.js";
import { uploadImage, getAllImagesByAlbumId } from "../controllers/image.controllers.js";
import multer from "multer";
import bodyParser from "body-parser";


const router = express.Router();
router.use(express.json());
router.use(bodyParser.json());

// Multer setup
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Create
router.post("/", createAlbum);

// upload image to a album
router.post("/:albumId/images", upload.single("image"), uploadImage);

// Read
router.get("/", getAllAlbums);

// get album by id
router.get("/:albumId", getAlbumById);

// get all images by albumId
router.get("/:albumId/images", getAllImagesByAlbumId);

// Update
router.put("/:albumId", updateAlbumById);

// Delete
router.delete("/:albumId", deleteAlbumById);

export default router;