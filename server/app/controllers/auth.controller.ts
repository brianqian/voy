import { Request, Response } from 'express';
import prisma from '../lib/prisma-client/index.js';

export async function createUser(req: Request, res: Response) {
  console.log('create user service hit');
  const user = { email: 'asdf2', password: 'asdf2' };
  // await prisma.user.create({ data: {email} });
}

export async function nativeLogin() {
  const user = await prisma.user.find;
  console.log('login user service hit');
}
