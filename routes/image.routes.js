import express from "express";
import { getAllImages, getAllFavouriteImages, toggleIsFavourite } from "../controllers/image.controllers.js";

const router = express();

// Read
router.get("/", getAllImages);
router.get("/favourites", getAllFavouriteImages);
router.post("/:imageId/favourite", toggleIsFavourite);

export default router;