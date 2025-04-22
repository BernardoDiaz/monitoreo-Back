import { Router } from "express";
import validateToken from "../UserRoute/validate-token";
import { deleteConfiguracion, getConfiguracion, newConfiguracion, updateConfiguracion } from "../../controllers/MonitoreoControllers/Configuracion.Controller";

const router = Router();

router.post("/", newConfiguracion);
router.get("/", getConfiguracion);
router.put("/:id", updateConfiguracion);
router.delete("/:id", deleteConfiguracion);
export default router;