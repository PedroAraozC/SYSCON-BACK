import StockConnection from "../config/StockConnection.js";

export const altaVenta = async (req, res) => {
  let connection;
  try {
    const { total, id_metodo_pago, productos } = req.body;
    // productos = [{ id_producto: 1, cantidad: 2 }, { id_producto: 5, cantidad: 1 }, ...]

    if (!id_metodo_pago || !total || !productos?.length) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const pool = await StockConnection();
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Insertar en tabla venta
    const [ventaResult] = await connection.execute(
      `INSERT INTO ventas (total, id_metodo_pago) VALUES (?, ?)`,
      [total, id_metodo_pago],
    );
    const id_venta = ventaResult.insertId;

    // 2. Insertar cada producto en movimientos_stock
    for (const item of productos) {
      await connection.execute(
        `INSERT INTO movimientos_stock (id_producto, cantidad, id_tipo, id_venta) 
         VALUES (?, ?, 2, ?)`,
        [item.id_producto, item.cantidad, id_venta],
      );
      await connection.execute(
        `UPDATE productos SET stock = stock - ? WHERE id_producto = ?`,
        [item.cantidad, item.id_producto],
      );

      await connection.execute(
        `INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio_unitario, habilita) VALUES (?, ?, ?, ?, 1)`,
        [id_venta, item.id_producto, item.cantidad, item.precio_unitario],
      );
    }

    await connection.commit();
    return res.status(201).json({ message: "Venta registrada", id_venta });
  } catch (error) {
    if (connection) await connection?.rollback();
    console.error("Error al registrar venta:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (connection) await connection.end();
  }
};
