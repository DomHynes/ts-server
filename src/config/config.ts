const config = {
  jwtSecret: process.env.JWT_SECRET || '@QEGTUI',
  cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
  discord: {
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    redirectURI: process.env.DISCORD_CALLBACK_URL,
    multibotToken: process.env.DISCORD_MULTIBOT_TOKEN,
  },
};

export default config;
