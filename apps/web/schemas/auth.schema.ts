import { z } from 'zod';

//For Signing Up
export const emailAuthSchema = z
    .object({
        email: z.email('Please enter a valid email address'),
        password: z
            .string('Password is required')
            .min(6, 'Password must have at least 6 characters')
    });

export type EmailAuth = z.infer<typeof emailAuthSchema>;