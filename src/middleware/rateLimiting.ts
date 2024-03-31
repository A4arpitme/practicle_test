import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { redisClient } from "../helper/redisHelper";

const opts = {
  storeClient: redisClient,
  points: 5, // Number of points
  duration: 30 , // Per second(s)
  
  // Custom
  blockDuration: 0, // Do not block if consumed more than points
  keyPrefix: 'rlflx', // must be unique for limiters with different purpose
};

const rateLimiterRedis = new RateLimiterRedis(opts);

export const rateLimiterAuth = (req: Request, res: Response, next: NextFunction) => {
  rateLimiterRedis.consume(req.socket.remoteAddress as string)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(400).send('Too Many Requests');
      });
  };
  