import { components } from '@docs/config';

const {
  successResponse,
  badRequestError,
  unauthorizedError,
  conflictError,
  internalError,
} = components.responses;

export const users = {
  '/users/updateById/{id}': {
    put: {
      tags: ['Usuários'],
      security: [{ bearerAuth: [] }],
      summary: 'Altera senha',
      description: 'Rota para alterar senha de um usuário',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'Id do usuário',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                password: { type: 'string' },
              },
              required: ['password'],
              example: {
                password: 'teste123',
              },
            },
          },
        },
      },
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '409': conflictError,
        '500': internalError,
      },
    },
  },
};
