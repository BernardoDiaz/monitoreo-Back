import {Router} from 'express';
import validateToken from '../UserRoute/validate-token';
import { deleteQuote, getQuote, createQuoteWithDetails, updateQuote } from '../../controllers/Quote/quote.Controller';

const router = Router();

router.post('/',createQuoteWithDetails);
router.get('/:companyId',getQuote);
router.put('/:id',updateQuote);
router.delete('/:id',deleteQuote);

export default router;