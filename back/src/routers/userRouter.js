const express = require("express");
const { pool } = require("../db/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const asyncHandler = require("../util/asyncHandler");
const asyncHandler = require("express-async-handler");
const login_required = require("../middlewares/login_required");
// const moment1 = require("moment");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const upload = require("../middlewares/image_upload");

const userAuthRouter = express.Router();

// GET: 유저리스트 확인 기능
const userList = async (req, res, next) => {
  try {
    const [results, fields, error] = await pool.query("SELECT * FROM users");
    if (error) throw error;
    // console.log(results.length);
    for (let i = 0; i < results.length; i++) {
      delete results[i].password;
    }
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};

// GET: 회원가입 - Email 중복 확인 기능
const userRegisterEmail = async (req, res, next) => {
  try {
    const email = req.body.email;

    // 이메일 중복 확인
    const [res_checkID, fld_checkID, err_checkID] = await pool.query({
      sql: "SELECT * FROM users WHERE `email` = ? ",
      values: [email],
    });
    if (err_checkID) throw err_checkID;
    else if (JSON.stringify(res_checkID) !== "[]") {
      res.status(200).json({
        result: false,
        errorMessage:
          "입력하신 email로 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
        errorCause: "email",
      });
    } else {
      res.status(200).json({
        result: true,
        resultMessage:
          "입력하신 email로 가입된 내역이 없습니다. 사용하실 수 있습니다.",
      });
    }
  } catch (err) {
    next(err);
  }
};

// GET: 회원가입 - nickname 중복 확인 기능
const userRegisterNickname = async (req, res, next) => {
  try {
    const nickname = req.body.nickname;

    // 닉네임 중복 확인
    const [res_checkNickname, fld_checkNickname, err_checkNickname] =
      await pool.query({
        sql: "SELECT * FROM users WHERE `nickname` = ? ",
        values: [nickname],
      });
    if (err_checkNickname) throw err_checkNickname;
    else if (JSON.stringify(res_checkNickname) !== "[]") {
      res.status(200).json({
        result: false,
        errorMessage:
          "입력하신 닉네임으로 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
        errorCause: "nickname",
      });
    } else {
      res.status(200).json({
        result: true,
        resultMessage:
          "입력하신 nickname으로 가입된 내역이 없습니다. 사용하실 수 있습니다.",
      });
    }
  } catch (err) {
    next(err);
  }
};

// POST: 회원가입 기능
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
      res.status(200).json({
        result: false,
        errorMessage:
          "입력하신 email로 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
        errorCause: "email",
      });
    }

    // 닉네임 중복 확인
    const [res_checkNickname, fld_checkNickname, err_checkNickname] =
      await pool.query({
        sql: "SELECT * FROM users WHERE `nickname` = ? ",
        values: [nickname],
      });
    if (err_checkNickname) throw err_checkNickname;
    else if (JSON.stringify(res_checkNickname) !== "[]") {
      res.status(200).json({
        result: false,
        errorMessage:
          "입력하신 닉네임으로 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
        errorCause: "nickname",
      });
    }
    if (
      JSON.stringify(res_checkID) === "[]" &&
      JSON.stringify(res_checkNickname) === "[]"
    ) {
      // 비밀번호 해쉬화
      const hashedPassword = await bcrypt.hash(password, 10);
      // db에 저장
      const [res_save, fld_save, err_save] = await pool.query({
        sql: "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)",
        values: [email, hashedPassword, nickname],
      });
      if (err_save) throw err_save;
      res.status(200).json({
        result: true,
        resultMessage: "회원가입이 성공적으로 이뤄졌습니다.",
      });
    }
  } catch (err) {
    next(err);
  }
};

// POST: 로그인 기능
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
      res.status(200).json({
        result: false,
        errorMessage: "일치하는 email이 없습니다. 다시 한 번 확인해 주세요.",
        errorCause: "email",
      });
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
      res.status(200).json({
        result: false,
        errorMessage: "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.",
        errorCause: "password",
      });
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

      const userWToken = Object.assign(
        {
          result: true,
          resultMessage: "로그인이 성공적으로 이뤄졌습니다.",
        },
        { token: token },
        res_logID_tk[0]
      );
      delete userWToken.user_id;
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
    const user_id = req.user_id;
    const [res_currentUser, fld_currentUser, err_currentUser] =
      await pool.query({
        sql: "SELECT * FROM users WHERE `user_id` = ? ",
        values: [user_id],
      });
    if (err_currentUser) throw err_currentUser;
    if (res_currentUser && res_currentUser.length) {
      // false, 검색된 결과가 없을 때
      delete res_currentUser[0].password;
      delete res_currentUser[0].user_id;
      const resultWMessage = Object.assign(
        {
          result: true,
          resultMessage: "로그인이 성공적으로 이뤄졌습니다.",
        },
        res_currentUser[0]
      );
      res.status(200).json(resultWMessage);
    } else {
      res.status(200).json({
        result: false,
        resultMessage: "로그인이 실패했습니다.",
      });
    }
  } catch (error) {
    next(error);
  }
};

