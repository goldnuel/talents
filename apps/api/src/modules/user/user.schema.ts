import { z } from "zod";

export const registerSchema = z.object({
    fullName: z.string(),
    emailAddress: z.email(),
    phoneNumber: z.string(),
    story: z.string(),
});