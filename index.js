import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import moment from "moment-timezone";
moment.tz.setDefault("America/Argentina/Buenos_Aires");
dotenv.config();
const app = express();
const PORT = process.env.PORT;
import fs from "fs";
import https from "https";
import productosRoutes from "./routes/productosRoutes.js";
import categoriasRoutes from "./routes/categoriasRoutes.js";
import movimientosStockRoutes from "./routes/movimientosStockRoutes.js";
import tipoMovimientoRoutes from "./routes/tipoMovimientoRoutes.js";
import MetodosDePagoRoutes from "./routes/metodosDePagoRoutes.js";
import cajaRoutes from "./routes/cajaRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.use("/productos", productosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/movimientosStock", movimientosStockRoutes);
app.use("/tipoMovimiento", tipoMovimientoRoutes);
app.use("/metodosDePago", MetodosDePagoRoutes);
app.use("/venta", cajaRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
