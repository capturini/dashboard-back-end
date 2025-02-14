import { Router } from 'express';

const router = Router();

// Mock settings data store
let settings = {
  notifications: {
    email: true,
    push: true,
    frequency: 'daily'
  },
  defaultWilaya: 'Wilaya 16',
  thresholds: {
    compliance: 75,
    stockLevel: 25,
    displayScore: 80
  },
  displayPreferences: {
    language: 'en',
    theme: 'light',
    timezone: 'Africa/Algiers'
  }
};

/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Get all settings
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Successfully retrieved settings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Settings'
 */
router.get('/', (req, res) => {
  console.log('settings');
  console.log(`[${new Date().toISOString()}] GET /api/settings`);
  
  res.json({
    status: 'success',
    data: settings
  });
});

/**
 * @swagger
 * /settings/notifications:
 *   put:
 *     summary: Update notification settings
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: boolean
 *               push:
 *                 type: boolean
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly, monthly]
 *     responses:
 *       200:
 *         description: Successfully updated notification settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put('/notifications', (req, res) => {
  console.log(`[${new Date().toISOString()}] PUT /api/settings/notifications`, {
    body: req.body
  });
  
  const { email, push, frequency } = req.body;
  
  settings.notifications = {
    ...settings.notifications,
    ...(email !== undefined && { email }),
    ...(push !== undefined && { push }),
    ...(frequency !== undefined && { frequency })
  };

  res.json({
    status: 'success',
    data: settings.notifications
  });
});

/**
 * @swagger
 * /settings/thresholds:
 *   put:
 *     summary: Update threshold settings
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               compliance:
 *                 type: number
 *               stockLevel:
 *                 type: number
 *               displayScore:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully updated thresholds
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put('/thresholds', (req, res) => {
  console.log('thresholds');
  console.log(`[${new Date().toISOString()}] PUT /api/settings/thresholds`, {
    body: req.body
  });
  
  const { compliance, stockLevel, displayScore } = req.body;
  
  settings.thresholds = {
    ...settings.thresholds,
    ...(compliance !== undefined && { compliance }),
    ...(stockLevel !== undefined && { stockLevel }),
    ...(displayScore !== undefined && { displayScore })
  };

  res.json({
    status: 'success',
    data: settings.thresholds
  });
});

/**
 * @swagger
 * /settings/default-wilaya:
 *   put:
 *     summary: Update default wilaya
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               wilaya:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Successfully updated default wilaya
 *       400:
 *         description: Wilaya is required
 */
router.put('/default-wilaya', (req, res) => {
  console.log('default wilaya');
  console.log(`[${new Date().toISOString()}] PUT /api/settings/default-wilaya`, {
    body: req.body
  });
  
  const { wilaya } = req.body;
  
  if (!wilaya) {
    return res.status(400).json({
      status: 'error',
      message: 'Wilaya is required'
    });
  }

  settings.defaultWilaya = wilaya;

  res.json({
    status: 'success',
    data: { defaultWilaya: settings.defaultWilaya }
  });
});

/**
 * @swagger
 * /settings/display-preferences:
 *   put:
 *     summary: Update display preferences
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *               theme:
 *                 type: string
 *               timezone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated display preferences
 */
router.put('/display-preferences', (req, res) => {
  console.log('display preferences');
  console.log(`[${new Date().toISOString()}] PUT /api/settings/display-preferences`, {
    body: req.body
  });
  
  const { language, theme, timezone } = req.body;
  
  settings.displayPreferences = {
    ...settings.displayPreferences,
    ...(language !== undefined && { language }),
    ...(theme !== undefined && { theme }),
    ...(timezone !== undefined && { timezone })
  };

  res.json({
    status: 'success',
    data: settings.displayPreferences
  });
});

/**
 * @swagger
 * /settings/reset:
 *   post:
 *     summary: Reset all settings to default values
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Successfully reset settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/reset', (req, res) => {
  console.log('reset');
  console.log(`[${new Date().toISOString()}] POST /api/settings/reset`);
  
  settings = {
    notifications: {
      email: true,
      push: true,
      frequency: 'daily'
    },
    defaultWilaya: 'Wilaya 16',
    thresholds: {
      compliance: 75,
      stockLevel: 25,
      displayScore: 80
    },
    displayPreferences: {
      language: 'en',
      theme: 'light',
      timezone: 'Africa/Algiers'
    }
  };

  res.json({
    status: 'success',
    message: 'Settings reset to default values',
    data: settings
  });
});

export default router; 