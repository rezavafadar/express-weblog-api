import { createClient } from 'redis';
import { REDIS_URL } from '../config';

const redisClient = createClient({ url: REDIS_URL });

export default redisClient;
