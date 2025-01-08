import dotenv from "dotenv";
dotenv.config();

import express from "express";
import compression from "compression";
import cors from "cors";
import path from "path";

import { travel } from "./routes/travels.mjs";
import { booking } from "./routes/bookings.mjs";
import usersRoutes from "./routes/users.mjs";
import authenticate from "./middleware/authenticate.mjs";
import swaggerDocs from "./swagger.mjs";
import pool from "./db/da.mjs";

const app = express();
const port = process.env.PORT || 3000;

// Debug JWT_SECRET
console.log("JWT_SECRET:", process.env.JWT_SECRET);
if (!process.env.JWT_SECRET) {
  console.error("Error: JWT_SECRET is not set!");
  process.exit(1);
}

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(cors());
app.use(express.static(path.resolve(".")));

app.use("/components", express.static(path.resolve("components")));
app.use("/modules", express.static(path.resolve("modules")));
app.use("/images", express.static(path.resolve("images")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.resolve("frontend/index.html"));
});
app.get("/frontend/app.js", (req, res) => {
  res.sendFile(path.resolve("frontend/app.js"));
});

app.get("/api/travels", (req, res) => travel.get(req, res));
app.post("/api/travels", (req, res) => travel.post(req, res));

app.get("/api/bookings", authenticate, (req, res) => booking.get(req, res));
app.post("/api/bookings", authenticate, (req, res) => booking.post(req, res));

app.use("/api/users", usersRoutes);

app.get("/api/destinations", async (req, res) => {
  try {
    const result = await pool.query("SELECT DISTINCT type FROM travels");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching destinations:", error.message);
    res.status(500).json({ error: "Failed to fetch destinations." });
  }
});

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`);
  swaggerDocs(app, port);
  console.log(`Swagger Docs available at http://localhost:${port}/docs`);
});
