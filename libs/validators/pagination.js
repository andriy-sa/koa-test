const validate = require('../Validator');
const { app } = require('../../config/env');

module.exports = async (ctx, next) => {
  await validate(ctx.query, {
    page: 'numeric|min:1',
    perPage: 'numeric|min:1|max:20'
  });
  ctx.state.page = ctx.query.page || app.pagination.page;
  ctx.state.perPage = ctx.query.perPage || app.pagination.perPage;
  await next();
};
