import { Router } from "express";
import { getPrueba } from "../controllers/prueba.controllers.js";
import { getEventos } from "../controllers/evento.controllers.js";
import { getQR, useQR } from "../controllers/qr.controllers.js";

const router = Router();

router.get("/prueba", getPrueba)

// Ruta para generar el QR
router.get("/ticket/:ticketId/qr", getQR);

// Ruta para usar el QR
router.get("/ticket/:ticketId/use", useQR);

// Ruta para obtener los eventos
router.get("/eventos", getEventos);

export default router;