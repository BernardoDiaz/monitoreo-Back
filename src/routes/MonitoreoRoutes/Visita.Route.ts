import { Router } from "express";
import validateToken from "../UserRoute/validate-token";
import { deleteVisita, getVisitas, getVisitasAgendadas, newVisita, updateVisita } from "../../controllers/MonitoreoControllers/Visita.Controller";
const router = Router();

router.get("/", getVisitas);
router.get("/agendadas", getVisitasAgendadas);
router.post("/", newVisita);
router.put("/:id", updateVisita);
router.delete("/:id", deleteVisita);

export default router; 