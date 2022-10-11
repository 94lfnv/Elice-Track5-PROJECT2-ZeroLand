// references:
// https://github.com/sidorares/node-mysql2
// 1차 프로젝트에서는 index.js라는 이름이었으나, 그렇게 하면 "db > index.js"와 "back > index.js" 두개의 "index.js"파일이 존재하게 되어 혼동을 줄이고자 "db.js"라는 이름으로 변경.

const mysql = require("mysql2");
require("dotenv").config();

const DB_HOST =
  process.env.DB_HOST ||
  "MySQL 서버 HOST가 일치하지 않습니다. \n./db/index.js 파일을 확인해 주세요.";

const DB_USER =
  process.env.DB_USER ||
  "MySQL 서버 USER가 일치하지 않습니다. \n./db/index.js 파일을 확인해 주세요.";

const DB_PASSWORD =
  process.env.DB_PASSWORD ||
  "MySQL 서버 PASSWORD가 일치하지 않습니다. \n./db/index.js 파일을 확인해 주세요.";

const DB_DATABASE =
  process.env.DB_DATABASE ||
  "MySQL 서버 DATABASE가 일치하지 않습니다. \n./db/index.js 파일을 확인해 주세요.";

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
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

module.exports = connection;
