import express from "express";
import config from "./config.js";
import sequelize from "./database.js";
import cors from "cors";
import { User } from "./models/index.js"; // For auto migration every single time server is restarted
import { authRoutes, userRoutes } from "./routes/index.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

const app = express();
const port = config.port;
const corsOptions = {
  origin: config.origin_url,
  methods: 'GET, POST, PATCH, DELETE', 
  allowedHeaders: 'Content-Type, Authorization',
};


app.use(express.json());
app.use(cors(corsOptions));

app.get("/health", (req, res) => {
  res.status(200).send({success: true, error: null, data:{message: "OK"}})
});

app.use("/auth", authRoutes)
app.use("/users", authenticateToken('admin'), userRoutes)


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
