// const { Router, app } = require("express");
const express = require("express");
const { pool } = require("../db/database");
const { list } = require("../db/models/User");
// const { login_required } = require("../middlewares/login_required");
const { userAuthService } = require("../services/userService");
// const { upload } = require("../middlewares/imageUpload");
// 회원가입관련 - 폴더 분리시 분리 필요
// const is = require("@sindresorhus/is");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// 시작!
const userAuthRouter = express.Router();
// const app = express();
// app.use();

// // 유저리스트 확인 기능
userAuthRouter.get("/userlist", async (req, res, next) => {
  try {
    const [results, fields, error] = await pool.query("SELECT * FROM users");
    if (error) throw error;
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});
module.exports = userAuthRouter;

// // 회원가입 기능
// userAuthRouter.post("/user/register", async (req, res, next) => {
//   try {
//     // if (is.emptyObject(req.body)) {
//     //   throw new Error(
//     //     "headers의 Content-Type을 application/json으로 설정해주세요"
//     //   );
//     // }

//     // // req (request) 에서 데이터 가져오기
//     // const email = req.body.email;
//     // const password = req.body.password;
//     // const nickname = req.body.nickname;

//     // // 위 데이터를 유저 db에 추가하기
//     // 이메일 중복 확인
//     const [results, fields, error] = await pool.query(
//       `SELECT email FROM users WHERE email = ${req.body.email}`
//     );
//     if (error) throw error;
//     // else if (results) {
//     //   const errorMessage =
//     //     "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
//     //   console.log(results);
//     //   return { errorMessage };
//     // }
//     res.status(200).json(results);
//   } catch (err) {
//     next(err);
//   }
// });
// module.exports = userAuthRouter;

// /////
// 비밀번호 해쉬화
// const hashedPassword = await bcrypt.hash(password, 10);

// db에 저장
// const [results, fields, error] = await pool.query(
//   {
//     sql: "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)",
//     timeout: 4000, // 40s
//     values: [email, hashedPassword, nickname],
//   },
//   function (error, results, fields) {
//     if (error) throw error;
//     // console.log(JSON.stringify(results));
//   }
// );
// const createdNewUser = await User.create({ newUser });
// createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

// return createdNewUser;

// console.log(results);
// console.log(fields);

// res.status(200).json(results);
// const newUser = await userAuthService.addUser({
//   email,
//   password,
//   nickname,
// });

// if (newUser.errorMessage) {
//   throw new Error(newUser.errorMessage);
// }

// res.status(201).json(newUser);
// } catch (error) {
// next(error);
//   }
// });

//--------//
// const single = (req, res) =>
//   User.list({ id: req.params.id })
//     .then((response) => res.json(response))
//     .catch((e) => res.json({ e }));

// const register = (req, res) => {
//   const newUser = ({ email, passowrd, nickname } = req.doby);
//   return User.create(newUser)
//     .then((response) => res.json(response))
//     .catch((e) => res.json(e));
// };

// const update = (req, res) => {
//   const user = ({
//     user_id,
//     email,
//     passowrd,
//     nickname,
//     profile_photo,
//     created_time,
//     updated_time,
//     current_latitude,
//     current_longitude,
//   } = req.doby);
//   return User.update(req.params.id, user)
//     .then((response) => res.json(response))
//     .catch((e) => res.json(e));
// };

// userAuthRouter.get("/userlist", userList);
// userAuthRouter.get("/:id", single);
// userAuthRouter.post("/register", register);
// userAuthRouter.put("/:id", update);

// export { userAuthRouter };
// module.exports = userAuthRouter;

//-------------options-start--------------//

// // ex) 유저리스트 확인 기능
// // option 1. 코드하나로 해결
// userAuthRouter.get("/userlist", async (req, res, next) => {
//   try {
//     const [results, fields, error] = await pool.query("SELECT * FROM users");
//     if (error) throw error;
//     // console.log(results);
//     // console.log(fields);

//     res.status(200).send(JSON.stringify(results));
//   } catch (err) {
//     next(err);
//   }
// }

// // option 2. 코드 두개
// const userList = async (req, res, next) => {
//   try {
//     const [results, fields, error] = await pool.query("SELECT * FROM users");
//     if (error) throw error;
//     // console.log(results);
//     // console.log(fields);

//     res.status(200).send(JSON.stringify(results));
//   } catch (err) {
//     next(err);
//   }
// };
// // userAuthRouter.get("/userlist", userList);

// // option 3. 코드 파일 분리
// // Error: Callback function is not available with promise clients.
// userAuthRouter.get("/userlist", async (req, res, next) => {
//   try {
//     const [results, fields, error] = await userAuthService.getUsers();
//     res.status(200).json(results);
//   } catch (err) {
//     next(err);
//   }
// });
////////////////
// module.exports = userAuthRouter;
//-------------options-end--------------//
