import { Router } from 'express';
import passport = require('passport');
import CommandController from '../controllers/CommandController';

const commands = Router();

commands.get('/', [passport.authenticate('jwt', { session: false })], CommandController.list);
commands.post('/', [passport.authenticate('jwt', { session: false })], CommandController.new);

export default commands;
