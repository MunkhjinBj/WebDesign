import pg from "pg";
<<<<<<< HEAD
import dotenv from "dotenv";
import DaTravels from "./datravels.mjs";
import DaBookings from "./dabookings.mjs";

dotenv.config();
=======
import DaTravels from "./datravels.mjs";
import DaBookings from "./dabookings.mjs";

>>>>>>> dc48c92 (webapi)
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

<<<<<<< HEAD
const datravels = new DaTravels(pool);
const dabookings = new DaBookings(pool);

=======
// Create an instance of DaTravels
const datravels = new DaTravels(pool);
const dabookings = new DaBookings(pool);

// Export both pool and datravels
>>>>>>> dc48c92 (webapi)
export default pool;
export { datravels, dabookings };
