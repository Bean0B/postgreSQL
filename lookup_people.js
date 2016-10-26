const pg = require('pg');
const argv = process.argv[2]

pg.defaults.ssl = true;
pg.connect(process.env.???? function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT last_name FROM famous_people.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});