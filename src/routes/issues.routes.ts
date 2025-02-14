import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /issues/display:
 *   get:
 *     summary: Get display-related issues
 *     tags: [Issues]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [open, in_progress, resolved]
 *         description: Filter by issue status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [high, medium, low]
 *         description: Filter by priority level
 *       - in: query
 *         name: wilaya
 *         schema:
 *           type: string
 *         description: Filter by wilaya
 *     responses:
 *       200:
 *         description: Successfully retrieved display issues
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
 *                       type:
 *                         type: string
 *                         enum: [broken, misplaced, missing]
 *                       priority:
 *                         type: string
 *                         enum: [high, medium, low]
 *                       status:
 *                         type: string
 *                         enum: [open, in_progress, resolved]
 *                       location:
 *                         type: string
 *                       reportedAt:
 *                         type: string
 *                         format: date-time
 */
router.get('/display', (req, res) => {
  console.log('display issues');
  const { status, priority, wilaya } = req.query;
  console.log(`[${new Date().toISOString()}] GET /api/issues/display`, {
    filters: { status, priority, wilaya }
  });

  const displayIssues = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    type: ['broken', 'misplaced', 'missing'][Math.floor(Math.random() * 3)],
    priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
    status: ['open', 'in_progress', 'resolved'][Math.floor(Math.random() * 3)],
    location: `Sales Point ${Math.floor(Math.random() * 50) + 1}`,
    reportedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
  }));

  res.json({
    status: 'success',
    data: displayIssues
  });
});

/**
 * @swagger
 * /issues/stock:
 *   get:
 *     summary: Get stock-related issues
 *     tags: [Issues]
 *     parameters:
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [high, medium, low]
 *         description: Filter by priority level
 *       - in: query
 *         name: wilaya
 *         schema:
 *           type: string
 *         description: Filter by wilaya
 *     responses:
 *       200:
 *         description: Successfully retrieved stock issues
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
 *                       product:
 *                         type: string
 *                       currentStock:
 *                         type: number
 *                       requiredStock:
 *                         type: number
 *                       location:
 *                         type: string
 *                       priority:
 *                         type: string
 *                         enum: [high, medium, low]
 */
router.get('/stock', (req, res) => {
  console.log('stock issues');
  const { priority, wilaya } = req.query;
  console.log(`[${new Date().toISOString()}] GET /api/issues/stock`, {
    filters: { priority, wilaya }
  });

  const stockIssues = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    product: `Product ${i + 1}`,
    currentStock: Math.floor(Math.random() * 50),
    requiredStock: 100,
    location: `Sales Point ${Math.floor(Math.random() * 50) + 1}`,
    priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)]
  }));

  res.json({
    status: 'success',
    data: stockIssues
  });
});

export default router; 