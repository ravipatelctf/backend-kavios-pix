// backend/middlewares/verifyJwt.js
import jwt from "jsonwebtoken";

export function verifyJwt(req, res, next) {
  // Read token from cookie instead of headers
  const token = req.cookies?.authToken;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}
