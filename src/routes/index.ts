import { Router } from 'express';
import overviewRoutes from './overview.routes';
import statsRoutes from './stats.routes';
import locationsRoutes from './locations.routes';
import teamRoutes from './team.routes';
import reportsRoutes from './reports.routes';
import issuesRoutes from './issues.routes';
import settingsRoutes from './settings.routes';
import productsRoutes from './products.routes';
import { ProductAgent } from '../services/productAgent';

const router = Router();
const productAgent = new ProductAgent();

router.use('/overview', overviewRoutes);
router.use('/stats', statsRoutes);
router.use('/locations', locationsRoutes);
router.use('/team', teamRoutes);
router.use('/reports', reportsRoutes);
router.use('/issues', issuesRoutes);
router.use('/settings', settingsRoutes);
router.use('/products', productsRoutes);

/**
 * @swagger
 * /api/product/family:
 *   post:
 *     summary: Find product family for a given product name
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "PET Extra Peche 30 CL"
 *     responses:
 *       200:
 *         description: Product family found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productName:
 *                   type: string
 *                 family:
 *                   type: string
 *                 confidence:
 *                   type: number
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/product/family', async (req, res) => {
  try {
    const { productName } = req.body;
    const result = await productAgent.findProductFamily(productName);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to find product family' });
  }
});

export default router; 