import express from "express";
import { travel } from "./routes/travels.mjs";
import { booking } from "./routes/bookings.mjs";
// import user from "./routes/users.mjs";
import swaggerDocs from "./swagger.mjs";
import pool from "./db/da.mjs";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.static(path.resolve("frontend")));
app.use("/components", express.static(path.resolve("components")));
app.use("/modules", express.static(path.resolve("modules")));
app.use("/images", express.static(path.resolve("images")));

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.resolve("frontend/index.html"));
});
app.get("/frontend/app.js", (req, res) => {
  res.sendFile(path.resolve("frontend/app.js"));
});
app.get("/api/travels", (req, res) => travel.get(req, res));
app.post("/api/travels", (req, res) => travel.post(req, res));
app.get("/api/bookings", (req, res) => booking.get(req, res));
app.post("/api/bookings", (req, res) => booking.post(req, res));
app.get("/api/destinations", async (req, res) => {
  try {
    const result = await pool.query("SELECT DISTINCT type FROM travels");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching destinations:", error.message);
    res.status(500).json({ error: "Failed to fetch destinations." });
  }
});

// Start Server and Swagger Docs
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  swaggerDocs(app, port);
  console.log(`Swagger Docs available at http:// localhost:${port}/docs`);
});

// import express from "express";
// import bodyParser from "body-parser";
// import travelRoutes from "./routes/travels.mjs";
// import userRoutes from "./routes/users.mjs";
// import bookingRoutes from "./routes/bookings.mjs";
// import reviewRoutes from "./routes/reviews.mjs";
// import paymentRoutes from "./routes/payment.mjs";

// const app = express();
// const PORT = 3000;

// app.use(bodyParser.json());

// // Routes
// app.use("/api/travels", travelRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/payments", paymentRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
