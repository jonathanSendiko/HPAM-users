import express from "express";
import config from "./config.js";
import sequelize from "./database.js";
import { User } from "./models/index.js"; // For auto migration every single time server is restarted
import { userRoutes } from "./routes/index.js";

const app = express();
const port = config.port;

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send({success: true, error: null, data:{message: "OK"}})
});

app.use("/users", userRoutes)


app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync({ alter: true });
    console.log("Auto migration completed.");

    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Something Went Wrong: ", error);
  }
});
