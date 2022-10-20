const express = require("express");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const asyncHandler = require("../util/asyncHandler");
const { pool } = require("../db/database");
// const kakaoService = require("../services/kakaoService.js");
// const naverService = require("../services/naverService.js");
// const request = require("request");

const socialLoginRouter = express.Router();
axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.log(err);
    throw new Error("(!) axios error");
  }
);
const makeFormData = (params) => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    searchParams.append(key, params[key]);
  });
  return searchParams;
};

////////////////////////////////////////
/////////////  네  이  버  ///////////////
////////////////////////////////////////
const naverReqToken = async (req, res, next) => {
  const code = req.body.code;
  const state = req.body.state;
  const client_id = "JRa7NrbtcesvuNyjkj6I";
  const client_secret = "wKlBmjAspw";
  const redirectURI = encodeURI("http://127.0.0.1:5173/");
  try {
    // const makeFormData = (params) => {
    //   const searchParams = new URLSearchParams();
    //   Object.keys(params).forEach((key) => {
    //     searchParams.append(key, params[key]);
    //   });
    // };
    const api_url =
      //   "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
      "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
      client_id +
      "&client_secret=" +
      client_secret +
      "&redirect_uri=" +
      redirectURI +
      "&code=" +
      code +
      "&state=" +
      state;
    const options = {
      url: api_url,
      headers: {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
      },
    };
    // request.get(options, function (error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //     res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
    //     res.end(body);
    //   } else {
    //     res.status(response.statusCode).end();
    //     console.log("error = " + response.statusCode);
    //   }
    // });
    /////////
    let naverToken = "";
    await axios({
      method: "POST",
      headers: {
        "content-type": "text/json;charset=utf-8",
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
      },
      url: api_url,
      // data: makeFormData({
      //   grant_type: "authorization_code",
      //   client_id: REST_API_KEY,
      //   redirect_uri: REDIRECT_URI,
      //   code: code,
      // }),
    }).then((res) => {
      naverToken = res;
    });
    console.log("naverToken: ", naverToken);

    // const user = await naverService.getToken({ code });
    res.status(200).json(naverToken);
  } catch (error) {
    next(error);
  }
};

////////////////////////////////////////
/////////////  카  카  오  ///////////////
////////////////////////////////////////
// POST: kakao api 회원가입
const kakaoSignin = async (req, res, next) => {
  const code = req.body.code;
  const REST_API_KEY = "9fd6d9d615c25ff01b60a3a988e942bc";
  const REDIRECT_URI = "http://127.0.0.1:5173/login/oauth2/code/kakao";
  try {
    let kakaoToken = "";
    await axios({
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      url: "https://kauth.kakao.com/oauth/token",
      data: makeFormData({
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: code,
      }),
    })
      .then((res) => {
        kakaoToken = res;
      })
      .catch((err) => {
        console.log(err);
      });

    ///////정보 받아오기///////
    let kakaoUser = "";
    const access_token = JSON.stringify(kakaoToken.access_token);
    await axios({
      method: "GET",
      headers: {
        Authorization: `bearer ${access_token}`,
      },
      url: "https://kapi.kakao.com/v1/oidc/userinfo",
    })
      .then((res) => {
        kakaoUser = res;
      })
      .catch((err) => {
        console.log(err);
      });

    // 이메일 중복 확인
    const kakaoUserEmail = kakaoUser.email;
    const [res_checkID, fld_checkID, err_checkID] = await pool.query({
      sql: "SELECT * FROM users WHERE `email` = ? ",
      values: [kakaoUserEmail],
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

    // db에 저장
    const nickname = "kakao_" + kakaoUserEmail;
    const created_time = moment().format("YYYY-MM-DD HH:mm:ss");
    const updated_time = moment().format("YYYY-MM-DD HH:mm:ss");
    const [res_save, fld_save, err_save] = await pool.query({
      sql: "INSERT INTO users (email, password, nickname, provider, created_time, updated_time) VALUES (?, ?, ?, ?, ?, ?)",
      values: [
        kakaoUserEmail,
        access_token,
        nickname,
        "kakao",
        created_time,
        updated_time,
      ],
    });
    if (err_save) throw err_save;

    //  JWT 웹 토큰 생성
    const [res_logID, fld_logID, err_logID] = await pool.query({
      sql: "SELECT * FROM users WHERE `email` = ? ",
      values: [kakaoUserEmail],
    });
    if (err_logID) throw err_logID;
    const res_logID_arrayId = JSON.stringify(res_logID, ["user_id"]);
    const res_logID_Id = res_logID_arrayId.replace(/[^0-9]/g, "");
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: res_logID_Id }, secretKey);
    const [res_logID_tk, fld_logID_tk, err_logID_tk] = await pool.query({
      sql: "SELECT * FROM users WHERE `email` = ? ",
      values: [kakaoUserEmail],
    });
    if (err_logID_tk) throw err_logID_tk;
    const userWToken = Object.assign(
      {
        result: true,
        resultMessage: "kakao api를 이용한 회원가입이 성공적으로 이뤄졌습니다.",
        provider: "kakao",
        token: token,
      },
      res_logID_tk[0]
    );
    delete userWToken.user_id;
    delete userWToken.password;
    res.status(200).json(userWToken);
  } catch (error) {
    next(error);
  }
};

