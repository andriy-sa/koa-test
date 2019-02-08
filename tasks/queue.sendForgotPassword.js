const { sendForgotPassword } = require('../libs/Mailer');

module.exports = async job => sendForgotPassword(job.data);
