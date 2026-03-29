const {
  isUserExistsByEmail,
  saveUserRecords,
  getUserByEmail,
} = require("../repository/UserRepository");
const { hashPassword, comparePassword } = require("../utils/passwordEncoder");
const redisClient = require("../config/redis");

const getCredentials = async (id) => {
  try {
    const userArray = await redisClient.hGetAll(`USER:${id}`);

    const user = userArray;

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
const createAccount = async (name, email, password) => {
  try {
    const existsUser = await isUserExistsByEmail(email);

    if (existsUser) {
      throw new Error("User with email already exists. Please try again!");
    }

    const hashedPassword = hashPassword(password);

    const payload = await saveUserRecords(name, email, hashedPassword);

    const userKey = `USER:${payload[0].id}`;

    // 1. Store the user data
    await redisClient.hSet(userKey, {
      id: payload[0].id,
      name: payload[0].name,
      email: payload[0].email,
      created_at: payload[0].created_at.toISOString(),
    });

    // 2. Set an expiry (e.g., 24 hours) to keep memory clean
    // 86400 seconds = 24 hours
    await redisClient.expire(userKey, 86400);

    return payload;
  } catch (error) {
    throw new Error(error);
  }
};

const logUser = async (email, password) => {
  try {
    const existsUser = await isUserExistsByEmail(email);

    if (!existsUser) {
      throw new Error("User with email does not exist. Please try again!");
    }

    const user = await getUserByEmail(email);

    const isPasswordCorrect = comparePassword(password, user[0].password);

    if (!isPasswordCorrect) {
      throw new Error("Incorrect password. Please try again!");
    }

    delete user[0].password;

    const userKey = `USER:${user[0].id}`;

    // 1. Store the user data
    await redisClient.hSet(userKey, {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      created_at: user[0].created_at.toISOString(),
    });

    // 2. Set an expiry (e.g., 24 hours) to keep memory clean
    // 86400 seconds = 24 hours
    await redisClient.expire(userKey, 86400);

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createAccount,
  logUser,
  getCredentials,
};
