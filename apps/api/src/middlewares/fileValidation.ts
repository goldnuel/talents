import type { FastifyReply, FastifyRequest } from "fastify";

//Schemas
import { registerSchema } from "../modules/user/user.schema.ts";

//Utils
import { sendResponse } from "../utils/response.utils.ts";


export const fileValidationMiddleware = (options: FileValidationOptions) => {

    return async (request: FastifyRequest, reply: FastifyReply) => {
        
        const limits = options.limits;
        const allowedTypes = options.allowedTypes;

        const parts = request.parts();

        let userDetails: any = null;
        let videoBuffer: Buffer | null = null;
        let mimeType: string | null = null;

        for await (const part of parts) {
            if (part.type === "file" && part.fieldname === "danceVideo") {
                if (!allowedTypes.includes(part.mimetype)) {
                    return sendResponse(reply, 400, false, "Invalid file type");
                }

                const chunks: Buffer[] = [];
                let totalSize = 0;

                for await (const chunk of part.file) {
                    totalSize += chunk.length;
                    if (totalSize > limits.fileSize) {
                        return sendResponse(reply, 400, false, "File is too large");
                    }
                    chunks.push(chunk);
                }

                videoBuffer = Buffer.concat(chunks);
                mimeType = part.mimetype;
            } else if (part.type === "field" && part.fieldname === "userDetails") {
                if (typeof part.value !== "string") {
                    return sendResponse(reply, 400, false, "Invalid userDetails format");
                }
                const parsed = JSON.parse(part.value);
                userDetails = registerSchema.parse(parsed);
            }
        }

        if (!userDetails || !videoBuffer) {
            return sendResponse(reply, 400, false, "User details and video are required.");
        }

        // Attach parsed data to request for controller
        (request as any).userDetails = userDetails;
        (request as any).videoBuffer = videoBuffer;
        (request as any).mimeType = mimeType;

        return;
    };
};