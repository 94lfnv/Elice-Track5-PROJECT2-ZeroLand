// const { Router, app } = require("express");
const express = require("express");
const { pool, connection } = require("../db/database");
const { list } = require("../db/models/User");
// const { login_required } = require("../middlewares/login_required");
const { userAuthService, getUsers } = require("../services/userService");
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
// 회원가입 기능
userAuthRouter.post("/user/register", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;

    // 이메일 중복 확인
    const [res_checkID, fld_checkID, err_checkID] = await pool.query({
      sql: "SELECT * FROM users WHERE `email` = ? ",
      values: [email],
    });
    if (err_checkID) throw err_checkID;
    else if (JSON.stringify(res_checkID) !== "[]") {
      const errorMessage =
        "입력하신 email로 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.";
      console.log(errorMessage);
      res.status(200).send(errorMessage);
    }
    // // 위 데이터를 유저 db에 추가하기
    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);
    // db에 저장
    const [res_save, fld_save, err_save] = await pool.query({
      sql: "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)",
      // timeout: 4000, // 40s
      values: [email, hashedPassword, nickname],
    });
    // function (error, results, fields) {
    if (err_save) throw err_save;
    const newUser = JSON.stringify(res_save, ["insertId"]);
    console.log(newUser);
    const [res_new, fld_new, err_new] = await pool.query({
      sql: "SELECT * FROM users WHERE `email` = ? ",
      values: [email],
    });
    if (err_new) throw err_new;
    console.log(JSON.stringify(res_new));
    res.status(200).json(res_new);
  } catch (err) {
    next(err);
  }
});

// 로그인 기능
userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    // const user = await userAuthService.getUser({ email, password });
    // email 확인
    // const newUser = JSON.stringify(res_save, ["insertId"]);
    // console.log(newUser);
    const [res_logID, fld_logID, err_logID] = await pool.query({
      sql: "SELECT * FROM users WHERE `email` = ? ",
      values: [email],
    });
    if (err_logID) throw err_logID;
    else if (JSON.stringify(res_logID) === "[]") {
      const errorMessage =
        "일치하는 email이 없습니다. 다시 한 번 확인해 주세요.";
      console.log(errorMessage);
      res.status(200).send(errorMessage);
    }
    console.log(JSON.stringify(res_logID, ["password"]));

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = JSON.stringify(res_logID, ["password"]);
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    /////////
    // if (user.errorMessage) {
    //   throw new Error(user.errorMessage);
    // }

    // res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = userAuthRouter;

// /////
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
