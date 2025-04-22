import { Router } from "express";
import validateToken from "../UserRoute/validate-token";
import { ActualizarSeguimiento, EliminarSeguimiento, getSeguimiento, NuevoSeguimiento } from "../../controllers/MonitoreoControllers/Seguimiento.Controller";

const router = Router();

router.get("/", getSeguimiento);
router.post("/", NuevoSeguimiento); 
router.put("/:idSeguimiento", ActualizarSeguimiento);
router.delete('/:idSeguimiento',EliminarSeguimiento);

export default router;