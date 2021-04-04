const crypto = require('crypto');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  const hash = crypto.createHash('md5');
  hash.update('123456', 'md5');
  const password = hash.digest('hex');

  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { nome:'Admin', email: 'admin@admin.com', username: 'admin', password },
      ]);
    });
};
