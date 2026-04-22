import StockConnection from "../config/StockConnection.js";

export const alta = async (req, res) => {
  const { nombre_movimiento, habilita } = req.body;
  let connection;
  try {
    if (!nombre_movimiento || !habilita) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    connection = await StockConnection();
    const [results] = await connection.query(
      "INSERT INTO tipo_movimiento (nombre_movimiento, habilita) VALUES (?, ?)",
      [nombre_movimiento, habilita],
    );

    res.json({
      message: "Tipo Movimiento creado",
      movimiento: { nombre_movimiento, habilita },
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
      return res.status(400).json({ error: "Falta el ID del tipo movimiento" });
    }
    connection = StockConnection();
    const [results] = await connection.query(
      "UPDATE tipo_movimiento SET habilita = 0 WHERE id = ?",
      [id],
    );

    res.json({ message: `Tipo Movimiento con ID ${id} deshabilitado` });
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
  const { nombre_movimiento, habilita } = req.body;
  let connection;

  try {
    if (!id || nombre_movimiento == "") {
      return res.status(400).json({ error: "Faltan datos" });
    }
    connection = await StockConnection();
    const [results] = await connection.query(
      "UPDATE tipo_movimiento SET nombre_movimiento = ?, habilita = ? WHERE id_tipo_movimiento = ?",
      [nombre_movimiento, habilita, id_tipo_movimiento],
    );
    res.json({
      message: `Tipo Movimiento con ID ${id} modificado`,
      movimiento: { nombre_movimiento, habilita },
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
    const [results] = await connection.query(`SELECT *FROM tipo_movimiento`);

    res.json({ message: "Lista de tipo de movimientos", movimientos: results });
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
      `SELECT *FROM tipo_movimiento WHERE habilita = 1`,
    );

    res.json({ message: "Lista de tipo movimientos", movimientos: results });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", error });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
