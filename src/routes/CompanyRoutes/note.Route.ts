import {Router} from 'express';
import validateToken from '../UserRoute/validate-token';
import { deleteNote, getNotes, newNote, updateNote } from '../../controllers/CompanyControllers/note.Controller';

const router = Router();

router.post('/',newNote);
router.get('/:id',getNotes);
router.put('/:id',updateNote);
router.delete('/:id',deleteNote);

export default router;