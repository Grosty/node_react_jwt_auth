import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv-safe';
import sum from '@src/controllers/add.controller';

const app: Application = express();

dotenv.config();

console.log(process.env.MY_NAME, process.env.TOKEN);

const PORT: number | string = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response): void => {
  const sumNum: number = sum(4, 5);
  res.send(`Hello ${sumNum}`);
});

app.listen(PORT, () => {
  console.log(`Server started ${PORT} port`);
});
