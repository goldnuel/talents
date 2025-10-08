import Fastify from 'fastify';
import type { FastifyInstance, FastifyError } from 'fastify';
import fastifyCors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

//Utils and Configs
import { sendResponse } from './utils/response.utils.js';
import { setupSwagger } from './utils/swagger.js';
import { FILE_SIZE, LIVE_ORIGIN, LOCAL_ORIGIN } from './config.js';

//Routes
import { userRoutes } from './modules/user/user.routes.js';

export const app: FastifyInstance = Fastify({ logger: { level: 'info' }, trustProxy: 3 });

// Register Zod compilers to Fastify (so Fastify uses Zod for validation)
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Build the Fastify app
export const buildApp = (): FastifyInstance => {

    //For the documentation
    setupSwagger(app);

    app.register(fastifyCors, {
        origin: [LOCAL_ORIGIN, LIVE_ORIGIN],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
    })

    //Register Multipart 
    app.register(multipart, {
        limits: {
            fileSize: FILE_SIZE * 1024 * 1024,
        },
    });

    app.register(userRoutes, { prefix: '/v1/api/user' });

    // Health Check Endpoint
    app.get('/health', async () => {
        return { status: 'OK' };
    });

    // Global error handler
    app.setErrorHandler((error: FastifyError, request, reply) => {

        if (error.code === "FST_REQ_FILE_TOO_LARGE") {
            return sendResponse(reply, 413, false, "File too large. Max 50MB allowed.")
        }

        // Generic fallback
        request.log.error(error);
        return sendResponse(reply, 500, false, error.message);
    });

    return app;
};