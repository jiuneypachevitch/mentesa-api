import { components } from '@docs/config';

const {
  createdResponse,
  badRequestError,
  unauthorizedError,
  conflictError,
  internalError,
} = components.responses;

export const auth = {
  '/auth/register': {
    post: {
      tags: ['Autenticação'],
      summary: 'Cadastra usuário',
      description: 'Rota para a criação de um usuário',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
              },
              required: ['name', 'email', 'password'],
              example: {
                name: 'Ranielle Almeida',
                email: 'rani@gmail.com',
                password: '12345678',
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
  '/auth/login': {
    post: {
      tags: ['Autenticação'],
      summary: 'Loga usuário',
      description: 'Rota para logar um usuário',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                password: { type: 'string' },
              },
              required: ['email', 'password'],
              example: {
                email: 'rani@gmail.com',
                password: '12345678',
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
  '/auth/refresh-token': {
    post: {
      tags: ['Autenticação'],
      security: [{ bearerAuth: [] }],
      summary: 'Atualiza token de acesso',
      description: 'Rota para recriar token de acesso',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                refresh_token: { type: 'string' },
              },
              required: ['refresh_token'],
              example: {
                refresh_token: '5bc568cc-6bcc-4b79-9dbf-bea5528f8171',
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
