require('dotenv').config();

const Validator = require('validatorjs');
const { each } = require('lodash');
const logger = require('./libs/Logger')(module);

// process.env validator
const result = new Validator(process.env, {
  MACHINE_IP: 'required',
  API_VERSION: 'required',
  NODE_ENV: 'required|in:development,production',
  LOG_ENABLED: 'required',
  PORT: 'required|numeric',
  SECRET: 'required|min:6',
  DOMAIN: 'required',
  DB_HOST: 'required',
  DB_NAME: 'required',
  DB_USER: 'required',
  DB_PASS: 'required',
  DB_PORT: 'required'
});

if (result.fails()) {
  logger.error('ENV wrong configured! Fix this errors!');
  each(result.errors.errors, items => {
    each(items, item => {
      logger.error(item);
    });
  });
  process.exit(1);
}
