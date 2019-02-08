// Bcrypted string for password: 123456
const password = '$2a$08$AG0JJ5WquAZFbmuTClhSoeDc8NIXs30y5JS17.T.F.zD7HNdAuyNa';

const users = [
  {
    id: 1,
    email: 'admin@mail.com',
    password,
    created_at: new Date()
  }];

exports.seed = async knex => {
  await knex('users').insert(users);
};

exports.seedData = {
  users
};
