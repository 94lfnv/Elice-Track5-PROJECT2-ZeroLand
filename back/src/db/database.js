// references:
// https://github.com/sidorares/node-mysql2
// const mysql = require("mysql2");
// // const app = require("../app");
// const User = require("./models/User");
// // require("dotenv").config({ path: "../../.env" });
// require("dotenv").config();

//----------정상작동-start---------//
// Error: Can't add new command when connection is in closed state
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// connection.connect();

// connection.query(
//   "SELECT 10 + 1 AS solution",
//   function (error, results, fields) {
//     if (error) throw error;
//     console.log(
//       "정상적으로 MySQL 서버에 연결되었습니다. '1' + '1'은?: ",
//       results[0].solution
//     );
//   }
// );

// connection.query("SELECT * FROM users", function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });

// connection.end();

// // module.exports = { connection };
// module.exports = { connection, User };

//----------정상작동-end---------//

// -----------start---------//
// https://github.com/sidorares/node-mysql2/issues/939
// const mysql = require("mysql2");
const mysql = require("mysql2/promise");
const app = require("../app");
const User = require("./models/User");
// require("dotenv").config({ path: "../../.env" });
// const bluebird = require("bluebird");
require("dotenv").config();

// Error: Can't add new command when connection is in closed state
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  queueLimit: 0, // unlimited
  // Promise: bluebird,
};
// exporting MySQL connection pool object
const pool = mysql.createPool(dbConfig);
const connection = mysql.createConnection(dbConfig);
// connection.connect();
// connection.query(
//   "SELECT 10 + 1 AS solution",
//   function (error, results, fields) {
//     if (error) throw error;
//     console.log(
//       "정상적으로 MySQL 서버에 연결되었습니다.(connection) '1' + '1'은?: ",
//       results[0].solution
//     );
//   }
// );
// connection.end();
module.exports = { pool, connection, User };
