const express = require("express");
const morgan = require("morgan");
const UserRoute = require("./src/routes/UserRoute");
const { client } = require("./src/database/db");
const AuthRoute = require("./src/routes/AuthRoute");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const redisClient = require("./src/config/redis");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

redisClient
  .connect()
  .then(async () => {
    console.log("Redis is connected successfully");
  })
  .catch(async (error) => {
    console.log("Error", error);
  });

client
  .connect()
  .then(async () => {
    console.log("Database is connected successfully");
  })
  .catch(async (error) => {
    console.log("Error", error);
  });

const PORT = 8000;

app.use("/api", UserRoute);
app.use("/auth", AuthRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
