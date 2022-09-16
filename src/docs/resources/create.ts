import { components } from '@docs/config';

const { createdResponse, badRequestError, unauthorizedError, conflictError, internalError } =
  components.responses;

export const create = {
  '/resources': {
    post: {
      tags: ['Recursos'],
      security: [{ bearerAuth: [] }],
      summary: 'Cria um recurso',
      description: 'Rota para a criação de um recurso',
      requestBody: {  
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                category: { type: 'string' },
              },
              required: ['title', 'category'],
              example: {
                title: 'Ansiedade',
                category: 'Ferramenta',
              },
            },
          },
        },
      },
      responses: {
        '201': createdResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '409': conflictError,
        '500': internalError,
      },
    },
  },
};

