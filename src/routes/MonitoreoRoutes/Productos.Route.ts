import { Router } from "express";
import validateToken from "../UserRoute/validate-token";
import { newProducto, getProductos, updateProducto, deleteProducto } from "../../controllers/MonitoreoControllers/Productos.Controller";

const router = Router();

router.post("/", newProducto);
router.get("/", getProductos);
router.put("/:id", updateProducto);
router.delete("/:id", deleteProducto);

export default router; 