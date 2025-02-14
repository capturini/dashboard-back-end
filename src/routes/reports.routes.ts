import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /reports/daily:
 *   get:
 *     summary: Get daily report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Report date (YYYY-MM-DD)
 *       - in: query
 *         name: wilaya
 *         schema:
 *           type: string
 *         description: Filter by wilaya
 *     responses:
 *       200:
 *         description: Successfully retrieved daily report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       format: date
 *                     displayChecks:
 *                       type: number
 *                     complianceRate:
 *                       type: number
 *                     activities:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                           count:
 *                             type: number
 */
router.get('/daily', (req, res) => {
  console.log('daily report');
  const { date, wilaya } = req.query;
  console.log(`[${new Date().toISOString()}] GET /api/reports/daily`, {
    filters: { date, wilaya }
  });

  const dailyReport = {
    date: new Date().toISOString().split('T')[0],
    displayChecks: 125,
    complianceRate: 82,
    activities: [
      { type: 'display_setup', count: 45 },
      { type: 'maintenance', count: 65 },
      { type: 'compliance_check', count: 15 }
    ]
  };

  res.json({
    status: 'success',
    data: dailyReport
  });
});

/**
 * @swagger
 * /reports/weekly:
 *   get:
 *     summary: Get weekly report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date of the week (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Successfully retrieved weekly report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     weekNumber:
 *                       type: number
 *                     trends:
 *                       type: object
 *                       properties:
 *                         compliance:
 *                           type: number
 *                         resolution:
 *                           type: number
 *                     totalChecks:
 *                       type: number
 */
router.get('/weekly', (req, res) => {
  console.log('weekly report');
  const { startDate } = req.query;
  console.log(`[${new Date().toISOString()}] GET /api/reports/weekly`, {
    filters: { startDate }
  });

  // Mock weekly report data
  res.json({
    status: 'success',
    data: {
      weekNumber: 15,
      trends: { compliance: 78, resolution: 85 },
      totalChecks: 875
    }
  });
});

/**
 * @swagger
 * /reports/monthly:
 *   get:
 *     summary: Get monthly report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Month number (1-12)
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Year (YYYY)
 *     responses:
 *       200:
 *         description: Successfully retrieved monthly report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     month:
 *                       type: number
 *                     year:
 *                       type: number
 *                     metrics:
 *                       type: object
 *                       properties:
 *                         totalDisplays:
 *                           type: number
 *                         averageCompliance:
 *                           type: number
 */
router.get('/monthly', (req, res) => {
  const { month, year } = req.query;
  console.log(`[${new Date().toISOString()}] GET /api/reports/monthly`, {
    filters: { month, year }
  });

  res.json({
    status: 'success',
    data: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      metrics: {
        totalDisplays: 1250,
        averageCompliance: 80
      }
    }
  });
});

export default router; 