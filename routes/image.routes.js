import express from "express";
import { getAllImages, getAllFavoriteImages } from "../controllers/image.controllers.js";

const router = express();

// Read
router.get("/", getAllImages);
router.get("/favorites", getAllFavoriteImages);

export default router;