import express from "express";
import {
  alta,
  baja,
  modificar,
  obtener,
  obtenerAdmin,
} from "../controllers/categoriasControllers.js";

const router = express.Router();

router.get("/obtenerAdmin", obtenerAdmin);
router.get("/obtener", obtener);
router.post("/alta", alta);
router.put("/modificar/:id", modificar);
router.delete("/baja/:id", baja);

export default router;
