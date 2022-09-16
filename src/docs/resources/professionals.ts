import { components } from '@docs/config';

const {
  successResponse,
  badRequestError,
  unauthorizedError,
  conflictError,
  internalError,
} = components.responses;

export const professionals = {
  '/professionals/getById/{id}': {
    get: {
      tags: ['Profissionais'],
      security: [{ bearerAuth: [] }],
      summary: 'Recupera dados do profissinal',
      description: 'Retorna dados de um profissional',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'Id do profissional',
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
  '/professionals/updateById/{id}': {
    put: {
      tags: ['Profissionais'],
      security: [{ bearerAuth: [] }],
      summary: 'Altera cadastro do profissional',
      description: 'Rota para alterar dados um profissional',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'Id do profissional',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                crp: { type: 'string' },
                cellphone: { type: 'string' },
                approach: { type: 'string' },
              },
              required: ['name', 'crp', 'cellphone', 'approach'],
              example: {
                name: 'Emiliane Barbosa de Almeida',
                crp: '12345684787',
                cellphone: '(67)98100-0009',
                approach: 'Terapia Cognitiva',
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
