const faker = require("faker");

const fakeUser = function() {
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  let user = {
    first_name: firstName,
    last_name: lastName,
    email: faker.internet.email(firstName, lastName),
  };
  return user;
};

const fakeDesigner = function() {
  let designer = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
  };
  return designer;
};

/*
Let's make some assumptions about the kind of data we want to seed:

- 15 Users
- 120 Games
- 55 Designers
- Each user has rated 15 games
- 3 active sessions
- 200 sessions total

As we are working with a normalized database let's start at the edges
where we have the most FKs. This would be:

- ratings
- user_sessions
- games

As we hit the FKs in these tables we can create as needed rows in
the foreignt tables.
*/

// Let's go ahead and create our tables that don't have FKs
let users = Array.from({length: 15}, () => fakeUser());
let designers = Array.from({length: 55}, () => fakeDesigner());

// Now that we have designers lets create our games

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
