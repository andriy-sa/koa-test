const koaBody = require('koa-body');
const Router = require('koa-router');
const path = require('path');

const router = new Router({ prefix: '/api' });
const { validate, JWTService, Upload } = require('./../../libs');
const { User } = require('./../../models');
const { LocalUploader } = require('./../../libs/uploaders');

const { DOMAIN } = process.env;

const handler = {
  /**
   * @swagger
   * paths:
   *  /api/signup:
   *    post:
   *      tags:
   *        - Auth
   *      summary: Sign up
   *      consumes:
   *        - multipart/form-data
   *      parameters:
   *        - in: formData
   *          name: file
   *          type: file
   *          description: The file to upload
   *          required: true
   *        - in: formData
   *          name: email
   *          required: true
   *          type: string
   *          description: Email
   *        - in: formData
   *          name: password
   *          required: true
   *          type: string
   *          description: Password
   *      responses:
   *        201:
   *          $ref: "#/responses/201"
   *        400:
   *          $ref: "#/responses/400"
   */
  async signup(ctx) {
    // validate request
    const rules = {
      email: 'required|email',
      password: 'required|string|min:6'
    };
    const { body } = ctx.request;
    await validate(body, rules);

    if (await User.where({ email: body.email }).count()) {
      ctx.throwSingle('User with this email already registered', 409);
    }

    // upload file to local storage
    const uploader = new LocalUploader();
    uploader.setBucket('static/uploads');
    uploader.setFile(ctx.request.files.file);
    const upload = new Upload();
    upload.setUploader(uploader);
    upload.allowExtensions(['image/jpeg', 'image/jpg', 'image/png']);
    const uploadedFile = await upload.proceed();

    // save user to db
    body.avatar = path.join(DOMAIN, uploadedFile.bucket, uploadedFile.file_key);
    const user = await new User(body).save();

    ctx.status = 201;
    ctx.body = {
      token: JWTService.signUser(user)
    };
  }
};
const multipartBodyParser = koaBody({ multipart: true, multiples: false });

router.post('/signup', multipartBodyParser, handler.signup);

module.exports = router.routes();
