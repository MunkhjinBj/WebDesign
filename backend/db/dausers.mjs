// import { query } from "./da.mjs";

// export const getUsers = async () => {
//   return await query("SELECT * FROM users");
// };

// export const insertUser = async (data) => {
//   const { username, email, password, full_name, phone_number } = data;

//   const result = await query(
//     `INSERT INTO users (username, email, password, full_name, phone_number)
//         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//     [username, email, password, full_name, phone_number]
//   );
//   return result[0];
// };
// const express = require('express');
// const router = express.Router();
// const pool = require('./db');

// // POST route to handle signup
// router.post('/', async (req, res) => {
//   const { fullname, email, phone, password, dob, gender } = req.body;

//   try {
//     // Insert user into the database
//     const query = `
//       INSERT INTO users (fullname, email, phone, password, dob, gender)
//       VALUES ($1, $2, $3, $4, $5, $6)
//       RETURNING id;
//     `;
//     const values = [fullname, email, phone, password, dob, gender];
//     const result = await pool.query(query, values);

//     res.status(201).send({ message: 'User registered successfully', userId: result.rows[0].id });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).send({ error: 'An error occurred while registering the user.' });
//   }
// });

// module.exports = router;
