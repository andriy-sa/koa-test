const { expect } = require('chai');
const SwaggerParser = require('swagger-parser');
const supertest = require('supertest');
const app = require('./../server');

const agent = supertest.agent(app.callback());

describe('swagger', () => {
  describe('swagger.spec', () => {
    it('validate', async () => {
      const res = await agent.get('/api/swagger/spec.json');
      const obj = await SwaggerParser.validate(res.body);
      expect(obj).to.be.an('object');
    });

    it('200 ok', async () => {
      const res = await agent.get('/api/swagger/spec.json');
      const { paths, definitions } = res.body;
      expect(paths).to.have.all.keys(
        [
          '/api/login',
          '/api/dict',
          '/api/forgot-password',
          '/api/profile/me',
          '/api/signup',
          '/api/upload/{fileType}'
        ]
      );
      expect(definitions).to.have.all.keys(
        [
          'UpdateAvatar',
          'UpdateProfile'
        ]
      );
      expect(res.status).to.be.equal(200);
    });
  });
});
