import { Router } from 'express';
import {checkProxy} from './proxy';

const router = Router();

router.post('/proxy' , checkProxy);

export default router;