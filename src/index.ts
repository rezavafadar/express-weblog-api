import dotenv from 'dotenv';
dotenv.config({ path: `src/config/.${process.env.NODE_ENV}.env` });

import Application from './app';
import dbConnection from './database/connectDB';

const app = new Application();

dbConnection.connectMySql();
dbConnection.connectRedis();

app.run();
