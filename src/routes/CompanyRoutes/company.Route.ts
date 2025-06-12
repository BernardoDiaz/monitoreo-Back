import {Router} from 'express';
import validateToken from '../UserRoute/validate-token';
import { deleteCompany, getCompanyById, getCompanys, newCompany, updateCompany } from '../../controllers/CompanyControllers/company.Controller';

const router = Router();

router.post('/',newCompany);
router.get('/',getCompanys);
router.get('/profile/:id',getCompanyById);
router.put('/:id',updateCompany);
router.delete('/:id',deleteCompany);
export default router;