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
export { booking };
