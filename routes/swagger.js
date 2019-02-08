const swaggerJSDoc = require('swagger-jsdoc');
const Router = require('koa-router');

const router = new Router({ prefix: '/api/swagger' });

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: 'koa-boilerplate',
      version: '1.0.0'
    },
    securityDefinitions: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        description: 'Primary authorization token for app',
        name: 'x-api-token'
      }
    },
    parameters: {
      pageParam: {
        in: 'query',
        name: 'page',
        type: 'integer',
        required: false,
        minimum: 1,
        default: 1,
        description: 'The number of page'
      },
      perPageParam: {
        in: 'query',
        name: 'perPage',
        type: 'integer',
        required: false,
        minimum: 1,
        default: 10,
        description: 'The number of items per page'
      },
      pUserId: {
        in: 'path',
        name: 'userId',
        type: 'integer',
        required: true,
        minimum: 1,
        description: 'User ID'
      },
      qUserId: {
        in: 'query',
        type: 'integer',
        name: 'userId',
        description: 'User ID'
      },
      xApiError: {
        in: 'header',
        name: 'x-api-errors',
        type: 'string',
        required: false,
        enum: ['flat', 'full'],
        default: 'full',
        description: 'Type of errors'
      }
    },
    tags: [
      {
        name: 'Profile',
        description: 'user profile'
      },
      {
        name: 'Auth',
        description: 'authentication'
      },
      {
        name: 'Dictionary',
        description: 'app constants'
      }
    ],
    responses: {
      200: {
        description: 'Ok'
      },
      201: {
        description: 'Created'
      },
      202: {
        description: 'Accepted'
      },
      204: {
        description: 'No content'
      },
      400: {
        description: 'Validation errors'
      },
      401: {
        description: 'Unauthorized'
      },
      403: {
        description: 'Forbidden'
      },
      404: {
        description: 'Not found'
      },
      409: {
        description: 'Conflict'
      }
    }
  },
  apis: [
    './routes/**/*.js',
    './models/*.js',
    './libs/*.js'
  ]
});

router.get('/spec.json', ctx => {
  ctx.body = swaggerSpec;
});

module.exports = router.routes();
