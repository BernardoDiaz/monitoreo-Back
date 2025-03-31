import { Router } from "express";
import validateToken from "../UserRoute/validate-token";
import { deleteConfiguracion, getConfiguracion, newConfiguracion, updateConfiguracion } from "../../controllers/MonitoreoControllers/ConfiguracionController";

const router = Router();

router.post("/", validateToken, newConfiguracion);
router.get("/", validateToken, getConfiguracion);
router.put("/:id", validateToken, updateConfiguracion);
router.delete("/:id", validateToken, deleteConfiguracion);
export default router;