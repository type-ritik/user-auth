const { pool } = require("../database/db");
const {
  isUserExistsByEmail,
  saveUserRecords,
} = require("../repository/UserRepository");

const createAccount = async (name, email, password) => {
  try {
    const existsUser = await isUserExistsByEmail(email);

    if (existsUser) {
      throw new Error("User with email already exists. Please try again!");
    }

    const payload = await saveUserRecords(name, email, password);

    return payload;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createAccount,
};
