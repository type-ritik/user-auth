const { pool } = require("../database/db");

const createAccount = async () => {
  const userData = await pool.query('SELECT * FROM "users"');
  return userData.rows;
};

module.exports = {
  createAccount,
};
