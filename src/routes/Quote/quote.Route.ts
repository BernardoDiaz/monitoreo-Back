import {Router} from 'express';
import validateToken from '../UserRoute/validate-token';
import { deleteQuote, getQuote, createQuoteWithDetails, updateQuote, updateQuoteTotal, updateQuoteStatusById } from '../../controllers/Quote/quote.Controller';

const router = Router();

router.post('/',createQuoteWithDetails);
router.get('/:companyId',getQuote);
router.put('/:id',updateQuote);
router.put('/total/:id',updateQuoteTotal);
router.put('/status/:id',updateQuoteStatusById);
router.delete('/:id',deleteQuote);

export default router;