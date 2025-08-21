import { Router } from 'express';
import { registrarMetaVenta, consultarMetasPorUsuario, rendimientoVentas } from '../../controllers/MetaVentaControllers/MetaVenta.Controller';
import validateToken from '../UserRoute/validate-token';

const router = Router();

// Registrar meta de ventas (solo admin/supervisor)
router.post('/ventas', validateToken, registrarMetaVenta);

// Consultar metas del usuario autenticado
router.get('/ventas-usr', validateToken, consultarMetasPorUsuario);

// Consultar metas de otro usuario (solo admin/supervisor)
router.get('/ventas-ots/:usuarioId', validateToken, consultarMetasPorUsuario);

// Comparar metas vs ventas reales
router.get('/rendimiento-ventas', validateToken, rendimientoVentas);

export default router;
