import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize('user', 'postgres', process.env.DB_Password, {
  host: 'localhost',
  dialect: 'postgres'
});

export default sequelize;