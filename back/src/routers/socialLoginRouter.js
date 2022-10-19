const express = require("express");
const axios = require("axios");
const asyncHandler = require("../util/asyncHandler");
// const kakaoService = require("../services/kakaoService.js");
// const naverService = require("../services/naverService.js");
const request = require("request");

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
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
        res.end(body);
      } else {
        res.status(response.statusCode).end();
        console.log("error = " + response.statusCode);
      }
    });
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
//////// 토큰 받는 것 까지 정상 작동//////////
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

    let kakaoUser = "";
    ///////정보 받아오기///////
    const access_token = JSON.stringify(kakaoToken.access_token);
    await axios({
      method: "GET",
      headers: {
        Authorization: `bearer ${access_token}`,
      },
      url: "https://kapi.kakao.com/v1/oidc/userinfo",
    })
      .then((res) => {
        console.log("res_raw: ", res);
        kakaoUser = res;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("before_JSON.stringify: ", kakaoUser.email);
    const kakaoUserEmail = JSON.stringify(kakaoUser.email);

    // 이메일 중복 확인
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
    // access token 해쉬화
    const hashedToken = await bcrypt.hash(access_token, 10);
    const nickname = "kakao_" + kakaoUserEmail;
    // db에 저장
    const [res_save, fld_save, err_save] = await pool.query({
      sql: "INSERT INTO users (email, password, nickname, provider) VALUES (?, ?, ?)",
      values: [kakaoUserEmail, access_token, nickname, kakao],
    });
    if (err_save) throw err_save;
    res.status(200).json({
      result: true,
      resultMessage: "kakao api를 이용한 회원가입이 성공적으로 이뤄졌습니다.",
      provider: kakao,
      hashedToken: hashedToken,
    });
  } catch (error) {
    next(error);
  }
};

const kakaoLogin = async (req, res, next) => {
  const access_token = req.body.access_token;
  //   const code = "q9oXFfantmUUdYBKTI70kT2jRAH57gIojFcSPIGNGQs8pgUj0utB9JTHkW205aOJmuw_TQopb9UAAAGD7rfq3g";
  const REST_API_KEY = "9fd6d9d615c25ff01b60a3a988e942bc";
  //   const REDIRECT_URI = encodeURI("127.0.0.1:5173/login/oauth2/code/kakao");
  const REDIRECT_URI = "http://127.0.0.1:5173/login/oauth2/code/kakao";
  try {
    const makeFormData = (params) => {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        searchParams.append(key, params[key]);
      });
      return searchParams;
    };

    // const [testData, setTestData] = useState([]);
    // return await axios({
    await axios({
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `bearer ${access_token}`,
      },
      url: "https://kauth.kakao.com/v2/user/me",
      data: makeFormData({
        grant_type: "authorization_code",
        secure_resource: false,
        property_keys: ["kakao_account.email"],
        // property_keys: ["account_email"],
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    ///////

    // console.log("getToken을 전역변수로: ", testData);
    // res.status(200).json({
    //   result: true,
    //   resultMessage: "kakao token이 발급되었습니다.",
    //   result: kakaoToken,
    // });
    res.status(200).json({
      result: true,
      resultMessage: "kakao token이 발급되었습니다.",
      result: res,
    });
  } catch (error) {
    next(error);
  }
};
socialLoginRouter.post("/naverReqToken", asyncHandler(naverReqToken));
socialLoginRouter.post("/kakaoSignin", asyncHandler(kakaoSignin));
socialLoginRouter.post("/kakaoLogin", asyncHandler(kakaoLogin));
module.exports = socialLoginRouter;
