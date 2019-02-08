const path = require('path');
const fs = require('fs');

const UploaderBase = require('./UploaderBase');

class LocalUploader extends UploaderBase {
  constructor() {
    super();
    this.service = 'local';
  }

  /**
   * Get file from request and move to destination folder (bucket)
   */
  async upload() {
    return new Promise((resolve, reject) => {
      fs.rename(this.getFile().path, path.join(process.cwd(), this.getBucket(), this.getFilename()), error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = LocalUploader;
