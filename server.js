const express = require("express");
const morgan = require("morgan");
const { route } = require("./src/routes/UserRoute");
const { client } = require("./src/database/db");
const app = express();
require("dotenv").config();

app.use(morgan("dev"));

client
  .connect()
  .then(async () => {
    console.log("Database is connected successfully");
  })
  .catch(async (error) => {
    console.log("Error", error);
  });

const PORT = 8000;

app.use("/api", route);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
