const knexInstance = require('knex');
const bookshelfInstance = require('bookshelf');
const mask = require('bookshelf-mask');
const knexLogger = require('./../libs/KnexLoggerQueries');

const {
  DB_HOST: host,
  DB_NAME: database,
  DB_PORT: port,
  DB_USER: user,
  DB_PASS: password
} = process.env;

const knexConnectionObject = {
  client: 'mysql',
  connection: {
    host,
    user,
    password,
    database,
    port
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
  },
  pool: {
    min: 1,
    max: 1
  }
};
const knex = knexInstance(knexConnectionObject);
const bookshelf = bookshelfInstance(knex);

bookshelf.plugin('registry');
bookshelf.plugin('virtuals');
bookshelf.plugin('visibility');
bookshelf.plugin('pagination');
bookshelf.plugin(mask);

if (process.env.LOG_ENABLED === 'true') {
  knex.on('query', knexLogger.query);
  knex.on('query-response', knexLogger.query_response);
}

module.exports = { bookshelf, knex, knexConnectionObject };
