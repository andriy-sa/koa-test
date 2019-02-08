const config = {
  app: {
    eTypes: {
      avatar: 'avatar',
      deleted: 'deleted'
    },
    jwt: {
      expireDuration: 86400 * 60 // 2 months
    },
    password: {
      recovery_timeout: 60 * 10 // 10 minutes
    }
  },
  json: { pretty: false }
};

module.exports = config;
