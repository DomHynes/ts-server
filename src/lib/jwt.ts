import passport = require('passport');
import { Strategy as JWTStrategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import config from '../config/config';
import { User } from '../entities/User';

const options: StrategyOptions = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    req => {
      let token: string;
      if (req && req.cookies) {
        token = req.cookies['jwt'];
      }
      return token;
    },
  ]),
};

passport.use(
  new JWTStrategy(options, (payload, done) => {
    console.log(payload);
    User.findOne({ id: payload.id }).then(user => {
      return done(null, user);
    });
  }),
);
