import { Router } from 'express';
import passport = require('passport');
import BotController from '../controllers/BotController';

const bots = Router();

bots.get('/', [passport.authenticate('jwt', { session: false })], BotController.list);
bots.post('/', [passport.authenticate('jwt', { session: false })], BotController.new);
bots.post('/:bot', [passport.authenticate('jwt', { session: false })], BotController.addCommand);

export default bots;
