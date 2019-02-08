const { cloneDeep } = require('lodash');
const jsonwebtoken = require('jsonwebtoken');
const { app: { jwt } } = require('./../config/env');
const { SingleValidationError } = require('./../libs/errors');

const payload = {
  data: {},
  exp: Math.floor(Date.now() / 1000) + jwt.expireDuration
};

const JWTService = {
  signUser: userModel => {
    const userPayload = cloneDeep(payload);
    userPayload.data = {
      id: userModel.get('id')
    };
    return jsonwebtoken.sign(userPayload, process.env.SECRET);
  },
  verifyToken: token => new Promise((res, rej) => {
    jsonwebtoken.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        rej(new SingleValidationError('Authentication failed', 401));
      } else {
        res(decoded);
      }
    });
  })
};

module.exports = JWTService;
