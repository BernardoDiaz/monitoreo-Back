import {Router} from 'express';
import { deleteUser, getUserById, getUsers, loginUser,newUser, updateUser } from '../../controllers/UserControllers/User.Controller';
import validateToken from './validate-token';
 
const router = Router();

router.post('/', newUser);
router.post('/login',loginUser);
router.get('/',validateToken,getUsers);
router.get('/:username',validateToken,getUserById);
router.put('/:id',validateToken,updateUser);
router.delete('/:id',validateToken,deleteUser);

export default router; 