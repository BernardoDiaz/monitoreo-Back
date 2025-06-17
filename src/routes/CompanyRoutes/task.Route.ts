import {Router} from 'express';
import validateToken from '../UserRoute/validate-token';
import { deleteTask, getTasks, newTask, updateTasksBulk } from '../../controllers/CompanyControllers/task.Controller';

const router = Router();

router.post('/',newTask);
router.get('/:companyId',getTasks);
router.put('/',updateTasksBulk);
router.delete('/:id',deleteTask);

export default router;