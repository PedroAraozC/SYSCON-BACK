import mysql from "mysql2/promise";

export const StockConnection = async () => {
  try {
    const pool = mysql.createPool({
      host: process.env.HOST_STOCK,
      user: process.env.USER_STOCK,
      password: process.env.PASSWORD_STOCK,
      database: process.env.DB_STOCK,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log("coneccion exitosa");
    return pool;
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
};
export default StockConnection;