// PUT: 유저 정보 업데이트(pw)
const userUpdatePW = async function (req, res, next) {
  try {
    const email = req.body.email;
    const current_password = req.body.current_password;
    const new_password = req.body.new_password;
    const updated_time = moment().format("YYYY-MM-DD HH:mm:ss");
    const [res_checkID, fld_checkID, err_checkID] = await pool.query({
      sql: "SELECT * FROM users WHERE `email` = ? ",
      values: [email],
    });
    if (err_checkID) throw err_checkID;

    // 비밀번호 일치 여부 확인
    const res_logID_array = JSON.stringify(res_checkID, ["password"]);
    const res_logID_pw = res_logID_array.split(`"`);
    const correctPasswordHash = res_logID_pw[3];
    const isPasswordCorrect = await bcrypt.compare(
      current_password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      res.status(200).json({
        result: false,
        errorMessage: "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.",
        errorCause: "password",
      });
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const [res_userUpdate, fld_userUpdate, err_userUpdate] = await pool.query({
      sql: "UPDATE users SET `password`=?, `updated_time`=? WHERE `email` = ? ",
      values: [hashedPassword, updated_time, email],
    });
    if (err_userUpdate) throw err_userUpdate;
    res.status(200).json({
      result: true,
      resultMessage: "비밀번호 업데이트가 성공적으로 이뤄졌습니다.",
    });
  } catch (error) {
    next(error);
  }
};
// PUT: 유저 정보 업데이트(Info)
const userUpdateInfo = async function (req, res, next) {
  try {
    const email = req.body.email;
    const nickname = req.body.nickname;
    const description = req.body.description;
    const updated_time = moment().format("YYYY-MM-DD HH:mm:ss");
    const [res_checkID, fld_checkID, err_checkID] = await pool.query({
      sql: "SELECT * FROM users WHERE `email` = ? ",
      values: [email],
    });
    if (err_checkID) throw err_checkID;

    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const [res_userUpdate, fld_userUpdate, err_userUpdate] = await pool.query({
      sql: "UPDATE users SET `nickname`=?, `description`=?, `updated_time`=? WHERE `email` = ? ",
      values: [nickname, description, updated_time, email],
    });
    if (err_userUpdate) throw err_userUpdate;
    res.status(200).json({
      result: true,
      resultMessage: "유저정보 업데이트가 성공적으로 이뤄졌습니다.",
    });
  } catch (error) {
    next(error);
  }
};

// POST: 프로필사진 업로드
const profileUpload = async function (req, res, next) {
  try {
    const email = req.body.email;
    const new_filename = req.file.filename;
    const updated_time = moment().format("YYYY-MM-DD HH:mm:ss");
    const [res_profileUpload, fld_profileUpload, err_profileUpload] =
      await pool.query({
        sql: "UPDATE users SET `profile_photo`=?, `updated_time`=? WHERE `email` = ? ",
        values: [new_filename, updated_time, email],
      });
    if (err_profileUpload) throw err_profileUpload;
    res.status(200).json({
      result: true,
      resultMessage: "프로필사진이 성공적으로 업로드 되었습니다.",
    });
  } catch (e) {
    next(e);
  }
};

// DELETE: 유저 삭제
const userDelete = async function (req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const [res_userDelete_check, fld_userDelete_check, err_userDelete_check] =
      await pool.query({
        sql: "SELECT * FROM users WHERE `email` = ? ",
        values: [email],
      });
    if (err_userDelete_check) throw err_userDelete_check;

    // 비밀번호 일치 여부 확인
    const res_logID_array = JSON.stringify(res_userDelete_check, ["password"]);
    const res_logID_pw = res_logID_array.split(`"`);
    const correctPasswordHash = res_logID_pw[3];
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      res.status(200).json({
        result: false,
        errorMessage: "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.",
        errorCause: "password",
      });
    } else {
      // DB에서 유저 정보 삭제
      const [res_userDelete, fld_userDelete, err_userDelete] = await pool.query(
        {
          sql: "DELETE FROM users WHERE `email` = ? ",
          values: [email],
        }
      );
      if (err_userDelete) throw err_userDelete;
      res.status(200).json({
        result: true,
        resultMessage: "유저 정보가 성공적으로 삭제 되었습니다.",
      });
    }
  } catch (e) {
    next(e);
  }
};

//한 유저가 좋아요 누른 가게 모아보기
const userlikestore = async (req, res, next) => {
  try {
    const user_id = req.user_id;
    const [results, fields, error] = await pool.query(
      `select * from like_store where user_id="${user_id}";`
    );
    if (error) throw error;
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};

// api index
userAuthRouter.get("/userlist", asyncHandler(userList));
userAuthRouter.post("/user/register/email", asyncHandler(userRegisterEmail));
userAuthRouter.post(
  "/user/register/nickname",
  asyncHandler(userRegisterNickname)
);
userAuthRouter.post("/user/register", asyncHandler(userRegister));
userAuthRouter.post("/user/login", asyncHandler(userLogin));
userAuthRouter.get(
  "/user",
  asyncHandler(login_required),
  asyncHandler(userCurrent)
);

userAuthRouter.put(
  "/user/updatePW",
  asyncHandler(login_required),
  asyncHandler(userUpdatePW)
);
userAuthRouter.put(
  "/user/updateInfo",
  asyncHandler(login_required),
  asyncHandler(userUpdateInfo)
);
userAuthRouter.post(
  "/user/update",
  // asyncHandler(login_required),
  asyncHandler(upload.single("file")),
  asyncHandler(profileUpload)
);
userAuthRouter.post(
  "/user/delete",
  asyncHandler(login_required),
  asyncHandler(userDelete)
);

userAuthRouter.get(
  "/user/like-store",
  asyncHandler(login_required),
  asyncHandler(userlikestore)
);

module.exports = userAuthRouter;
