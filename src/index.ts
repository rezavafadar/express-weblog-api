import dotenv from "dotenv";
dotenv.config({ path: `src/config/.${process.env.NODE_ENV}.env` });

import Application from "./app";
import connectToDb from "./database/connectDB";

const app = new Application();

connectToDb();

app.run();
