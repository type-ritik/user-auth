const { pool } = require("../database/db");

const isUserExistsByEmail = async (email) => {
  try {
    const res = await pool.query(
      "SELECT 1 FROM users WHERE email = $1 LIMIT 1;",
      [email],
    );

    if (res.rowCount === 0) {
      return false;
    }

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const res = await pool.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);

    if (res.rowCount === 0) {
      throw new Error("User with email does not exist. Please try again!");
    }

    return res.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const saveUserRecords = async (name, email, password) => {
  try {
    const res = await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at;`,
      [name, email, password],
    );

    if (res.rowCount === 0) {
      throw new Error("Error creating user. Please try again later");
    }

    return res.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  isUserExistsByEmail,
  saveUserRecords,
  getUserByEmail,
};
