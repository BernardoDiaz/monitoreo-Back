import {Router} from 'express';
import validateToken from '../UserRoute/validate-token';
import { deleteQuoteDetails, getQuoteDetails, updateQuoteDetails } from '../../controllers/Quote/quoteDetails.Controller';

const router = Router();

router.get('/:quoteId',getQuoteDetails);
router.put('/:id',updateQuoteDetails);
router.delete('/:id',deleteQuoteDetails);

export default router;