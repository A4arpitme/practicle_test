import express from 'express';

import { rateLimiterAuth } from './../middleware/rateLimiting';
import  proxyRouter  from './proxy/_routes';

const app = express();

app.use('/', rateLimiterAuth , proxyRouter);

export default app;