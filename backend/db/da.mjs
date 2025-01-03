import pg from "pg";
import DaTravels from "./datravels.mjs";
import DaBookings from "./dabookings.mjs";

const pool = new pg.Pool({
  user: "postgres",
  host: "my-db-instance.czoc8g4maxrb.eu-north-1.rds.amazonaws.com",
  database: "web-db",
  password: "12345678",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Create an instance of DaTravels
const datravels = new DaTravels(pool);
const dabookings = new DaBookings(pool);

// Export both pool and datravels
export default pool;
export { datravels, dabookings };
