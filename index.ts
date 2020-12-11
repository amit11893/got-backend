import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import connect from './utils/connect';
import battleRouter from './resources/battle/battle.router';

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND || 'http://localhost:3000',
    optionsSuccessStatus: 200,
  })
);
app.options('*', cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
require('dotenv').config();

app.disable('x-powered-by');
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
