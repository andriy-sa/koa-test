const { SingleValidationError, ValidationError } = require('.');

module.exports = async (ctx, next) => {
  ctx.throwSingle = (message, code = 400) => {
    throw new SingleValidationError(message, code);
  };
  ctx.throwValidation = (validationErrors, code = 400) => {
    throw new ValidationError(validationErrors, code);
  };
  await next();
};
