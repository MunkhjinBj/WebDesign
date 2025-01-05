import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DaUsers from "../db/dausers.mjs";
import pool from "../db/da.mjs";

const router = express.Router();
const usersData = new DaUsers(pool);

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Fetched Successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
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
/**
 * @openapi
 * /api/users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Email already registered
 *       500:
 *         description: Server error
 */

router.post("/register", async (req, res) => {
  const { email, password, full_name, phone_number, date_of_birth, gender } =
    req.body;
  console.log("req body", req.body);

  try {
    // Check if the email already exists
    const existingUser = await usersData.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Hash the password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert the user
    const newUser = await usersData.insertUser({
      email,
      password: password_hash,
      full_name,
      phone_number,
      date_of_birth,
      gender,
    });

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user." });
  }
});

// Login a user
/**
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: Fetched Successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
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
/**
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Delete a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: Fetched Successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    id = parseInt(id, 10);
    const deletedUser = await usxersData.deleteUser(id);
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
