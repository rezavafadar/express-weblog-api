import prisma from './prisma-client';
import redisClient from './redis-client';

const connectMySql = async () => {
  try {
    await prisma.$connect();
    console.log('Connect to Mysql databse is successfull !');
  } catch (error) {
    console.log('Connect to Mysql database is unsuccessfull !');
    console.log(error);
    process.exit(1);
  }
};

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Connect to Redis database is successfull !');
  } catch (error) {
    console.log('Connect to Redis database is unsuccessfull !');
    console.log(error);
    process.exit(1);
  }
};

export default { connectMySql, connectRedis };
