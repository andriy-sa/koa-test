const crypto = require('crypto');
const util = require('util');

const validate = require('./../libs/Validator');

class Upload {
  setUploader(uploader) {
    this.uploader = uploader;
  }

  allowExtensions(allowExtensions) {
    this.allowExtensions = allowExtensions;
  }

  /**
   * Validate incoming mime type files
   */
  async _validateExtensions() {
    await validate(this.uploader.getFile(), {
      type: `required|in:${this.allowExtensions.join()}`
    }, {
      'in.type': `Allow extensions: ${this.allowExtensions.join()}`,
      'required.type': 'File not selected'
    });
  }

  // Generate unique filename
  _generateFileName() {
    const ext = this.uploader.getFile().name.split('.').pop();
    const name = crypto.randomBytes(8).toString('hex');
    return util.format('%s.%s', name, ext);
  }

  async proceed() {
    // validate mime type
    await this._validateExtensions();
    // generate ubique name and set into loader
    const filename = this._generateFileName();
    this.uploader.setFilename(filename);

    await this.uploader.upload();

    return {
      bucket: this.uploader.getBucket(),
      service: this.uploader.getService(),
      file_key: filename,
      size: this.uploader.getFile().size
    };
  }
}

module.exports = Upload;
