export default class DaUsers {
  constructor(pool) {
    this.pool = pool;

    this.selectUsersStr = `
      SELECT * FROM users
    `;
    this.selectUserByEmailStr = `
      SELECT * FROM users WHERE email = $1
    `;
    this.selectUserByIdStr = `
      SELECT * FROM users WHERE user_id = $1
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

  async getUserById(userId) {
    const result = await this.pool.query(this.selectUserByIdStr, [userId]);
    return result.rows[0];
  }

  async insertUser(user) {
    const { email, password, full_name, phone_number, date_of_birth, gender } =
      user;
    const result = await this.pool.query(this.insertUserStr, [
      email,
      password,
      full_name,
      phone_number,
      date_of_birth,
      gender,
    ]);
    return result.rows[0];
  }

  async deleteUser(userId) {
    const result = await this.pool.query(this.deleteUserStr, [userId]);
    return result.rows[0];
  }
}
