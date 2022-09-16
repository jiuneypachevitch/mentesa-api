import { SERVERS } from '@utils/constants';

export const header = {
  openapi: '3.0.0',
  info: {
    title: 'API-Mente-SA',
    description: 'Rest API Application with Node.js, TypeScript, Prisma, PostgreSQL and Express API Server.',
    version: '1.0.0',
    contact: {
      name: 'Grupo 2 - Gama Academy',
      url: 'https://github.com/MenteSA/mentesa-api.git'
    },
  },
  servers: [SERVERS[process.env.NODE_ENV]],
};

