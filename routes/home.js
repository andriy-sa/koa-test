const Router = require('koa-router');
const { validate } = require('./../libs');
const UserInformer = require('./../libs/userInformer');

const router = new Router({ prefix: '/api' });
const handler = {
  /**
   * @swagger
   * paths:
   *  /api/inform:
   *    post:
   *      tags:
   *        - Inform
   *      summary: Inform
   *      description: Inform users.
   *      parameters:
   *        - $ref: "#/parameters/xApiError"
   *        - in: body
   *          name: body
   *          schema:
   *            type: object
   *            properties:
   *              message:
   *                type: string
   *                default: test
   *              names:
   *                type: array
   *                default: ['andriy-sa']
   *      responses:
   *        200:
   *          $ref: "#/responses/200"
   */
  async informUsers(ctx) {
    const rules = {
      message: 'required|string',
      names: 'required|array|max:5'
    };

    await validate(ctx.request.body, rules);

    const informer = new UserInformer(ctx.request.body.message);

    ctx.request.body.names.map(async username => {
      informer.setUser(username);
      await informer.inform();
    });

    ctx.status = 204;
    ctx.body = null;
  }
};
router.post('/inform', handler.informUsers);
module.exports = router.routes();
