
// routes/googleAuth.js

const express = require("express");
const axios = require("axios");
const { User } = require("../models/user.models");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Step 1: Redirect to Google's OAuth 2.0 consent page
router.get("/google", (req, res) => {
  const redirectUri = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(`${redirectUri}?${params.toString()}`);
});

// Step 2: Handle the OAuth2 callback from Google
router.get("/google/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "Authorization code not provided" });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", null, {
      params: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
        code,
      },
    });

    const { access_token } = tokenResponse.data;

    // Fetch user info using the access token
    const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { email } = userInfo.data;

    // Check if user exists or create one
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Example in backend callback
    res.cookie("authToken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard?email=${email}`);

  } catch (error) {
    console.error("OAuth error:", error.message);
    res.status(500).json({ error: "Failed to authenticate with Google" });
  }
});

// Step 3: Logout route to clear cookie
router.post("/logout", (req, res) => {
  res.cookie("authToken", "", {
    expires: new Date(0), // immediately expires
  });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
