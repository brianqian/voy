import express, { Request, Response } from 'express';
import authRoutes from './auth.routes.js';
import * as Services from '../services/index.js';

const router = express.Router();

router.use('/auth', authRoutes);

router.get('/ping', (req: Request, res: Response) => {
  console.log('pong');
  Services.default.dataImport.importFile();
  res.json({ success: true });
});

export default router;
