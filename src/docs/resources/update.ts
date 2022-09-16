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
  '/users/{id}': {
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
  '/professionals/{id}': {
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
