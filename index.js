import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import moment from "moment-timezone";
moment.tz.setDefault("America/Argentina/Buenos_Aires");
dotenv.config();
const app = express();
const PORT = process.env.PORT;
import productosRoutes from "./routes/productosRoutes.js";
import categoriasRoutes from "./routes/categoriasRoutes.js";
import movimientosStockRoutes from "./routes/movimientosStockRoutes.js";
import tipoMovimientoRoutes from "./routes/tipoMovimientoRoutes.js";
import MetodosDePagoRoutes from "./routes/metodosDePagoRoutes.js";
import cajaRoutes from "./routes/cajaRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

app.use(
  cors({
    origin: ["https://syscon.alwaysdata.net", "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.use("/BackEnd/productos", productosRoutes);
app.use("/BackEnd/categorias", categoriasRoutes);
app.use("/BackEnd/movimientosStock", movimientosStockRoutes);
app.use("/BackEnd/tipoMovimiento", tipoMovimientoRoutes);
app.use("/BackEnd/metodosDePago", MetodosDePagoRoutes);
app.use("/BackEnd/venta", cajaRoutes);
app.use("/BackEnd/dashboard", dashboardRoutes);

console.log("PORT:", process.env.PORT);
console.log("ENV:", process.env.NODE_ENV);

const IP = process.env.IP || "0.0.0.0";

app.listen(PORT, IP, () => {
  console.log(`Servidor en puerto ${PORT}`);
});

setInterval(() => {
  console.log("Servidor vivo");
}, 30000);

process.on("uncaughtException", (err) => {
  console.error("ERROR NO CAPTURADO:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("PROMESA RECHAZADA:", err);
});
