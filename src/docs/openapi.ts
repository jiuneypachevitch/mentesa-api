import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Mente SÃ - API',
    version,
    description:
      'Rest API Application with Node.js, TypeScript, Prisma, PostgreSQL and Express API Server.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Grupo 2 - Gama Academy',
      url: 'https://github.com/alecanutto/gama-academy-project-mentesa-api.git',
    },
  },

  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,

  // Paths to files containing OpenAPI definitions
  apis: ['**/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
