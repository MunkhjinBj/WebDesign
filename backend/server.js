const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 5501;

const path = require('path');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../pages')));



const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'webtest',
  password: '1234',
  port: 5432,
});


app.post('/signup', async (req, res) => {
    try {
      const { username, password, email, surname, givenName, phone, dob, gender } = req.body;
  
      // Input validation
        if (!username || username.length > 255) return res.status(400).send('Invalid username');
        if (!email || email.length > 255 || !validator.isEmail(email)) return res.status(400).send('Invalid email');
        if (!password || password.length > 255) return res.status(400).send('Invalid password');
        if (!surname || surname.length > 255) return res.status(400).send('Invalid surname');
        if (!givenName || givenName.length > 255) return res.status(400).send('Invalid given name');
        if (!dob || !validator.isDate(dob)) return res.status(400).send('Invalid date of birth');
        if (!phone || !/^\d{8,20}$/.test(phone)) return res.status(400).send('Invalid phone number');
  
      const validGenders = ['male', 'female', 'other'];
      if (!validGenders.includes(gender.toLowerCase())) {
        return res.status(400).send('Invalid gender');
      }
  
      // Check for existing user
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE username = $1 OR email = $2',
        [username, email]
      );
      if (existingUser.rows.length > 0) {
        return res.status(409).send('Username or email already exists');
      }
  
      // Hash password and insert user
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `
        INSERT INTO users (username, password, email, surname, given_name, phone, dob, gender)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      await pool.query(query, [username, hashedPassword, email, surname, givenName, phone, dob, gender]);
  
      res.status(201).send('User signed up successfully');
    } catch (err) {
      console.error('Error during signup:', err);
      res.status(500).send('Error signing up');
    }
  });
  

app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = $1';
  pool.query(query, [username], async (err, result) => {
    if (err) {
      console.error('Error signing in:', err); // Log the error
      return res.status(500).send('Error signing in');
    }
    if (result.rows.length === 0) {
      return res.status(401).send('Invalid username or password');
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid username or password');
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});