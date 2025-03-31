import {Router} from 'express';
import validateToken from '../UserRoute/validate-token';
import { deleteCliente, getClientes, newCliente, updateCliente } from '../../controllers/MonitoreoControllers/ClientesController';

const router = Router();

router.get('/',getClientes);
router.post('/',newCliente);
router.put('/:id',updateCliente);
router.delete('/:id',deleteCliente);
export default router;