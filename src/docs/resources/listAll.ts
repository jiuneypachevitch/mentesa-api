import { components } from '@docs/config';

const { successResponse, badRequestError, unauthorizedError, internalError } = components.responses;

export const listAll = {
  '/resources/list': {
    get: {
      tags: ['Recursos'],
      security: [{ bearerAuth: [] }],
      summary: 'Listagem de recursos',
      description: 'Listagem de todos os recursos cadastrados',
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '500': internalError,
      },
    },
  },
};

