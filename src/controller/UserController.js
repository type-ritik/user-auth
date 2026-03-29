const {
  createAccount,
  logUser,
  getCredentials,
} = require("../services/userServices");
const validator = require("../utils/validator");

const userCredentials = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validator.isUUID(id)) {
      throw new Error("Invalid User ID");
    }
    const user = await getCredentials(id);

    res.status(200).send({
      success: true,
      message: "User credentials retrieved successfully",
      user,
    });
  } catch (error) {
    console.error(error); // Log the real error for you to see
    res.status(500).send({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Please provide correct password in 8 characters");
    }

    const payload = await logUser(email, password);

    res.status(200).send({
      success: true,
      message: `User logged in successfully`,
      user: payload[0],
    });
  } catch (error) {
    console.error(error); // Log the real error for you to see
    res.status(500).send({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email");
    }

    if (!validator.isAlpha(name)) {
      throw new Error("Invalid Name");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Please provide strong password in 8 characters");
    }

    const payload = await createAccount(name, email, password);

    res.status(201).send({
      success: true,
      message: `User registered successfully`,
      user: payload[0],
    });
  } catch (error) {
    console.error(error); // Log the real error for you to see
    res.status(500).send({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = { userCredentials, signup, login };
