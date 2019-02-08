const koaReqLog = require('koa-reqlog');

const templateEnginePug = require('../libs/Pug');
const errorHandler = require('../libs/errors/ErrorHandler');
const { exceptionHandler } = require('./../libs/errors');
const swaggerRouter = require('./swagger');
const { signupRouter, signinRouter } = require('./auth');
const homeRouter = require('./home');

module.exports = app => {
  // global middlewares
  app.use(exceptionHandler);
  app.use(errorHandler);
  app.use(templateEnginePug);

  // Request Logger
  if (process.env.NODE_ENV === 'development') {
    app.use(koaReqLog({ url: '/request-log', lastItems: 20 }));
  }

  // Api routes
  app.use(homeRouter);
  app.use(signupRouter);
  app.use(signinRouter);

  // swagger docs
  if (process.env.NODE_ENV === 'development') {
    app.use(swaggerRouter);
  }
};
