import {Router} from 'express';
import validateToken from '../UserRoute/validate-token';
import { deleteActivity, getActivities, newActivity, updateActivity } from '../../controllers/CompanyControllers/registerActivities.Controller';

const router = Router();

router.post('/',newActivity);
router.get('/:id',getActivities);
router.put('/:id',updateActivity);
router.delete('/:id',deleteActivity);

export default router;