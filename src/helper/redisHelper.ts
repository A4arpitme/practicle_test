import * as redis from 'redis';


export const redisClient = redis.createClient({
    password: 'PBhYRW2V95eqFDR3x3S8VbKBjystBAw7',
    socket: {
        host: 'redis-16449.c325.us-east-1-4.ec2.cloud.redislabs.com',
        port: 16449
    },
    legacyMode: true
});