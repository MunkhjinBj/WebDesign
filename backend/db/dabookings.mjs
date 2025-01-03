export default class DaBookings {
  constructor(poolObj) {
    this.pool = poolObj;

    this.selectBookingsStr = `
        SELECT * FROM bookings ORDER BY date DESC`;

    this.insertBookingStr = `
        INSERT INTO bookings (
          user_id, travel_id, date, status, number_of_travelers, total_price
        ) VALUES (
          $1, $2, $3, $4, $5, $6
        ) RETURNING *`;

    this.updateBookingStr = `
        UPDATE bookings
        SET 
          user_id = $1, travel_id = $2, date = $3, status = $4, number_of_travelers = $5, total_price = $6
        WHERE id = $5 RETURNING *`;

    this.deleteBookingStr = `
        DELETE FROM bookings WHERE id = $1 RETURNING *`;
  }

  async getAllBookings(req, res) {
    try {
      const result = await this.pool.query(this.selectBookingsStr);
      res.status(200).json({ bookings: result.rows });
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
      res.status(500).send(`Error fetching bookings: ${error.message}`);
    }
  }

  async addBooking(req, res) {
    const {
      user_id,
      travel_id,
      date,
      status = "Pending",
      number_of_travelers,
      total_price,
    } = req.body;

    if (!user_id || !travel_id || !date) {
      res
        .status(400)
        .send("Missing required fields: user_id, travel_id, or date.");
      return;
    }

    try {
      const result = await this.pool.query(this.insertBookingStr, [
        user_id,
        travel_id,
        date,
        status,
        number_of_travelers,
        total_price,
      ]);

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error adding booking:", error.message);
      res.status(500).send(`Error adding booking: ${error.message}`);
    }
  }

  async updateBooking(req, res) {
    const { id } = req.params;
    const {
      user_id,
      travel_id,
      date,
      status,
      number_of_travelers,
      total_price,
    } = req.body;

    if (!id) {
      res.status(400).send("Missing required parameter: id.");
      return;
    }

    try {
      const result = await this.pool.query(this.updateBookingStr, [
        user_id,
        travel_id,
        date,
        status,
        id,
        number_of_travelers,
        total_price,
      ]);

      if (result.rows.length === 0) {
        res.status(404).send(`Booking with ID ${id} not found`);
        return;
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error updating booking:", error.message);
      res.status(500).send(`Error updating booking: ${error.message}`);
    }
  }

  async deleteBooking(req, res) {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing required parameter: id.");
      return;
    }

    try {
      const result = await this.pool.query(this.deleteBookingStr, [id]);

      if (result.rows.length === 0) {
        res.status(404).send(`Booking with ID ${id} not found`);
        return;
      }

      res.status(200).json({ message: `Booking with ID ${id} deleted` });
    } catch (error) {
      console.error("Error deleting booking:", error.message);
      res.status(500).send(`Error deleting booking: ${error.message}`);
    }
  }
}
