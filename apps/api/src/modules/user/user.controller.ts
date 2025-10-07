import type { FastifyRequest, FastifyReply } from "fastify";

//Services and Schemas
import { createUser } from "./user.service.ts";

//Utils
import { sendResponse } from "../../utils/response.utils.ts";

export async function RegisterUserHandler(request: FastifyRequest, reply: FastifyReply) {

    const userDetails = (request as any).userDetails;
    const videoBuffer = (request as any).videoBuffer;
    const mimeType = (request as any).mimeType;

    const user = await createUser({
        ...userDetails,
        videoBuffer,
        mimeType,
    });

    return sendResponse(reply, 200, true, "The user was registered successfully", user);
}