const path = require('path');

require('../env.validate');

const { sendForgotPassword, removeMediaFiles } = require('../libs/Queue');

// Register processes
sendForgotPassword.process(path.join(__dirname, 'queue.sendForgotPassword.js'));
removeMediaFiles.process(path.join(__dirname, 'queue.removeMediaFiles.js'));

// Auto-Removing jobs
sendForgotPassword.on('completed', job => job.remove());
removeMediaFiles.on('completed', job => job.remove());
