
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    diplomado_db,
    postgres,
    postgres,
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'postgres',
        logging: false,
    }
);