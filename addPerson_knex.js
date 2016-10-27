let inputFirst_name = process.argv[2];
let inputLast_name = process.argv[3];
let bday = process.argv[4];

const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    ssl  : true,
    port : settings.port,
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  },
  acquireConnectionTimeout: 10000,
  useNullAsDefault: true,
});

knex.insert({first_name: inputFirst_name, last_name: inputLast_name, birthdate: bday}).into('famous_people').then(function () {
  console.log("Successfully added to table")
}).finally(function() {
  knex.destroy();
});