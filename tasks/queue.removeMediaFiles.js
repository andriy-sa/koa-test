const path = require('path');
const { promisify } = require('util');
const fs = require('fs');

const removeFile = promisify(fs.unlink);

module.exports = async job => {
  const media = job.data;
  switch (media.service) {
  case 'local':
    return removeFile(path.join(process.cwd(), media.bucket, media.file_key));
  default:
    break;
  }
  return Promise.reject(new Error(`Unknown media.service for ${JSON.stringify(media)}`));
};
