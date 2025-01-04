import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import { travel } from "./routes/travels.mjs";
import { booking } from "./routes/bookings.mjs";
import usersRoutes from "./routes/users.mjs";
import swaggerDocs from "./swagger.mjs";
import pool from "./db/da.mjs";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(".")));
app.use("/components", express.static(path.resolve("components")));
app.use("/modules", express.static(path.resolve("modules")));
app.use("/images", express.static(path.resolve("images")));

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.resolve("../index.html"));
});
app.get("../frontend/app.js", (req, res) => {
  res.sendFile(path.resolve("../frontend/app.js"));
});
app.get("/api/travels", (req, res) => travel.get(req, res));
app.post("/api/travels", (req, res) => travel.post(req, res));
app.get("/api/bookings", (req, res) => booking.get(req, res));
app.post("/api/bookings", (req, res) => booking.post(req, res));
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

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`);
  swaggerDocs(app, port);
  console.log(`Swagger Docs available at http:// localhost:${port}/docs`);
});
