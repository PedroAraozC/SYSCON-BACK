import express from "express";
import {
  //   alta,
  //   baja,
  //   modificar,
  //   obtener,
  //   obtenerAdmin,
  altaVenta,
} from "../controllers/cajaControllers.js";

const router = express.Router();

// router.get("/obtenerAdmin", obtenerAdmin);
// router.get("/obtener", obtener);
// router.post("/alta", alta);
router.post("/altaVenta", altaVenta);
// router.put("/modificar/:id", modificar);
// router.delete("/baja/:id", baja);

export default router;
