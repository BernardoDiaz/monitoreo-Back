import { Router } from "express";
import validateToken from "../UserRoute/validate-token";
import { deleteCategoria, getCategorias, newCategoria, updateCategoria } from "../../controllers/MonitoreoControllers/CategoriasController";

const router = Router();

router.post("/", newCategoria);
router.get("/", getCategorias);
router.put("/:id", updateCategoria);
router.delete("/:id", deleteCategoria);

export default router;