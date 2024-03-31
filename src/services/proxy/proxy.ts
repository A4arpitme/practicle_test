import { Request, Response } from "express";
import { redisClient } from "../../helper/redisHelper";

export const checkProxy = async (req: Request, res: Response) => {
  const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails
  &mine=true`;
  const cachedResponse = await redisClient.get(apiUrl);
  if (cachedResponse) {
      res.send(JSON.parse(cachedResponse));
  } else {
      try {
          const response = await fetch(apiUrl);
          if (response.ok) {
              const data = await response.json();
              const TTL = 60; // TTL in seconds (configurable)
              redisClient.setEx(apiUrl, TTL, JSON.stringify(data));
              res.send(data);
          } else {
              res.status(response.status).send(response.statusText);
          }
      } catch (error) {
          res.status(500).send('Internal Server Error');
      }
  }
};