// POST: kakao api 로그인
const kakaoLogin = async (req, res, next) => {
  const code = req.body.code;
  const REST_API_KEY = "9fd6d9d615c25ff01b60a3a988e942bc";
  const REDIRECT_URI = "http://127.0.0.1:5173/login/oauth2/code/kakao";
  try {
    let kakaoToken = "";
    await axios({
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      url: "https://kauth.kakao.com/oauth/token",
      data: makeFormData({
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: code,
      }),
    })
      .then((res) => {
        kakaoToken = res;
      })
      .catch((err) => {
        console.log(err);
      });

    ///////정보 받아오기///////
    let kakaoUser = "";
    const access_token = JSON.stringify(kakaoToken.access_token);
    await axios({
      method: "GET",
      headers: {
        Authorization: `bearer ${access_token}`,
      },
      url: "https://kapi.kakao.com/v1/oidc/userinfo",
    })
      .then((res) => {
        kakaoUser = res;
      })
      .catch((err) => {
        console.log(err);
      });

    // 이메일 중복 확인
    const kakaoUserEmail = kakaoUser.email;
    const [res_checkID, fld_checkID, err_checkID] = await pool.query({
      sql: "SELECT * FROM users WHERE `email` = ?",
      values: [kakaoUserEmail],
    });
    if (err_checkID) throw err_checkID;
    else if (JSON.stringify(res_checkID) === "[]") {
      res.status(200).json({
        result: false,
        errorMessage: "일치하는 email이 없습니다. 다시 한 번 확인해 주세요.",
        errorCause: "email",
      });
    }

    //  JWT 웹 토큰 생성
    const [res_logID, fld_logID, err_logID] = await pool.query({
      sql: "SELECT * FROM users WHERE `email` = ? ",
      values: [kakaoUserEmail],
    });
    if (err_logID) throw err_logID;
    const res_logID_arrayId = JSON.stringify(res_logID, ["user_id"]);
    const res_logID_Id = res_logID_arrayId.replace(/[^0-9]/g, "");
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: res_logID_Id }, secretKey);
    const [res_logID_tk, fld_logID_tk, err_logID_tk] = await pool.query({
      sql: "SELECT * FROM users WHERE `email` = ? ",
      values: [kakaoUserEmail],
    });
    if (err_logID_tk) throw err_logID_tk;
    const userWToken = Object.assign(
      {
        result: true,
        resultMessage: "kakao api를 이용한 로그인이 성공적으로 이뤄졌습니다.",
        provider: "kakao",
        token: token,
      },
      res_logID_tk[0]
    );
    delete userWToken.user_id;
    delete userWToken.password;
    res.status(200).json(userWToken);
  } catch (error) {
    next(error);
  }
};

socialLoginRouter.post("/naverReqToken", asyncHandler(naverReqToken));
socialLoginRouter.post("/kakaoSignin", asyncHandler(kakaoSignin));
socialLoginRouter.post("/kakaoLogin", asyncHandler(kakaoLogin));
module.exports = socialLoginRouter;
