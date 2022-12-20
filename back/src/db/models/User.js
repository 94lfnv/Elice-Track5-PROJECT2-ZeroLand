// const mysql = require("mysql2");
const { pool } = require("../database");
// const express = require("express");
class User {
  static async findAll() {
    const [results, fields, error] = await pool.query(
      {
        sql: "SELECT * FROM users",
        timeout: 4000, // 40s
      },
      function (error, results, fields) {
        if (error) throw error;
        console.log(results);
      }
    );
    return JSON.stringify(results);
  }
}
module.exports = { User };

// // userRouter.js
// // option 3. 코드 파일 분리
// // User.js -> userService.js에서 타입문제 발생
// userAuthRouter.get("/userlist", async (req, res, next) => {
//   try {
//     const [results, fields, error] = await userAuthService.getUsers();
//     res.status(200).send(results);
//   } catch (err) {
//     next(err);
//   }
// });
