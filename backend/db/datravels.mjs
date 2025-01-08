export default class DaTravels {
  constructor(poolObj) {
    this.pool = poolObj;
    this.selectTravelsStr = "SELECT * FROM travels";
    this.insertTravelStr = `
      INSERT INTO travels (
        title, image, type, start_date, finish_date, days, price, status, location, 
        season, age_group, service_type, package_features, child_friendly
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, 
        $10, $11, $12, $13, $14
      ) RETURNING *`;
    this.updateTravelStr = `
      UPDATE travels
      SET 
        title = $1, image = $2, type = $3, start_date = $4, finish_date = $5, 
        days = $6, price = $7, status = $8, location = $9, season = $10, 
        age_group = $11, service_type = $12, 
        package_features = $13, child_friendly = $14
      WHERE id = $15 RETURNING *`;
  }

  async getAllTravels(req, res) {
    try {
      const result = await this.pool.query(this.selectTravelsStr);
      res.status(200).json({ travels: result.rows });
    } catch (error) {
      console.error("Error fetching travels:", error.message);
      res.status(500).send(`Error fetching travels: ${error.message}`);
    }
  }

  async addTravel(req, res) {
    const {
      title,
      image = null,
      type,
      start_date,
      finish_date,
      days = 1,
      price,
      status = "Боломжтой",
      location,
      season,
      age_group,
      service_type,
      package_features,
      child_friendly,
    } = req.body;
    console.log("Request body:", req.body);
    if (!title || !type || !start_date || !finish_date || !price) {
      res
        .status(400)
        .send(
          "Missing required fields: title, type, start_date, finish_date, or price."
        );
      return;
    }
    try {
      const result = await this.pool.query(this.insertTravelStr, [
        title,
        image,
        type,
        start_date,
        finish_date,
        days,
        price,
        status,
        location,
        season,
        age_group,
        service_type,
        package_features,
        child_friendly,
      ]);

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error adding travel:", error.message);
      res.status(500).send(`Error adding travel: ${error.message}`);
    }
  }

  async updateTravel(req, res) {
    const { id } = req.params;
    const {
      title,
      image,
      type,
      start_date,
      finish_date,
      days,
      price,
      status,
      location,
      season,
      age_group,
      service_type,
      package_features,
      child_friendly,
    } = req.body;

    if (!id) {
      res.status(400).send("Missing required parameter: id.");
      return;
    }

    try {
      const result = await this.pool.query(this.updateTravelStr, [
        title,
        image,
        type,
        start_date,
        finish_date,
        days,
        price,
        status,
        location,
        season,
        age_group,
        service_type,
        package_features,
        child_friendly,
      ]);

      if (result.rows.length === 0) {
        res.status(404).send(`Travel with ID ${id} not found`);
        return;
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error updating travel:", error.message);
      res.status(500).send(`Error updating travel: ${error.message}`);
    }
  }
}
