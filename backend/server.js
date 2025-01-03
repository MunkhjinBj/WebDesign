const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const port = 5501;
require("dotenv").config();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

// Print the DATABASE_URL to confirm it's correctly loaded
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Set up PostgreSQL connection pool (for local or cloud database)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use your database connection string from .env
  ssl: { rejectUnauthorized: false }, // Enable SSL for cloud DB only
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Database connected:", result.rows);
  });
});

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // Use environment variable for production

// POST route for signup form
app.post("/signup", async (req, res) => {
  const { fullname, email, phone, password, dob, gender } = req.body;

  try {
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert into the database (do not include created_at or updated_at)
    const query = `
      INSERT INTO users (full_name, email, phone_number, password_hash, date_of_birth, gender)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const values = [fullname, email, phone, hashedPassword, dob, gender];
    const result = await pool.query(query, values);

    // Redirect to signin page after successful registration
    res.redirect("http://127.0.0.1:5501/signin.html"); // Redirect to signin page after successful signup
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// POST route for signin (login)
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const user = result.rows[0];

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token }); // Send the token back to the client
  } catch (err) {
    console.error("Error during signin:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET route for user info (authentication required)
app.get("/userinfo", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // Fetch user info
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(result.rows[0]); // Return user info
  } catch (err) {
    console.error("Error fetching user info:", err);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
