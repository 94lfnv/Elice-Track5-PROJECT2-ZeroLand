const express = require("express");
const { pool, connection } = require("../db/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const asyncHandler = require("../util/asyncHandler");
const asyncHandler = require("express-async-handler");
const login_required = require("../middlewares/login_required");

const userAuthRouter = express.Router();

// 유저리스트 확인 기능
const userList = async (req, res, next) => {
  try {
    const [results, fields, error] = await pool.query("SELECT * FROM users");
    if (error) throw error;
    console.log(results.length);
    for (let i = 0; i < results.length; i++) {
      delete results[i].password;
    }
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};
// 회원가입 기능
const userRegister = async (req, res, next) => {
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
    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);
    // db에 저장
    const [res_save, fld_save, err_save] = await pool.query({
      sql: "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)",
      values: [email, hashedPassword, nickname],
    });
    if (err_save) throw err_save;
    const [res_new, fld_new, err_new] = await pool.query({
      sql: "SELECT * FROM users WHERE `email` = ? ",
      values: [email],
    });
    if (err_new) throw err_new;
    res.status(200).json(res_new[0]);
  } catch (err) {
    next(err);
  }
};

// 로그인 기능
const userLogin = async function (req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;

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

    // 비밀번호 일치 여부 확인
    const res_logID_array = JSON.stringify(res_logID, ["password"]);
    const res_logID_pw = res_logID_array.split(`"`);
    const correctPasswordHash = res_logID_pw[3];
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      console.log(errorMessage);
      res.status(200).send(errorMessage);
    }
    if (isPasswordCorrect && JSON.stringify(res_logID) !== "[]") {
      // 로그인 성공 -> JWT 웹 토큰 생성
      const res_logID_arrayId = JSON.stringify(res_logID, ["user_id"]);
      const res_logID_Id = res_logID_arrayId.replace(/[^0-9]/g, "");

      const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
      const token = jwt.sign({ user_id: res_logID_Id }, secretKey);
      const [res_logID_tk, fld_logID_tk, err_logID_tk] = await pool.query({
        sql: "SELECT * FROM users WHERE `email` = ? ",
        values: [email],
      });
      if (err_logID_tk) throw err_logID_tk;

      const userWToken = Object.assign({ token: token }, res_logID_tk[0]);
      delete userWToken.password;
      res.status(200).json(userWToken);
    }
  } catch (error) {
    next(error);
  }
};

// GET: 현재 로그인된 유저 정보
const userCurrent = async function (req, res, next) {
  try {
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const email = req.body.email;
    const [res_currentEmail, fld_currentEmail, err_currentEmail] =
      await pool.query({
        sql: "SELECT * FROM users WHERE `email` = ? ",
        values: [email],
      });
    if (err_currentEmail) throw err_currentEmail;
    delete res_currentEmail[0].password;
    res.status(200).json(res_currentEmail[0]);
  } catch (error) {
    next(error);
  }
};

// api index
userAuthRouter.get("/userlist", asyncHandler(userList));
userAuthRouter.post("/user/register", asyncHandler(userRegister));
userAuthRouter.post("/user/login", asyncHandler(userLogin));
userAuthRouter.get(
  "/user",
  asyncHandler(login_required),
  asyncHandler(userCurrent)
);

module.exports = userAuthRouter;

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
