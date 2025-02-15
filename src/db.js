import sql from "mssql";
import { DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE, DB_PORT, DB_ENCRYPT } from "./config.js";

const dbConfig = {
  user: DB_USER,
  password: DB_PASSWORD,
  server: DB_SERVER,
  database: DB_DATABASE,
  port: parseInt(DB_PORT),
  options: {
    encrypt: DB_ENCRYPT, // Habilitar SSL si es necesario
    trustServerCertificate: true, // Usar en desarrollo si hay problemas de SSL
  },
};

export const pool = new sql.ConnectionPool(dbConfig);

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log("✅ Conectado a SQL Server");
  } catch (err) {
    console.error("❌ Error de conexión:", err);
  }
};