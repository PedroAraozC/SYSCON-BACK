import StockConnection from "../config/StockConnection.js";

export const alta = async (req, res) => {
  const {
    nombre_producto,
    precio_producto,
    categoria,
    stock_minimo,
    emoji,
    habilita,
  } = req.body;
  let connection;
  try {
    if (
      !nombre_producto ||
      precio_producto == "" ||
      categoria == "" ||
      stock_minimo == "" ||
      emoji == ""
    ) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    connection = await StockConnection();
    const [results] = await connection.query(
      "INSERT INTO productos (nombre_producto, precio_producto, id_categoria, stock_minimo, emoji, habilita) VALUES (?, ?, ?, ?, ?, ?)",
      [
        nombre_producto,
        precio_producto,
        categoria,
        stock_minimo,
        emoji,
        habilita,
      ],
    );

    res.json({
      message: "Producto creado",
      producto: {
        nombre_producto,
        precio_producto,
        stock_minimo,
        categoria,
        emoji,
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
  const {
    nombre_producto,
    precio_producto,
    emoji,
    id_categoria,
    stock_minimo,
    habilita,
  } = req.body;
  let connection;
  try {
    if (
      !id ||
      nombre_producto == "" ||
      !precio_producto ||
      !emoji ||
      !id_categoria ||
      !stock_minimo
    ) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    connection = await StockConnection();
    const [results] = await connection.query(
      "UPDATE productos SET nombre_producto = ?, precio_producto = ?, id_categoria = ?, habilita = ?,stock_minimo = ?, emoji = ? WHERE id_producto = ?",
      [
        nombre_producto,
        precio_producto,
        id_categoria,
        habilita,
        stock_minimo,
        emoji,
        id,
      ],
    );
    res.json({
      message: `Producto con ID ${id} modificado`,
      producto: {
        nombre_producto,
        precio_producto,
        habilita,
        id_categoria,
        stock_minimo,
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
      id_producto,
      nombre_producto,
      precio_producto,
      stock,
      stock_minimo,
      id_categoria,
      emoji,
      habilita
    FROM productos`);
    res.json({ message: "Lista de productos", productos: results });
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
      id_producto,
      nombre_producto,
      precio_producto,
      stock,
      stock_minimo,
      id_categoria,
      emoji,
      habilita
    FROM productos
    WHERE habilita = 1;`);

    res.json({ message: "Lista de productos", productos: results });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
