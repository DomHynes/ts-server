import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import '../lib/discord';
import '../lib/jwt';
import { AuthenticatedServiceRequest, DiscordProfile } from '../types';
import passport = require('passport');
import { AccountIntegration, Service } from '../entities/AccountIntegration';
import { User } from '../entities/User';

const router = Router();
//Login route
router.post('/login', AuthController.login);

//Change my password
router.post(
  '/change-password',
  [passport.authenticate('jwt', { session: false })],
  AuthController.changePassword,
);

router.get(
  '/discord',
  passport.authorize('discord', { scope: ['identify', 'email', 'guilds'], session: false }),
);
router.get(
  '/discord/callback',
  passport.authenticate('jwt', { session: false }),
  passport.authorize('discord', {
    session: false,
    failureRedirect: '/',
  }),
  async (
    req: AuthenticatedServiceRequest<{
      accessToken: string;
      refreshToken: string;
      profile: DiscordProfile;
    }>,
    res,
  ) => {
    let user: User;
    try {
      user = await User.findOneOrFail(req.user.id);
    } catch (e) {
      return res.status(401).send({ message: 'user_missing' });
    }

    const { accessToken, refreshToken } = req.account;

    const { username, id: serviceId, avatar } = req.account.profile;

    AccountIntegration.create({
      user,
      username,
      accessToken,
      refreshToken,
      serviceId,
      avatar,
      service: Service.Discord,
    }).save();

    res.redirect('http://multibot.lol:3000'); // Successful auth
  },
);

export default router;
