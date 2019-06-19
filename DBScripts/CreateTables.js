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

    table.integer('user').unsigned();
    table.foreign('user').references('user_id').inTable('users');

    table.integer('game').unsigned();
    table.foreign('game').references('game_id').inTable('games');

    table.decimal('rating');

    table.text('comment');
});

// Create sessions
knex.schema.createTable('sessions', function (table) {
    table.increments('session_id');

    table.integer('game').unsigned();
    table.foreign('game').references('game_id').inTable('games');

    table.dateTime('start_time');
    table.dateTime('stop_time');

    table.integer('num_players').unsigned();
    table.boolean('active').notNullable().defaultTo(false);

    table.timestamps();
});

// Create user_sessions
knex.schema.createTable('user_sessions', function(table) {
    table.integer('user').unsigned().notNullable();
    table.foreign('user').references('user_id').inTable('users');

    table.integer('session').unsigned().notNullable();
    table.foreign('session').references('session_id').inTable('sessions');

    table.text('notes');

    table.primary(['user', 'session']);
});