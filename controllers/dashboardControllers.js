import StockConnection from "../config/StockConnection.js";

export const getDashboardStats = async (req, res) => {
  let connection;
  try {
    const pool = await StockConnection();
    connection = await pool.getConnection();
    const hoy = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Argentina/Buenos_Aires",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    // console.log(hoy);
    const [[{ ventasHoy }]] = await connection.execute(
      `SELECT COALESCE(SUM(total), 0) AS ventasHoy 
       FROM ventas WHERE DATE(fecha_alta) = ?`,
      [hoy],
    );

    const [[{ bajoStock }]] = await connection.execute(
      `SELECT COUNT(*) AS bajoStock FROM productos WHERE stock <= 3`,
    );

    const [[{ movimientosHoy }]] = await connection.execute(
      `SELECT COUNT(*) AS movimientosHoy 
       FROM movimientos_stock WHERE DATE(fecha_alta) = ?`,
      [hoy],
    );

    const [masVendido] = await connection.execute(
      `SELECT p.nombre_producto, p.emoji, SUM(dv.cantidad) AS total_vendido
       FROM detalle_ventas dv
       JOIN productos p ON p.id_producto = dv.id_producto
       GROUP BY dv.id_producto, p.nombre_producto, p.emoji
       ORDER BY total_vendido DESC
       LIMIT 1`,
    );
    // console.log("Stats obtenidos:", { ventasHoy, bajoStock, movimientosHoy, masVendido });

    res.json({
      ventasHoy,
      bajoStock,
      movimientosHoy,
      masVendido: masVendido[0] ?? null,
    });
  } catch (error) {
    console.error("Error al obtener stats:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (connection) connection.release();
  }
};
