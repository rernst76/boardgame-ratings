// Update with your config settings.

let secrets = require('./Secrets');
let user = secrets.getUser();
let password = secrets.getPassword();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'db',
      user: user,
      password: password
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  }
};
