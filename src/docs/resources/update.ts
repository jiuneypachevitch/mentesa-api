import { components } from '@docs/config';

const {
  successResponse,
  badRequestError,
  unauthorizedError,
  conflictError,
  internalError,
  notFoundError,
} = components.responses;

export const update = {
  '/resources/update/{id}': {
    patch: {
      tags: ['Recursos'],
      security: [{ bearerAuth: [] }],
      summary: 'Altera um recurso',
      description: 'Rota para a alteração de um recurso',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'Id do recurso',
        },
      ],
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
              required: [],
              example: {
                title: 'Ansiedade',
                category: 'Ferramenta',
              },
            },
          },
        },
      },
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '404': notFoundError,
        '409': conflictError,
        '500': internalError,
      },
    },
  },
};
