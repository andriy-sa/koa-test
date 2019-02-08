const { bookshelf } = require('./../config/database');
const { comparePassword, hashPassword } = require('./../libs/Bcrypt');

const User = bookshelf.Model.extend(
  {
    tableName: 'users',
    initialize() {
      this.on('creating', this.onCreating, this);
      this.on('saving', this.onSaving, this);
    },
    hidden: ['password'],
    comparePassword(plainPassword) {
      return comparePassword(plainPassword, this.get('password'));
    },
    async onCreating(model) {
      const hash = await hashPassword(model.attributes.password);
      model.set('password', hash);
      model.set('created_at', new Date());
    },
    async onSaving(_, attrs) {
      attrs.updated_at = new Date();
    }
  }
);

module.exports = bookshelf.model('User', User);
