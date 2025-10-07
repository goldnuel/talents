import type { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export const setupSwagger = async (app: FastifyInstance) => {
  await app.register(fastifySwagger, {
    transform: jsonSchemaTransform,
    openapi: {
      info: {
        title: 'Goldnuel API',
        description: 'API documentation for Goldnuel API Endpoint',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:8080',
          description: 'Local server',
        },
      ],
      tags: [
        { name: 'Users', description: 'User related endpoints' }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  });

  await app.register(fastifySwaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
    staticCSP: true,
  });
};
