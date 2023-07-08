import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432, // Default port for Postgresql
  },
  secret_key: process.env.SECRET_KEY || "",
  origin_url: process.env.ORIGIN_URL || "http://localhost:3000"
};

export default config;
