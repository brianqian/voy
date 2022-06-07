import express, { Request, Response } from 'express';
import authRoutes from './auth.routes';

const router = express.Router();

router.use('/auth', authRoutes);

router.get('/ping', (req: Request, res: Response) => {
  console.log('pong');
});

export default router;
