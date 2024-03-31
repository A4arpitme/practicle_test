import express, { Application } from 'express';
import config from 'config';
import errorHandler from './startup/error';
import routes from './startup/router';
import { redisClient } from './helper/redisHelper';

const app: Application = express();

routes(app);
errorHandler();

redisClient.on('connect', function () {
    console.log('redis connected');
}).on('error', function (error) {
    console.log(error);
});

const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`connnected on port ${port}`));