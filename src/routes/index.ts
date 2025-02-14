import { Router } from 'express';
import overviewRoutes from './overview.routes';
import statsRoutes from './stats.routes';
import locationsRoutes from './locations.routes';
import teamRoutes from './team.routes';
import reportsRoutes from './reports.routes';
import issuesRoutes from './issues.routes';
import settingsRoutes from './settings.routes';

const router = Router();

router.use('/overview', overviewRoutes);
router.use('/stats', statsRoutes);
router.use('/locations', locationsRoutes);
router.use('/team', teamRoutes);
router.use('/reports', reportsRoutes);
router.use('/issues', issuesRoutes);
router.use('/settings', settingsRoutes);

export { router }; 