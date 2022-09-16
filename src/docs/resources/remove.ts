import { components } from '@docs/config';

const { successResponse, badRequestError, unauthorizedError, internalError } =
  components.responses;

export const remove = {
  '/resources/remove/{id}': {
    delete: {
      tags: ['Recursos'],
      security: [{ bearerAuth: [] }],
      summary: 'Remove um recurso',
      description: 'Realiza a exclusão de um recurso cadastrado',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'Id do recurso',
        },
      ],
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '500': internalError,
      },
    },
  },
};

