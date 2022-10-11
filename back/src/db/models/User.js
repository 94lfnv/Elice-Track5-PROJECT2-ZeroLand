// const mysql = require("mysql2");
const { connection } = require("../database");
// const express = require("express");

//-------1st option-----//
// const list = () => {
//   connection.query(
//     `SELCET user_id, email, nickname FROM ${process.env.T_USERS}`
//   );
// };

// const list = () => {
//   connection.query(
//     {
//       sql: "SELCET `user_id`, `email`, `nickname` FROM ?",
//       timeout: 4000, // 40s
//       values: [process.env.T_USERS],
//     },
//     function (error, results, fields) {
//       if (error) throw error;
//       console.log(results);
//       // return results;
//     }
//   );
// };

//-------2nd option-----//
class User {
  static async findAll() {
    // const users = await UserModel.find({});
    const userList = await connection.query(
      {
        sql: "SELCET `user_id`, `email`, `nickname` FROM ?",
        timeout: 4000, // 40s
        values: [process.env.T_USERS],
      },
      function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        return results;
      }
    );
    return userList;
  }
}
module.exports = { User };
