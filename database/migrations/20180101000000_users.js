exports.up = async knex => {
  await knex.schema.createTable('users', t => {
    t.increments();
    t.string('email', 50).notNullable().unique();
    t.string('password', 60).notNullable();
    t.string('avatar').nullable().defaultTo(null);
    t.timestamp('created_at').nullable().defaultTo(null);
    t.timestamp('updated_at').nullable().defaultTo(null);
    t.collate('utf8_general_ci');
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('users');
};
