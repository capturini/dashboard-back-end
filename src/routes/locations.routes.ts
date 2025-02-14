import { Router } from 'express';
import { mockData } from '../utils/mockData';

const router = Router();

/**
 * @swagger
 * /locations/sales-points:
 *   get:
 *     summary: Get all sales points
 *     tags: [Locations]
 *     parameters:
 *       - in: query
 *         name: wilaya
 *         schema:
 *           type: string
 *         description: Filter by wilaya
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [premium, standard, basic]
 *         description: Filter by location type
 *     responses:
 *       200:
 *         description: Successfully retrieved sales points
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       address:
 *                         type: string
 *                       type:
 *                         type: string
 *                         enum: [premium, standard, basic]
 *                       wilaya:
 *                         type: string
 *                       lastVisit:
 *                         type: string
 *                         format: date-time
 *                       displayScore:
 *                         type: number
 */
router.get('/sales-points', (req, res) => {
  console.log('sales points');
  const { wilaya, type } = req.query;
  console.log(`[${new Date().toISOString()}] GET /api/locations/sales-points`, {
    filters: { wilaya, type }
  });

  res.json({
    status: 'success',
    data: mockData.locations.salesPoints
  });
});

/**
 * @swagger
 * /locations/wilayas:
 *   get:
 *     summary: Get all wilayas with their statistics
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: Successfully retrieved wilayas data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       salesPointsCount:
 *                         type: number
 *                       activeDisplays:
 *                         type: number
 *                       complianceRate:
 *                         type: number
 */
router.get('/wilayas', (req, res) => {
  console.log('wilayas');
  console.log(`[${new Date().toISOString()}] GET /api/locations/wilayas`);

  res.json({
    status: 'success',
    data: mockData.locations.wilayas
  });
});

export default router; 