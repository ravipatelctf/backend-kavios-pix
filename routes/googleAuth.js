
// routes/googleAuth.js

import express from "express";
import { googleLogin, googleCallback, logout } from "../controllers/googleAuth.controller.js";

const router = express.Router();

// Step 1: Redirect to Google's OAuth 2.0 consent page
router.get("/google", googleLogin);

// Step 2: Handle the OAuth2 callback from Google
router.get("/google/callback", googleCallback);

// Step 3: Logout route to clear cookie
router.post("/logout", logout);


export default router;
