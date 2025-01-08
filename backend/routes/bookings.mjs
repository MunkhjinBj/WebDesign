import express from "express";
import { dabookings } from "../db/da.mjs";
import authenticate from "../middleware/authenticate.mjs";

export default class Bookings {
  constructor() {}

  async get(req, res) {
    await dabookings.getAllBookings(req, res);
  }

  async post(req, res) {
    await dabookings.addBooking(req, res);
  }
}

const booking = new Bookings();
const router = express.Router();

router.get("/", authenticate, (req, res) => booking.get(req, res));
router.post("/", authenticate, (req, res) => booking.post(req, res));

export { router as bookingRouter };
