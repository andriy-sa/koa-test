const Router = require('koa-router');

const router = new Router({ prefix: '/api' });
const { isNull } = require('lodash');
const { User } = require('./../../models');
const { validate, JWTService } = require('./../../libs');

const handler = {
  /**
   * @swagger
   * paths:
   *  /api/login:
   *    post:
   *      tags:
   *        - Auth
   *      summary: Sign in
   *      description: Login via email & password
   *      parameters:
   *        - $ref: "#/parameters/xApiError"
   *        - in: body
   *          name: body
   *          schema:
   *            type: object
   *            properties:
   *              email:
   *                type: string
   *                default: admin@mail.com
   *              password:
   *                type: string
   *                default: "123456"
   *      responses:
   *        200:
   *          $ref: "#/responses/200"
   *        400:
   *          $ref: "#/responses/400"
   */
  async login(ctx) {
    await validate(ctx.request.body, {
      email: 'required|email',
      password: 'required|min:6'
    });

    const { email, password } = ctx.request.body;

    const user = await User.where({ email }).fetch();
    if (isNull(user)) {
      ctx.throwSingle('User not found');
    }
    if (!(await user.comparePassword(password))) {
      ctx.throwSingle('Wrong password');
    }
    ctx.status = 200;
    ctx.body = {
      token: JWTService.signUser(user)
    };
  }
};

router.post('/login', handler.login);

module.exports = router.routes();
