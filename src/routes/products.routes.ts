import { Router } from 'express';
import { ProductAgent } from '../services/productAgent';

const router = Router();
const productAgent = new ProductAgent();

// Initialize the agent when the server starts
(async () => {
  await productAgent.initialize();
})();

/**
 * @swagger
 * /products/search:
 *   post:
 *     summary: Search for a product by description
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Natural language description of the product
 *     responses:
 *       200:
 *         description: Successfully found product
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
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     similarity:
 *                       type: number
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.post('/search', async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({
        status: 'error',
        message: 'Description is required'
      });
    }

    const result = await productAgent.searchProduct(description);

    if (!result) {
      return res.status(404).json({
        status: 'error',
        message: 'No matching product found'
      });
    }

    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    console.error('Error in product search:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to search for product'
    });
  }
});

/**
 * @swagger
 * /products/verify:
 *   post:
 *     summary: Verify product information from natural language input
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               input:
 *                 type: string
 *                 description: Natural language description of product quantity and details
 *                 example: "I have 3 units from 1L of strawberry flavor of Ramy juice"
 *     responses:
 *       200:
 *         description: Successfully verified product information
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
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     verified:
 *                       type: boolean
 *                     details:
 *                       type: object
 *                       properties:
 *                         quantity:
 *                           type: number
 *                         size:
 *                           type: string
 *                         flavor:
 *                           type: string
 *                         brand:
 *                           type: string
 *                         matchConfidence:
 *                           type: number
 *                     suggestedCorrections:
 *                       type: object
 *                       properties:
 *                         quantity:
 *                           type: number
 *                         size:
 *                           type: string
 *                         flavor:
 *                           type: string
 *                         brand:
 *                           type: string
 */
router.post('/verify', async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({
        status: 'error',
        message: 'Input is required'
      });
    }

    const result = await productAgent.verifyProduct(input);

    if (!result) {
      return res.status(404).json({
        status: 'error',
        message: 'No matching product found'
      });
    }

    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    console.error('Error in product verification:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to verify product information'
    });
  }
});

// Add a new test product
router.post('/test/add', async (req, res) => {
  try {
    await productAgent.addProduct({
      id: "test-1",
      name: "Ramy Orange 1L",
      description: "Ramy orange flavored juice drink in 1 liter bottle",
      quantity: 1,
      size: "1L",
      flavor: "orange",
      brand: "Ramy"
    });

    res.json({
      status: 'success',
      message: 'Test product added'
    });
  } catch (error) {
    console.error('Error adding test product:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to add test product'
    });
  }
});

// Test verification with sample input
router.post('/test/verify', async (req, res) => {
  try {
    const result = await productAgent.verifyProduct(
      "I have 3 units of 1L Ramy orange juice"
    );
    
    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    console.error('Error in test verification:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to verify test product'
    });
  }
});

export default router; 