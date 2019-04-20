import passport = require('passport');
import { Strategy as DiscordStrategy } from 'passport-discord';
import config from '../config/config';

passport.use(
  new DiscordStrategy(
    {
      clientID: config.discord.clientId,
      clientSecret: config.discord.clientSecret,
      callbackURL: config.discord.redirectURI,
    },
    async (accessToken, refreshToken, profile, cb) => {
      return cb(null, { accessToken, refreshToken, profile });
    },
  ),
);
