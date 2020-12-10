// #! /home/amit/.nvm/versions/node/v14.15.1/bin/node
// require('@babel/register')({ presets: ['env'] });

import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import connect from './utils/connect';
import config from './config';
import battleRouter from './resources/battle/battle.router';

const app = express();
require('dotenv').config();
app.disable('x-powered-by');
app.use(cors({ origin: 'http://localhost:8080', optionsSuccessStatus: 200 }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(battleRouter);

async function start() {
  try {
    await connect();
    console.log('db connection established');
    app.listen(config.port, () => {
      console.log(`REST API on http://${config.host}:${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
}

start();
