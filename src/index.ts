import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './config/config';
import { bootBot } from './lib/bots';
import logger from './lib/logger';
import routes from './routes';
import passport = require('passport');

createConnection()
  .then(async () => {
    bootBot();
    const app = express();

    // Call middlewares
    app.use(cors({ credentials: true, origin: 'http://multibot.lol:3000' }));
    app.use(cookieParser(config.cookieSecret));
    app.use(passport.initialize());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(logger);

    //Set all routes from routes folder
    app.use('/', routes);

    app.listen(80, () => {
      console.log('Server started on port 3000!');
    });
  })
  .catch(error => console.log(error));
