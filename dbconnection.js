const mysql = require("mysql2");
const util = require('util');

let mysqlConnection = mysql.createConnection({
//   host: "34.93.77.71",
//   user: "root",
//   password: "evqh1IM1kcp3mJyc",
//   database: "Appointments"
  host: "localhost",
  user: "root",
  password: "root",
  database: "booking"
});

mysqlConnection.connect(err => {

  if (!err) {
    console.log("mysql database connected.....");
  } else {
    console.log("mysql database connection failed....");
  }

});

const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

module.exports = query;