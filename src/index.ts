import dotenv from 'dotenv';
dotenv.config({ path: `src/config/.${process.env.NODE_ENV}.env` });

import Application from './app';

const app = new Application();

app.run();
