import express, { Request, Response } from 'express';
import authRoutes from './auth.routes.js';
// import * as Services from '../services/index.js';
import prisma from '../lib/prisma-client/index.js';

const router = express.Router();

router.use('/auth', authRoutes);

router.get('/ping', async (req: Request, res: Response) => {
  console.log('pong');
  const user = await prisma.user.findUnique({ where: { email: 'asdf' } });
  res.json({ user });
});

export default router;
