import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DaUsers from "../db/dausers.mjs";
import pool from "../db/da.mjs";
import authenticate from "../middleware/authenticate.mjs";
const router = express.Router();
const usersData = new DaUsers(pool);

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("Error: JWT_SECRET is not set!");
  process.exit(1);
}

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await usersData.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

// Register a user
router.post("/register", async (req, res) => {
  const { email, password, full_name, phone_number, date_of_birth, gender } =
    req.body;

  if (!email || !password || !full_name) {
    return res.status(400).json({
      message: "Missing required fields: email, password, full_name.",
    });
  }

  try {
    const existingUser = await usersData.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = await usersData.insertUser({
      email,
      password: password_hash,
      full_name,
      phone_number,
      date_of_birth,
      gender,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
      window.location.href = "http://localhost:3000/login.html";
  } catch (error) {
    console.error("Error registering user:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user." });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await usersData.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token back to the client to be stored in localStorage
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
});

router.get("/userinfo", authenticate, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await usersData.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Send user info in response
    res.status(200).json({
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      date_of_birth: user.date_of_birth,
      gender: user.gender,
    });
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user info." });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  let { id } = req.params;

  try {
    id = parseInt(id, 10);
    const deletedUser = await usersData.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
});

export default router;
