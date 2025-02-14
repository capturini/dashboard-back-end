import { Router } from 'express';
import { mockData } from '../utils/mockData';

const router = Router();

/**
 * @swagger
 * /stats/display:
 *   get:
 *     summary: Get display performance statistics
 *     tags: [Statistics]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for statistics (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for statistics (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Successfully retrieved display statistics
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
 *                     trends:
 *                       type: object
 *                       properties:
 *                         premium:
 *                           type: object
 *                           properties:
 *                             count:
 *                               type: number
 *                               example: 450
 *                             compliance:
 *                               type: number
 *                               example: 85
 *                         standard:
 *                           type: object
 *                           properties:
 *                             count:
 *                               type: number
 *                               example: 550
 *                             compliance:
 *                               type: number
 *                               example: 75
 *                         basic:
 *                           type: object
 *                           properties:
 *                             count:
 *                               type: number
 *                               example: 250
 *                             compliance:
 *                               type: number
 *                               example: 65
 *                     wilayaDistribution:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           wilaya:
 *                             type: string
 *                           displayCount:
 *                             type: number
 */
router.get('/display', (req, res) => {  
  console.log('display');
  // Mock display statistics data
  const displayStats = {
    trends: {
      premium: { count: 450, compliance: 85 },
      standard: { count: 550, compliance: 75 },
      basic: { count: 250, compliance: 65 }
    },
    wilayaDistribution: mockData.locations.wilayas.map(w => ({
      wilaya: w.name,
      displayCount: w.activeDisplays
    }))
  };

  res.json({
    status: 'success',
    data: displayStats
  });
});

export default router; 