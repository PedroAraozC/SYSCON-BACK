import StockConnection from "../config/StockConnection.js";

export const alta = async (req, res) => {
  const { id_producto, id_tipo, cantidad, habilita } = req.body;
  let connection;
  try {
    if (!id_producto || !id_tipo || !cantidad) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    connection = await StockConnection();
    const [results] = await connection.query(
      "INSERT INTO movimientos_stock (id_producto, id_tipo, cantidad, habilita) VALUES (?, ?, ?, ?)",
      [id_producto, id_tipo, cantidad, habilita],
    );
    if (id_tipo === 1) {
      // ENTRADA
      await connection.query(
        "UPDATE productos SET stock = stock + ? WHERE id_producto = ?",
        [cantidad, id_producto],
      );
    } else if (id_tipo === 2) {
      // SALIDA
      await connection.query(
        "UPDATE productos SET stock = stock - ? WHERE id_producto = ?",
        [cantidad, id_producto],
      );
    }

    res.json({
      message: "Movimiento de stock creado",
      Stock: {
        id_producto,
        id_tipo,
        cantidad,
        habilita,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

export const baja = async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    if (!id) {
      return res.status(400).json({ error: "Falta el ID del producto" });
    }
    connection = await StockConnection();
    const [results] = await connection.query(
      "UPDATE productos SET habilita = 0 WHERE id = ?",
      [id],
    );

    res.json({ message: `Producto con ID ${id} deshabilitado` });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

export const modificar = async (req, res) => {
  const { id } = req.params;
  const { nombre_producto, precio_producto, emoji, id_categoria, habilita } =
    req.body;
  let connection;
  try {
    if (
      !id ||
      nombre_producto == "" ||
      !precio_producto ||
      !emoji ||
      !id_categoria
    ) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    connection = await StockConnection();
    const [results] = await connection.query(
      "UPDATE productos SET nombre_producto = ?, precio_producto = ?, id_categoria = ?, habilita = ?, emoji = ? WHERE id_producto = ?",
      [nombre_producto, precio_producto, habilita, id_categoria, emoji, id],
    );
    res.json({
      message: `Producto con ID ${id} modificado`,
      producto: {
        nombre_producto,
        precio_producto,
        habilita,
        id_categoria,
        emoji,
        id,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

export const obtenerAdmin = async (req, res) => {
  let connection;
  try {
    connection = await StockConnection();
    const [results] = await connection.query(`
    SELECT 
      m.id_movimiento,  
      m.id_producto,
      m.id_tipo,
      t.nombre_movimiento,
      p.nombre_producto,
      p.emoji,
      p.precio_producto,
      m.cantidad,
      m.fecha_alta,
      m.habilita
    FROM movimientos_stock m
    LEFT JOIN productos p ON m.id_producto = p.id_producto
    LEFT JOIN tipo_movimiento t ON m.id_tipo = t.id_tipo_movimiento
    ORDER BY m.id_movimiento DESC;`);
    res.json({
      message: "Lista de movimientos de stock",
      movimientos_stock: results,
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

export const obtener = async (req, res) => {
  let connection;
  try {
    connection = await StockConnection();
    const [results] = await connection.query(`
    SELECT 
      m.id_movimiento,  
      m.id_producto,
      m.id_tipo,
      t.nombre_movimiento,
      p.nombre_producto,
      p.emoji,
      p.precio_producto,
      m.cantidad,
      m.fecha_alta,
      m.habilita
    FROM movimientos_stock m
    LEFT JOIN productos p ON m.id_producto = p.id_producto
    LEFT JOIN tipo_movimiento t m.id_tipo = t.id_tipo_movimiento
    WHERE m.habilita = 1 ORDER BY m.id_movimiento DESC;`);

    res.json({
      message: "Lista de movimientos de stock",
      movimientos_stock: results,
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
