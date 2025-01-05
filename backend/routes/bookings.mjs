import express from "express";
import { dabookings } from "../db/da.mjs";

export default class Bookings {
  constructor() {}

  /**
   * @openapi
   * /api/bookings:
   *   get:
   *     tags:
   *       - Bookings
   *     summary: Get all bookings
   *     responses:
   *       200:
   *         description: List of bookings retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Booking'
   *       400:
   *         description: Bad Request
   *       404:
   *         description: Not Found
   *       500:
   *         description: Server Error
   */
  async get(req, res) {
    await dabookings.getAllBookings(req, res);
  }

  /**
   * @openapi
   * /api/bookings:
   *   post:
   *     tags:
   *       - Bookings
   *     summary: Add a new booking
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Booking'
   *     responses:
   *       201:
   *         description: Booking added successfully
   *       400:
   *         description: Missing or invalid data
   *       500:
   *         description: Server Error
   */
  async post(req, res) {
    await dabookings.addBooking(req, res);
  }
}

const booking = new Bookings();
export { booking };
