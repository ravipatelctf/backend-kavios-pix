import { initializeDatabase } from "./db/db.connect.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import googleAuthRoutes from "./routes/googleAuth.js";
import albumRoutes from "./routes/album.routes.js";
import { verifyJwt } from "./middlewares/verifyJwt.js";

initializeDatabase();
const app = express();

// app.use(express.json())

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

app.use("/albums", albumRoutes);

// Auth check route
app.get("/auth/check", verifyJwt, (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
});


// Home route
app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to KaviosPix REST API Server." });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT:${process.env.PORT}`);
});
