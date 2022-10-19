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
// "REDIRECT_URI": "kauth.kakao.com/oauth/authorize?client_id=9fd6d9d615c25ff01b60a3a988e942bc&redirect_uri=http://127.0.0.1:5173/login/oauth2/code/kakao&response_type=code"
const kakaoReqToken = async (req, res, next) => {
  const code = req.body.code;
  const REST_API_KEY = "9fd6d9d615c25ff01b60a3a988e942bc";
  const REDIRECT_URI = "http://127.0.0.1:5173/login/oauth2/code/kakao";
  try {
    // const makeFormData = (params) => {
    //   const searchParams = new URLSearchParams();
    //   Object.keys(params).forEach((key) => {
    //     searchParams.append(key, params[key]);
    //   });
    //   return searchParams;
    // };
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
    // console.log("kakaoToken: ", kakaoToken);
    // const kakaoAccessToken = kakaoToken.access_token;
    // console.log("kakaoAccessToken: ", kakaoAccessToken);
    const kakaoAccessToken = JSON.stringify(kakaoToken.access_token);
    // console.log("kakaoAccessToken_JSON.stringify: ", kakaoAccessToken);

    let kakaoUser = "";
    ///////정보 받아오기///////
    const access_token = kakaoAccessToken;
    // console.log("access_token: ", access_token);
    await axios({
      //   method: "POST",
      method: "GET",
      headers: {
        // "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `bearer ${access_token}`,
      },
      //   url: "https://kapi.kakao.com/v2/user/me",
      url: "https://kapi.kakao.com/v1/oidc/userinfo",
      //   data: makeFormData({
      //     grant_type: "authorization_code",
      //     secure_resource: false,
      //     property_keys: ["kakao_account.email"],
      //     // property_keys: ["account_email"],
      //   }),
    })
      .then((res) => {
        console.log("res_raw: ", res);
        kakaoUser = res;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("before_JSON.stringify: ", kakaoUser.email);
    const kakaoUserEmailWL = JSON.stringify(kakaoUser.email);
    console.log(kakaoUserEmailWL);
    console.log("before replace: ", typeof kakaoUserEmailWL); // before_JSON.stringify:  new_peridot@naver.com
    const kakaoUserEmail = kakaoUserEmailWL.replace('\\"', "");
    console.log("after replace: ", kakaoUserEmail); // after replace:  "new_peridot@naver.com"

    res.status(200).json(kakaoUserEmail);
  } catch (error) {
    next(error);
  }
};

const kakaoReqUserInfo = async (req, res, next) => {
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
socialLoginRouter.post("/kakaoReqToken", asyncHandler(kakaoReqToken));
socialLoginRouter.post("/kakaoReqUserInfo", asyncHandler(kakaoReqUserInfo));
module.exports = socialLoginRouter;
