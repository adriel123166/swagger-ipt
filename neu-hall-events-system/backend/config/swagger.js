const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NEU Hall Events System API',
      version: '1.0.0',
      description: 'API documentation for the NEU Hall Events System',
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Local server' },
      { url: 'https://swagger-ipt-production.up.railway.app', description: 'Production' },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);