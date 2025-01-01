const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Update with your credentials
  host: 'localhost',
  database: 'webtest',
  password: '1234',
  port: 5432,
});

(async () => {
  try {
    const result = await pool.query('SELECT NOW() AS current_time');
    console.log('Database connection successful:', result.rows[0]);
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    await pool.end();
  }
})();
