import { Router } from 'express';
import { mockData } from '../utils/mockData';

const router = Router();

/**
 * @swagger
 * /team/merchandisers:
 *   get:
 *     summary: Get all merchandisers
 *     tags: [Team]
 *     parameters:
 *       - in: query
 *         name: wilaya
 *         schema:
 *           type: string
 *         description: Filter by wilaya
 *     responses:
 *       200:
 *         description: Successfully retrieved merchandisers
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
 *                       wilaya:
 *                         type: string
 *                       assignedAreas:
 *                         type: number
 *                       performanceScore:
 *                         type: number
 */
router.get('/merchandisers', (req, res) => {
  const { wilaya } = req.query;
  console.log(`[${new Date().toISOString()}] GET /api/team/merchandisers`, {
    filters: { wilaya }
  });

  res.json({
    status: 'success',
    data: mockData.team.merchandisers
  });
});

/**
 * @swagger
 * /team/supervisors:
 *   get:
 *     summary: Get all supervisors
 *     tags: [Team]
 *     responses:
 *       200:
 *         description: Successfully retrieved supervisors
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
 *                       region:
 *                         type: string
 *                       teamSize:
 *                         type: number
 *                       performanceScore:
 *                         type: number
 */
router.get('/supervisors', (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/team/supervisors`);

  res.json({
    status: 'success',
    data: mockData.team.supervisors
  });
});

export default router; 