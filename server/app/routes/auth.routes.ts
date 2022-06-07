import express from 'express';
import * as Controller from '../controllers/auth.controller';

const router = express.Router();

router.post('/sign-up', Controller.createUser);
router.post('/login', Controller.nativeLogin);

export default router;
