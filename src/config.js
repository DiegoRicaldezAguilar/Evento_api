import dotenv from "dotenv";
dotenv.config();

export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_SERVER = process.env.DB_SERVER;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT = parseInt(process.env.DB_PORT, 10);
export const DB_ENCRYPT = process.env.DB_ENCRYPT === "true";

export const PORT = process.env.PORT || 3000;
