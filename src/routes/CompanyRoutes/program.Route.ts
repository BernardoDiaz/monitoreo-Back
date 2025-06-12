import {Router} from 'express';
import validateToken from '../UserRoute/validate-token';
import { deleteProgram, getPrograms, newProgram, updateProgram } from '../../controllers/CompanyControllers/program.Controller';

const router = Router();

router.post('/',newProgram);
router.get('/:id',getPrograms);
router.put('/:id',updateProgram);
router.delete('/:id',deleteProgram);

export default router;