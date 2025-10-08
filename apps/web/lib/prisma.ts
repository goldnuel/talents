import { PrismaClient } from '@goldnuel/db/generated/prisma/index.js';

export const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error']})