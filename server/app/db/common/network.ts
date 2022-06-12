import { Prisma } from '@prisma/client';
import prisma from '../../lib/prisma-client/index.js';

export async function create(args: Prisma.NetworkCreateInput) {
  return prisma.network.create({ data: args });
}
