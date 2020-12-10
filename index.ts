import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import connect from './utils/connect';
import battleRouter from './resources/battle/battle.router';

const app = express();
require('dotenv').config();

app.disable('x-powered-by');
app.use(
  cors({
    origin: process.env.FRONTEND || 'http://localhost:3000',
    optionsSuccessStatus: 200,
  })
);
app.options('*', cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(battleRouter);

async function start() {
  try {
    await connect();
    console.log('db connection established');
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `REST API on http://${process.env.HOST || 'localhost'}:${
          process.env.PORT || 3000
        }`
      );
    });
  } catch (e) {
    console.error(e);
  }
}

start();
