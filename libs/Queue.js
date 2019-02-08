const Queue = require('bull');

const sendForgotPassword = new Queue('sendForgotPassword');
const removeMediaFiles = new Queue('removeMediaFiles');

module.exports = {
  sendForgotPassword,
  removeMediaFiles
};
