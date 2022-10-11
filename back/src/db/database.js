// references:
// https://github.com/sidorares/node-mysql2
const mysql = require("mysql2");
const User = require("./models/User");

// require("dotenv").config();  // index.js

// const DB_HOST =
//   process.env.DB_HOST ||
//   "MySQL 서버 HOST가 일치하지 않습니다. \n./db/index.js 파일을 확인해 주세요.";

// const DB_USER =
//   process.env.DB_USER ||
//   "MySQL 서버 USER가 일치하지 않습니다. \n./db/index.js 파일을 확인해 주세요.";

// const DB_PASSWORD =
//   process.env.DB_PASSWORD ||
//   "MySQL 서버 PASSWORD가 일치하지 않습니다. \n./db/index.js 파일을 확인해 주세요.";

// const DB_DATABASE =
//   process.env.DB_DATABASE ||
//   "MySQL 서버 DATABASE가 일치하지 않습니다. \n./db/index.js 파일을 확인해 주세요.";

// const connection = mysql.createConnection({
//   host: DB_HOST,
//   user: DB_USER,
//   password: DB_PASSWORD,
//   database: DB_DATABASE,
// });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect();

connection.query(
  "SELECT 10 + 1 AS solution",
  function (error, results, fields) {
    if (error) throw error;
    console.log(
      "정상적으로 MySQL 서버에 연결되었습니다. '1' + '1'은?: ",
      results[0].solution
    );
  }
);
connection.end();

// module.exports = { connection };
module.exports = { connection, User };
