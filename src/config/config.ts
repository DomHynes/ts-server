const config = {
  jwtSecret: '@QEGTUI' || process.env.JWT_SECRET,
  cookieSecret: 'supersecret' || process.env.COOKIE_SECRET,
};

export default config;
