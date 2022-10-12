const { pool } = require("../db/database");
// import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from "uuid";
// import jwt from "jsonwebtoken";

// User.js 포함 코드
class userAuthService {
  static async getUsers() {
    const [results, fields, error] = await pool.query(
      {
        sql: "SELECT * FROM users",
        timeout: 4000, // 40s
      },
      function (error, results, fields) {
        if (error) throw error;
        // console.log(JSON.stringify(results));
      }
    );
    return json(results);
  }
}

// // 파일 분리
// class userAuthService {
//   static async getUsers() {
//     const users = await User.findAll(); // User.findAll()   타입문제
//     return users;
//   }
// }

module.exports = { userAuthService };

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
