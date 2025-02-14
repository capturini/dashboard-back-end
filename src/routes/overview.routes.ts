import { Router } from 'express';
import { mockData } from '../utils/mockData';

const router = Router();

/**
 * @swagger
 * /overview:
 *   get:
 *     summary: Get dashboard overview statistics
 *     tags: [Overview]
 *     responses:
 *       200:
 *         description: Successfully retrieved overview statistics
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
 *                     displayPresenceCount:
 *                       type: number
 *                       example: 1250
 *                     activeSalesPoints:
 *                       type: number
 *                       example: 850
 *                     shelfSharePercentage:
 *                       type: number
 *                       example: 65.5
 *                     displayComplianceRate:
 *                       type: number
 *                       example: 78.2
 */
router.get('/', (req, res) => {
  console.log('overview');
  console.log(`[${new Date().toISOString()}] GET /api/overview`);
  
  res.json({
    status: 'success',
    data: mockData.overview
  });
});

export default router; 