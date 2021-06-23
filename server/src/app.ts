import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv-safe';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from '@src/router';

dotenv.config();
const app: Application = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = async (): Promise<any> => {
  try {
    const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`Server started ${PORT} port`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
