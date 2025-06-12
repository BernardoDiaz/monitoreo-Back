import {Router} from 'express';
import validateToken from '../UserRoute/validate-token';
import { deleteTask, getTasks, newTask, updateTask } from '../../controllers/CompanyControllers/task.Controller';

const router = Router();

router.post('/',newTask);
router.get('/:id',getTasks);
router.put('/:id',updateTask);
router.delete('/:id',deleteTask);

export default router;