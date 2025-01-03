import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DaUsers from "../db/dausers.mjs";
import pool from "../db/da.mjs";

const router = express.Router();
const usersData = new DaUsers(pool);

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

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

  try {
    // Check if the email already exists
    const existingUser = await usersData.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert the user
    const newUser = await usersData.insertUser({
      email,
      password,
      full_name,
      phone_number,
      date_of_birth,
      gender,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
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

  try {
    // Find the user by email
    const user = await usersData.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
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
