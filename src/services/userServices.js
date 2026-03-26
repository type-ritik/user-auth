const { pool } = require("../database/db");
const {
  isUserExistsByEmail,
  saveUserRecords,
} = require("../repository/UserRepository");
const { hashPassword } = require("../utils/passwordEncoder");

const createAccount = async (name, email, password) => {
  try {
    const existsUser = await isUserExistsByEmail(email);

    if (existsUser) {
      throw new Error("User with email already exists. Please try again!");
    }

    const hashedPassword = hashPassword(password);

    const payload = await saveUserRecords(name, email, hashedPassword);

    return payload;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createAccount,
};
