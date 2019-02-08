const pug = require('pug');
const path = require('path');

/**
 * Pug render
 * @param {*} ctx - Koa context
 * @param {*} next - middleware
 * Use ctx.renderFile('home/layout.pug')
 */
module.exports = async (ctx, next) => {
  ctx.renderFile = (file, data) => pug.renderFile(path.join(process.cwd(), 'resources', file), data);
  await next();
};
