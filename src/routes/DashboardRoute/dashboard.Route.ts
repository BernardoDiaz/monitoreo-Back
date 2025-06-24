import {Router} from 'express';
import validateToken from '../UserRoute/validate-token';
import {getMonthlySales, getQuoteStatusPercentages, getSalesPercentageByCountry, getUserManagedCompaniesCount, getUserManagedPendingTasksCount, getUserManagedProgramsThisWeek, getUserManagedQuotesCount, getUserManagedSoldQuotes, getUserManagedTasks } from '../../controllers/dashboardControllers/dashboard.Controller';

const router = Router();

router.get('/task/:userId',getUserManagedTasks);
router.get('/companies/:userId', getUserManagedCompaniesCount);
router.get('/quotes/:userId', getUserManagedQuotesCount);
router.get('/tasks/pending/:userId', getUserManagedPendingTasksCount);
router.get('/programs/:userId', getUserManagedProgramsThisWeek);
router.get('/sales/percentage/country/:userId', getSalesPercentageByCountry);
router.get('/monthlySales/:userId', getMonthlySales);
router.get('/quotes/sold/:userId', getUserManagedSoldQuotes);
router.get('/statusSales/:userId', getQuoteStatusPercentages);

export default router;