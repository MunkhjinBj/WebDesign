import dotenv from "dotenv";
dotenv.config(); // Load environment variables before anything else

import express from "express";
import compression from "compression";
import cors from "cors";
import path from "path";

import { travel } from "./routes/travels.mjs";
import { bookingRouter } from "./routes/bookings.mjs"; // Import bookingRouter
import usersRoutes from "./routes/users.mjs";
import authenticate from "./middleware/authenticate.mjs";
import swaggerDocs from "./swagger.mjs";
import pool from "./db/da.mjs"; // Database connection

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
app.use(express.json()); // Parses JSON request bodies
app.use(compression());
app.use(cors());
app.use(express.static(path.resolve("."))); // Static files

// Static routes for components, modules, and images
app.use("/components", express.static(path.resolve("components")));
app.use("/modules", express.static(path.resolve("modules")));
app.use("/images", express.static(path.resolve("images")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.resolve("frontend/index.html")); // Adjusted path
});
app.get("/frontend/app.js", (req, res) => {
  res.sendFile(path.resolve("frontend/app.js")); // Adjusted path
});

// Travel API
app.get("/api/travels", async (req, res) => {
  try {
    await travel.get(req, res);
  } catch (error) {
    console.error("Error fetching travels:", error.message);
    res.status(500).json({ error: "Failed to fetch travels." });
  }
});

app.post("/api/travels", async (req, res) => {
  try {
    await travel.post(req, res);
  } catch (error) {
    console.error("Error creating travel:", error.message);
    res.status(500).json({ error: "Failed to create travel." });
  }
});

// Use bookingRouter for bookings API routes
app.use("/api/bookings", bookingRouter);  // Mount the bookingRouter here

// Users API
app.use("/api/users", usersRoutes);

// Destinations API
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
  swaggerDocs(app, port); // Swagger documentation setup
  console.log(`Swagger Docs available at http://localhost:${port}/docs`);
});
