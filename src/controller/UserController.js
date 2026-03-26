const { createAccount } = require("../services/userServices");

const userCredentials = async (req, res) => {
  return res.send("Hello World");
};

const signup = async (req, res) => {
  try {
    const payload = await createAccount();
    res.json({
      message: "User Login Successful",
      user: payload,
    });
  } catch (error) {
    throw new Error("Server Error: ", error.message);
  }
};

module.exports = { userCredentials, signup };
