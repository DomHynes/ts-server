import { Router } from 'express';
import auth from './auth';
import me from './me';
import user from './user';
import passport = require('passport');
import bots from './bots';
import commands from './command';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/me', [passport.authenticate('jwt', { session: false })], me);
routes.use('/bots', bots);
routes.use('/commands', commands);

export default routes;
