"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MetaVentaController_1 = require("../controllers/MetaVentaControllers/MetaVentaController");
const validate_token_1 = __importDefault(require("./UserRoute/validate-token"));
const router = (0, express_1.Router)();
// Registrar meta de ventas (solo admin/supervisor)
router.post('/metas-ventas', validate_token_1.default, MetaVentaController_1.registrarMetaVenta);
// Consultar metas del usuario autenticado
router.get('/metas-ventas', validate_token_1.default, MetaVentaController_1.consultarMetasPorUsuario);
// Consultar metas de otro usuario (solo admin/supervisor)
router.get('/metas-ventas/:usuarioId', validate_token_1.default, MetaVentaController_1.consultarMetasPorUsuario);
// Comparar metas vs ventas reales
router.get('/rendimiento-ventas', validate_token_1.default, MetaVentaController_1.rendimientoVentas);
exports.default = router;
