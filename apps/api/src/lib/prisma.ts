import { PrismaClient } from '@goldnuel/db/generated/prisma';

export const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error']})