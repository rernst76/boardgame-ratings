let secrets = require('./Secrets');

let user = secrets.getUser();
let password = secrets.getPassword();

var knex = require('knex')({
    client: 'pg',
    connection: 
    {
        host: 'db',
        user: user,
        password: password
    }
})

knex.raw('CREATE DATABASE game_ratings').then(() => {
    console.log("Database created!");
})