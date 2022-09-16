import { components } from '@docs/config';

const { successResponse, badRequestError, unauthorizedError, internalError } = components.responses;

export const getOne = {
  '/resources/get/{id}': {
    get: {
      tags: ['Recursos'],
      security: [{ bearerAuth: [] }],
      summary: 'Obter um recurso',
      description: 'Visualizar um recurso específico',
      parameters: [
        {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer'},
            description: 'Id do recurso'
        }
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

