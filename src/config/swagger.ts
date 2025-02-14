import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ramy Display Management System API',
      version: '1.0.0',
      description: 'API documentation for Ramy Display Management System',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Settings: {
          type: 'object',
          properties: {
            notifications: {
              type: 'object',
              properties: {
                email: { type: 'boolean' },
                push: { type: 'boolean' },
                frequency: { type: 'string', enum: ['daily', 'weekly', 'monthly'] }
              }
            },
            defaultWilaya: { type: 'string' },
            thresholds: {
              type: 'object',
              properties: {
                compliance: { type: 'number' },
                stockLevel: { type: 'number' },
                displayScore: { type: 'number' }
              }
            },
            displayPreferences: {
              type: 'object',
              properties: {
                language: { type: 'string' },
                theme: { type: 'string' },
                timezone: { type: 'string' }
              }
            }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', enum: ['success', 'error'] },
            data: { type: 'object' },
            message: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

export const specs = swaggerJsdoc(options); 