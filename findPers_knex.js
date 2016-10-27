const settings = require("./settings"); // settings.json
let input = process.argv[2];
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
});


knex.select().from('famous_people').where('last_name', input).asCallback(function (err, result) {
  if (err) {
  console.log("Couldn't find anyone!", err);
};
  console.log(`Found someone named ${input}:`)
    for (i in result) {
        console.log(`-${i}: ${result[i].first_name} ${result[i].last_name}, born ${result[i].birthdate.toDateString()}`)
      };
 knex.destroy();
});

