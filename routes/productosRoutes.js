import express from "express";
import {
  alta,
  baja,
  modificar,
  obtener,
  obtenerAdmin,
} from "../controllers/productosControllers.js";

const router = express.Router();

router.get("/obtener", obtener);
router.get("/obtenerAdmin", obtenerAdmin);
router.post("/alta", alta);
router.put("/modificar/:id", modificar);
router.delete("/baja/:id", baja);

export default router;
