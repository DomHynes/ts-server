import { Router } from 'express';
import UserController from '../controllers/UserController';
import passport = require('passport');

const router = Router();

//Get all users
router.get('/', [passport.authenticate('jwt', { session: false })], UserController.listAll);

// Get one user
router.get('/:id', [passport.authenticate('jwt', { session: false })], UserController.getOneById);

//Create a new user
router.post('/', UserController.newUser);

//Edit one user
router.patch('/:id', [passport.authenticate('jwt', { session: false })], UserController.editUser);

//Delete one user
router.delete(
  '/:id([0-9]+)',
  [passport.authenticate('jwt', { session: false })],
  UserController.deleteUser,
);

export default router;
