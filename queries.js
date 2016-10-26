const pg = require('pg');

// instantiate a new client
// the client will read connection information from
// the same environment variables used by postgres cli tools
const config = {
  // user: 'foo', //env var: PGUSER
  database: 'template1', //env var: PGDATABASE
  // password: 'secret', //env var: PGPASSWORD
  // port: 5432, //env var: PGPORT
};

// const client = new pg.Client(config);

const client = new pg.Client('postgres://jamessapara:@localhost:5432/music')

// connect to our database
client.connect(function (err) {
  if (err) throw err;

  // execute a query on our database
  client.query('SELECT * FROM artists', function (err, artists) {
    if (err) throw err;

    // just print the artists to the console
    // console.log(artists.rows); // outputs: { name: 'brianc' }
    artists.rows.forEach(function(artist) {
      console.log(`########### ${artist.name} ###########`);
    });

    // disconnect the client
    client.end(function (err) {
      if (err) throw err;
    });
  });
});