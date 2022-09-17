import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../../package.json';
import { SERVERS } from '@utils/constants';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API-Mente-SA',
    version,
    description:
      'Aplicação Rest utilizando as tecnologias Node.js, TypeScript, Prisma, PostgreSQL e Express API Server.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Grupo 2 - Gama Academy',
      url: 'https://github.com/MenteSA/mentesa-api.git',
    },
  },
  servers: [SERVERS[process.env.NODE_ENV]],
};

const options = {
  swaggerDefinition,

  // Paths to files containing OpenAPI definitions
  // apis: ['**/*.ts'],
  apis: [
    '**/auth.yaml',
    '**/user.yaml',
    '**/professional.yaml',
    '**/patient.yaml',
    '**/resource.yaml',
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
