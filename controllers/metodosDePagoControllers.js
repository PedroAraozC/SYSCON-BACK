import StockConnection from "../config/StockConnection.js";

export const alta = async (req, res) => {
  const { nombre_metodo_pago, emoji, habilita } = req.body;
  let connection;
  try {
    if (!nombre_metodo_pago || !habilita) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    connection = await StockConnection();
    const [results] = await connection.query(
      "INSERT INTO metodo_pago (nombre_metodo_pago, emoji, habilita) VALUES (?, ?, ?)",
      [nombre_metodo_pago.toUpperCase(), emoji, habilita],
    );

    res.json({
      message: "Método de pago creado",
      metodo_pago: { nombre_metodo_pago, emoji, habilita },
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
      return res.status(400).json({ error: "Falta el ID del método de pago" });
    }
    connection = StockConnection();
    const [results] = await connection.query(
      "UPDATE metodo_pago SET habilita = 0 WHERE id = ?",
      [id],
    );

    res.json({ message: `Método de pago con ID ${id} deshabilitado` });
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
  const { nombre_metodo_pago, emoji, habilita } = req.body;
  let connection;

  try {
    if (!id || nombre_metodo_pago == "") {
      return res.status(400).json({ error: "Faltan datos" });
    }
    connection = await StockConnection();
    const [results] = await connection.query(
      "UPDATE metodo_pago SET nombre_metodo_pago = ?, emoji = ?, habilita = ? WHERE id_metodo_pago = ?",
      [nombre_metodo_pago, emoji, habilita, id],
    );
    res.json({
      message: `Método de pago con ID ${id} modificado`,
      metodo_pago: { nombre_metodo_pago, emoji, habilita },
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
    const [results] = await connection.query(`SELECT *FROM metodo_pago`);

    res.json({ message: "Lista de métodos de pago", metodo_pago: results });
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
      `SELECT *FROM metodo_pago WHERE habilita = 1`,
    );

    res.json({ message: "Lista de métodos de pago", metodo_pago: results });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", error });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
