const { JWTService, validate } = require('./../libs');
const { User } = require('./../models');

/**
 * Authenticate middleware, check and validate `Authentication` header
 * When request provide a valid token, middleware put into ctx `user_id` from decoded token payload
 */
module.exports = async (ctx, next) => {
  await validate(ctx.header, {
    'x-api-token': 'required|regex:/^Bearer\\s{1}([A-z\\.0-9-]+)$/'
  });
  const [, token] = ctx.header['x-api-token'].split(' ');
  const decoded = await JWTService.verifyToken(token);
  ctx.state.user = User.where({ id: decoded.data.id });
  ctx.state.user_id = decoded.data.id;
  await next();
};
