<<<<<<< HEAD
export default class DaUsers {
  constructor(pool) {
    this.pool = pool;

    this.selectUsersStr = `
      SELECT * FROM users
    `;
    this.selectUserByEmailStr = `
      SELECT * FROM users WHERE email = $1
    `;
    this.insertUserStr = `
      INSERT INTO users (email, password_hash, full_name, phone_number, date_of_birth, gender)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    this.deleteUserStr = `
      DELETE FROM users WHERE user_id = $1 RETURNING *
    `;
  }

  async getAllUsers() {
    const result = await this.pool.query(this.selectUsersStr);
    return result.rows;
  }

  async getUserByEmail(email) {
    const result = await this.pool.query(this.selectUserByEmailStr, [email]);
    return result.rows[0];
  }

  async insertUser(user) {
    const { email, passwordHash, fullName, phoneNumber, dateOfBirth, gender } =
      user;
    const result = await this.pool.query(this.insertUserStr, [
      email,
      passwordHash,
      fullName,
      phoneNumber,
      dateOfBirth,
      gender,
    ]);
    return result.rows[0];
  }

  async deleteUser(userId) {
    const result = await this.pool.query(this.deleteUserStr, [userId]);
    return result.rows[0];
  }
}
=======
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
>>>>>>> dc48c92 (webapi)
