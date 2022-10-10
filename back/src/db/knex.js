// references:
// https://www.npmjs.com/package/knex
// https://knexjs.org/guide/#node-js
// 1차 프로젝트에서는 index.js라는 이름이었으나, 그렇게 하면 "db > index.js"와 "back > index.js" 두개의 "index.js"파일이 존재하게 되어 혼동을 줄이고자 "knex.js"라는 이름으로 변경.

// const mysql = require("mysql");

// 처음 연결할 때만 사용하고 이후에는 "back > index.js"에서 선언한 것을 사용.
require("dotenv").config();
// const dotenv = require("dotenv");
// dotenv.config();

// model 작성시 추가
// import { User } from "./models/User";

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

//-----1st option(start)-----//
// 스키마 코드 실행시 스키마가 생성되지않음
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
  // pool: { min: 0, max: 7 }, // 의미를 찾아봐야함
  debug: true,
});

// DB연결은 됨, raw로 작성된 10 + 1 계산을 출력하는 방법 찾는 중
// "knex.js" 실행시 터미널에서 어디엔가 접속한 것으로 보임. "control + c"를 눌러야 나올 수 있으나 어디에 들어가진 것인지 모르겠음
knex.raw("SELECT 10 + 1 AS solution").then(() => {
  console.log(
    `connection to DB successfull: knex를 이용하여 Elice VM에 설치된 MySQL로 연결되었습니다~!`
  );
});

module.exports = knex;
//-----1st option(end)-----//

// //-----2nd option(start)-----//
// // 이 코드를 써도 스키마가 생성되지않음
// // 이 스타일에서는 db연결 확인을 위한 콘솔로그를 어떤방식으로 작성해야할지 감이 안잡힘
// module.exports = require("knex")({
//   client: "mysql",
//   connection: {
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASSWORD,
//     database: DB_DATABASE,
//   },
//   // pool: { min: 0, max: 7 }, // 의미를 찾아봐야함
//   debug: true,
// });
// //-----2nd option(end)-----//

//-----MySQL방식으로 접속 불가-----//
// knex.connect();

// knex.query("SELECT 10 + 1 AS solution", function (error, results, fields) {
//   if (error) throw error;
//   console.log(
//     "정상적으로 MySQL 서버에 연결되었습니다. '1' + '1'은?: ",
//     results[0].solution
//   );
// });

// knex.end();

//-----MySQL방식, 처음부터-----//
// const connection = mysql.createConnection({
//   host: DB_HOST,
//   user: DB_USER,
//   password: DB_PASSWORD,
//   database: DB_DATABASE,
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

// connection.end();

// 아래 코드 용도 궁금, 실행시 db에 접속된 것으로 보이나 활용방법을 모르겠음
// knex.raw("SELECT VERSION()").then(() => {
//   console.log(`connection to DB successfull~!`);
// });

// module.exports = knex;

//--------스키마 설정?----------//
// if users 테이블이 없으면 생성
// // 첫번째 시도: 실패
// knex.schema.createTable("stickers", function (table) {
//   table.increments("sticker_id");
//   table.string("tag"); // 변경은 나중에
//   table.timestamps("time");
//   table.string("user_id")패
// });

// 두번째 시도: 실패
// const createTable = async (config) => {
//   // // Connect to the database 위에서 이미 했음
//   config.host = `/loudsql/${DB_HOST}`;
//   const knex = Knex({ client: "mysql", connection: config });

//   // // Create the "votes" table
//   try {
//     await knex.schema.createTable("votes", (table) => {
//       ta두le.bigIncrements("vote_id").notNull();
//       table.timestamp("time_cast").notNull();
//       table.specificType("candidate", "CHAR(6) NOT NULL");
//     });

//     console.log(`Successfully created 'votes' table.`);
//     return knex.destroy();
//   } catch (err) {
//     console.error(`Failed to create 'votes' table:`, err);
//     if (knex) {
//       knex.destroy();
//     }
//   }
// };

//--------스키마 설정?----------//
// try {
//   // Create a table
//   await knex.schema.createTable("users", (table) => {
//     table.increments("id");
//     // table.string("user_name"); // 왜 varchar가 아니지?
//     table.string("email");
//     table.string("password");
//     // table.string("nickname");
//     // table.string("profile_photo");
//     // table.timestamp("created_time");
//     // table.timestamp("updated_time");
//     // table.string("current_latitude");
//     // table.string("current_longitude");
//   });
// // ...and another
// .createTable("accounts", (table) => {
//   table.increments("id");
//   table.string("account_name");
//   table.integer("user_id").unsigned().references("users.id");
// });

// Then query the table...
// const insertedRows = await knex("users").insert({ email: "ryan@gmail.com" });

// // ...and using the insert id, insert into the other table.
// await knex("accounts").insert({
//   account_name: "knex",
//   user_id: insertedRows[0],
// });

// // Query both of the rows.
// const selectedRows = await knex("users")
//   .join("accounts", "users.id", "accounts.user_id")
//   .select("users.user_name as user", "accounts.account_name as account");

// map over the results
// const enrichedRows = selectedRows.map((row) => ({ ...row, active: true }));

// Finally, add a catch statement
// } catch (e) {
//   console.error(e);
// }

//-------------MySQL only------------//
// const dotenv = require("dotenv");
// const mysql = require("mysql");
// dotenv.config();

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

// connection.end();
