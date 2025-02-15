import { Router } from "express";
import { getPrueba } from "../controllers/prueba.controllers.js";

const router = Router();

router.get("/prueba", getPrueba)

export default router;