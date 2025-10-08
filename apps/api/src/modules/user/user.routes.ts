import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

//Controllers
import { RegisterUserHandler } from "./user.controller.js";

//Middlewares and Configs
import { fileValidationMiddleware } from "../../middlewares/fileValidation.js";
import { FILE_SIZE } from "../../config.js";

export async function userRoutes(app: FastifyInstance) {

    const appWithZod = app.withTypeProvider<ZodTypeProvider>();

    appWithZod.post("/register", {
        preHandler: fileValidationMiddleware({
            allowedTypes: ["video/mp4", "video/webm"],
            limits: { fileSize: FILE_SIZE * 1024 * 1024 },
        }),
        schema: {
            tags: ["Users"],
        }
    },
        RegisterUserHandler
    );
}
