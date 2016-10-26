const pg = require("pg");
const settings = require("./settings"); // settings.json
const lastName = process.argv[2]

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name =$1;", [lastName], (err, result) => {
    if (err) throw err;
      console.log(`${result.rowCount} row(s) found. \n`);
      if (result.rowCount) {
        result.rows.forEach((row) => {
          let output = [];
          for (column in row) {
            output.push(`${column}: ${row[column]}`);
          }
          console.log(output.join(`, `))
        })
      }
    client.end();
  });
});