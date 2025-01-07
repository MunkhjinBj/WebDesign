import express from "express";
import { dabookings } from "../db/da.mjs";
import authenticate from "../middleware/authenticate.mjs";  // Import the authentication middleware

export default class Bookings {
  constructor() {}

  // Get all bookings
  async get(req, res) {
    await dabookings.getAllBookings(req, res);
  }

  // Add a new booking (with authentication middleware)
  async post(req, res) {
    await dabookings.addBooking(req, res);
  }
}

const booking = new Bookings();
const router = express.Router();

// Apply authentication middleware to routes that need it
router.get("/", authenticate, (req, res) => booking.get(req, res));  // Make sure route is '/api/bookings'
router.post("/", authenticate, (req, res) => booking.post(req, res)); // Same here for POST

export { router as bookingRouter };
