import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from '@src/router';
import errorMiddleware from '@src/middlewares/error-middleware';
import config from '@src/config';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

const start = async (): Promise<any> => {
  try {
    const url = `mongodb://${config.database.host}:${config.database.port}/${config.database.name}`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(config.app.port, () => {
      console.log(`Server started ${config.app.port} port`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
