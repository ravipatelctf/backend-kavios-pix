const { initializeDatabase } = require("./db/db.connect");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const googleAuthRoutes = require("./routes/googleAuth");
const { verifyJwt } = require("./middlewares/verifyJwt");

initializeDatabase();
const app = express();

// parse JSON body
app.use(express.json());

// parse cookies
app.use(cookieParser());

// enable CORS for frontend with credentials
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// mount oauth routes
app.use("/auth", googleAuthRoutes);

// Auth check route
app.get("/auth/check", verifyJwt, (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
});


// Home route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to KaviosPix REST API Server." });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT:${process.env.PORT}`);
});
