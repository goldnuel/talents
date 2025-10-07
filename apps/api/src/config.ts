import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define a schema for environment variables
const envSchema = z.object({
    PORT: z.coerce.number().default(4000),
    DATABASE_URL: z.string(),
    FILE_SIZE: z.coerce.number(),
    BUCKET_NAME: z.string(),
    BUCKET_REGION: z.string(),
    ACCESS_KEY: z.string(),
    SECRET_ACCESS_KEY: z.string(),
    ZEPTO_API_TOKEN: z.string(),
    ZEPTO_FROM_EMAIL: z.string(),
    EMAIL_NOTIFICATION: z.email(),
    LINK: z.url(),
    LOCAL_ORIGIN: z.url(),
    LIVE_ORIGIN: z.url()
})

// Validate the environment variables
const parsedEnv = envSchema.parse(process.env);

// Export validated variables
export const { PORT, DATABASE_URL, FILE_SIZE, BUCKET_NAME, BUCKET_REGION, ACCESS_KEY, SECRET_ACCESS_KEY, ZEPTO_API_TOKEN, ZEPTO_FROM_EMAIL, EMAIL_NOTIFICATION, LINK, LOCAL_ORIGIN, LIVE_ORIGIN } = parsedEnv;