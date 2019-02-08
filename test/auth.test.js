const { expect } = require('chai');
const supertest = require('supertest');
const app = require('./../server');

const agent = supertest.agent(app.callback());

const uri = {
  login: '/api/login'
};

describe('routes/auth.js', () => {
  describe(uri.login, () => {
    it('200 ok', async () => {
      const res = await agent.post(uri.login).send({
        email: 'connector1@mail.com',
        password: '123456'
      });
      expect(res.status).to.be.equal(200);
    });
  });
});
