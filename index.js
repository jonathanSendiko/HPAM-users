import express from "express";
import config from "./config.js";
import sequelize from "./database.js";
import { User } from "./models/index.js";

const app = express();
const port = config.port;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync();
    console.log("Auto migration completed.");

    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Something Went Wrong: ", error);
  }
});
