const { map, flattenDeep } = require('lodash');
const validate = require('./../Validator');

module.exports = async (ctx, next) => {
  const { 'x-api-errors': xApiDevice = 'full' } = ctx.headers;
  try {
    ctx.set({ 'x-api-version': process.env.API_VERSION.substr(0, 7) || 'none' });
    // Validate header for reformatting errors for custom devices
    await validate(ctx.headers, {
      'x-api-device': 'in:flat,full'
    });
    await next();
  } catch (err) {
    switch (err.name) {
    case 'ValidationErrors':
      ctx.body = { error: { code: err.httpCode, message: 'ValidationErrors', errors: err.validation_errors.errors } };
      ctx.status = err.httpCode;
      break;
    case 'SingleValidationError':
      ctx.body = { error: { code: err.httpCode, message: 'SingleError', errors: { message: [err.message] } } };
      ctx.status = err.httpCode;
      break;
    case 'CustomError':
      switch (err.message) {
      case 'EmptyResponse':
        ctx.body = { error: { code: 404, message: 'RequestError', errors: { message: ['Entity not found'] } } };
        ctx.status = 404;
        break;
      default:
        ctx.body = { error: { code: 500, message: 'CustomError', errors: { message: ['Something went wrong'] } } };
        ctx.status = 500;
        break;
      }
      break;
    default:
      ctx.body = { error: { code: 500, message: 'ServerError', errors: { message: ['Something went wrong'] } } };
      ctx.status = 500;
      break;
    }
    // Reformat errors if need
    switch (xApiDevice) {
    case 'flat':
      ctx.body.error.errors = flattenDeep(map(ctx.body.error.errors, item => item));
      break;
    default:
      break;
    }
    /* eslint-disable */
    console.error('\n---exceptionHandler:', err);
    console.error('\n');
    /* eslint-enable */
  }
};
