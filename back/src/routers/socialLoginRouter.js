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

////////////////////////////////////////
/////////////  네  이  버  ///////////////
////////////////////////////////////////
const naver = async (req, res, next) => {
  // const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  // const header = "Bearer " + userToken;
  const client_id = "JRa7NrbtcesvuNyjkj6I";
  const client_secret = "wKlBmjAspw";
  const redirectURI = encodeURI("http://127.0.0.1:5173/");
  //   const code = req.headers["authorization"]?.split(" ")[1] ?? "null";
  const code = req.headers["authorization"]?.split(" ")[1] ?? "null";
  //   const state = 200;
  const state = "77ee175d-e7a3-42eb-8aea-382a4e02a953";
  try {
    // const apiURL = "https://openapi.naver.com/v1/nid/me";
    // const code = req.query.code;
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
    // const user = await naverService.getToken({ code });
    // res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

////////////////////////////////////////
/////////////  카  카  오  ///////////////
////////////////////////////////////////
const kakaoReqCode = async (req, res, next) => {
  const REST_API_KEY = "9fd6d9d615c25ff01b60a3a988e942bc";
  const client_secret = "JvbCFkI8Lfxq9hkwMA9vbPOk9c52edrJ";
  //   const REDIRECT_URI = encodeURI("127.0.0.1:5173/login/oauth2/code/kakao");
  const REDIRECT_URI = "http://127.0.0.1:5173/login/oauth2/code/kakao";
  try {
    const api_url = `kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const options = {
      url: api_url,
      headers: {},
    };
    // <FE에서 리디렉션 url를 추적 가능한 경우>
    console.log("options: ", options);
    res.status(200).json({
      result: true,
      resultMessage:
        "아래 REDIRECT_URI로 이동하시어 사용자에게 동의를 받아주시고, url로 넘어오는 code값을 담아서 api 요청을 해주세요.",
      REDIRECT_URI: api_url,
    });
  } catch (error) {
    next(error);
  }
};

////////////////////////////////////
///// 토큰 받는 것 까지 정상 작동////
const kakaoReqToken = async (req, res, next) => {
  const code = req.body.code;
  const REST_API_KEY = "9fd6d9d615c25ff01b60a3a988e942bc";
  const client_secret = "JvbCFkI8Lfxq9hkwMA9vbPOk9c52edrJ";
  const REDIRECT_URI = "http://127.0.0.1:5173/login/oauth2/code/kakao";
  try {
    const makeFormData = (params) => {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        searchParams.append(key, params[key]);
      });
      return searchParams;
    };
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
    console.log("kakaoToken: ", kakaoToken);

    let kakaoUser = "";
    ///////정보 받아오기///////
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
        kakaoUser = res;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(kakaoUser);
    res.status(200).json(kakaoUser);
  } catch (error) {
    next(error);
  }
};

const kakaoReqUserInfo = async (req, res, next) => {
  const access_token = req.body.access_token;
  //   const code = "q9oXFfantmUUdYBKTI70kT2jRAH57gIojFcSPIGNGQs8pgUj0utB9JTHkW205aOJmuw_TQopb9UAAAGD7rfq3g";
  const REST_API_KEY = "9fd6d9d615c25ff01b60a3a988e942bc";
  const client_secret = "JvbCFkI8Lfxq9hkwMA9vbPOk9c52edrJ";
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
socialLoginRouter.get("/naver", asyncHandler(naver));
socialLoginRouter.get("/kakaoReqCode", asyncHandler(kakaoReqCode));
socialLoginRouter.post("/kakaoReqToken", asyncHandler(kakaoReqToken));
socialLoginRouter.post("/kakaoReqUserInfo", asyncHandler(kakaoReqUserInfo));
module.exports = socialLoginRouter;
