class UploaderBase {
  constructor() {
    this.service = 'baseloader';
  }

  getService() {
    return this.service;
  }

  setBucket(bucket) {
    this.bucket = bucket;
  }

  getBucket() {
    return this.bucket;
  }

  setFile(file) {
    this.file = file;
  }

  getFile() {
    return this.file;
  }

  setFilename(filename) {
    this.filename = filename;
  }

  getFilename() {
    return this.filename;
  }
}

module.exports = UploaderBase;
