import {Router} from 'express';
import validateToken from '../UserRoute/validate-token';
import { deleteCliente, getCliente, getClientes, newCliente, updateCliente } from '../../controllers/MonitoreoControllers/Clientes.Controller';

const router = Router();

router.get('/',getClientes);
router.get('/empresas',getCliente);
router.post('/',newCliente);
router.put('/:id',updateCliente);
router.delete('/:id',deleteCliente);
export default router;