const pg = require("pg");
const settings = require("./settings"); // settings.json
const nameInput = process.argv[2];

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
    return console.log("Connection Error", err);
  }
    findPerson(nameInput);
});

function findPerson (nameInput) {
  client.query("SELECT * FROM famous_people WHERE last_name =$1 OR first_name =$1;", [nameInput], (err, result) => {
    if (err) throw err;
      console.log(`Searching... \n Found someone!`)
      if (result.rowCount) {
        result = result.rows[0];
        console.log(`${result.id}: ${result.first_name} ${result.last_name}, born ${result.birthdate.toDateString()}`)
      }else{
        console.log(`I lied. Found no one`)
      }
    client.end();
  });
};