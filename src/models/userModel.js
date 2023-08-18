const db = require('../config/dbConfig');

class UserModel {
  async getAllUsers() {
    const query = `
      SELECT *
      FROM users
    `;
    const [rows] = await db.query(query);
    return rows;
  }

  async getUserById(userId) {
    const query = `
      SELECT *
      FROM users
      WHERE id = ?;
    `;
    const [rows] = await db.query(query, [userId]);
    return rows[0];
  }

  async getUserByEmail(email) {
    const query = `
      SELECT *
      FROM users
      WHERE email = ?
    `;
    const [rows] = await db.query(query, [email]);
    return rows[0];
  }

  async createUser(name, email, hash) {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.query(query, [name, email, hash, 1]);
    const insertedId = result.insertId;
    const newUser = await this.getUserById(insertedId);
    return newUser;
  }

  async updateUser(userId, name, email) {
    const query = `
      UPDATE users
      SET name = ?, email = ? WHERE id = ?
    `;
    const [result] = await db.query(query, [name, email, userId]);
    if (result.affectedRows === 0) {
      return null;
    }
    const updatedUser = await this.getUserById(userId);
    return updatedUser;
  }

  async deleteUser(userId) {
    const query = `
      DELETE FROM users WHERE id = ?
    `;
    const [result] = await db.query(query, [userId]);
    if (result.affectedRows === 0) {
      return null;
    }
    return true;
  }
}

module.exports = new UserModel();
