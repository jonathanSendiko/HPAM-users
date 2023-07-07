import { Sequelize } from "sequelize";
import config from "./config.js";

const { database, username, password, host, port } = config.database;

const sequelize = new Sequelize({
  database,
  username,
  password,
  host,
  port,
  dialect: "postgres",
  dialectOptions: {
    ssl: true,
    native: true,
  },
});

export default sequelize;
