require('./env.validate.js');

const Koa = require('koa');
const koaJson = require('koa-json');
const koaBody = require('koa-bodyparser');

const { json } = require('./config/env');
const logger = require('./libs/Logger')(module);

const app = new Koa();

app.use(koaJson(json));
app.use(koaBody({ enableTypes: ['json'] }));
require('./routes')(app);

if (!module.parent) {
  app.listen(process.env.PORT, () => {
    logger.info(`App running on port: ${process.env.PORT}`);
  });
}

module.exports = app;
