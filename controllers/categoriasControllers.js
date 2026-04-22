import StockConnection from "../config/StockConnection.js";

export const alta = async (req, res) => {
  const { nombre_categoria, habilita } = req.body;
  let connection;
  try {
    if (!nombre_categoria || !habilita) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    connection = await StockConnection();
    const [results] = await connection.query(
      "INSERT INTO categorias (nombre_categoria, habilita) VALUES (?, ?)",
      [nombre_categoria, habilita],
    );

    res.json({
      message: "Categoría creada",
      categoria: { nombre_categoria, habilita },
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", error });
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
    connection = StockConnection();
    const [results] = await connection.query(
      "UPDATE categorias SET habilita = 0 WHERE id = ?",
      [id],
    );

    res.json({ message: `Categoría con ID ${id} deshabilitada` });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", error });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

export const modificar = async (req, res) => {
  const { id } = req.params;
  const { nombre_categoria, habilita } = req.body;
  let connection;

  try {
    if (!id || nombre_categoria == "") {
      return res.status(400).json({ error: "Faltan datos" });
    }
    connection = await StockConnection();
    const [results] = await connection.query(
      "UPDATE categorias SET nombre_categoria = ?, habilita = ? WHERE id_categoria = ?",
      [nombre_categoria, habilita, id],
    );
    res.json({
      message: `Categoría con ID ${id} modificada`,
      categoria: { nombre_categoria, habilita },
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", error });
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
    const [results] = await connection.query(`SELECT *FROM categorias`);

    res.json({ message: "Lista de categorías", categorias: results });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", error });
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
    const [results] = await connection.query(
      `SELECT *FROM categorias WHERE habilita = 1`,
    );

    res.json({ message: "Lista de categorías", categorias: results });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", error });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
