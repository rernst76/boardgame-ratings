let secrets = require('./Secrets');

let user = secrets.getUser();
let password = secrets.getPassword();

var knex = require('knex')({
    client: 'pg',
    connection: 
    {
        host: 'db',
        user: user,
        password: password,
        database: 'game_ratings'
    }
});

// Create users
knex.schema.createTable('users', function (table) {
    table.increments('user_id');
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
});

// Create games
knex.schema.createTable('games', function (table) {
    table.increments('game_id');
    table.string('name').notNullable();
    table.string('designer').notNullable();
    table.integer('min_players');
    table.integer('max_players').notNullable();
    table.integer('min_playtime');
    table.integer('max_playtime');
    table.decimal('complexity');
});

// Create ratings
knex.schema.createTable('ratings', function (table) {
    table.increments('rating_id');
    table.integer('game').unsigned();
    table.foreign('game').references('game_id').inTable('games');
    table.decimal('rating');
    table.text('comment');
});

// Create sessions

