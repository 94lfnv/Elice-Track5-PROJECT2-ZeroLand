const express = require("express");
const cors = require("cors");
const userAuthRouter = require("./routers/userRouter");
// router를 만들면 추가하기
const storesRouter = require("./routers/storesRouter");
const reviewRouter = require("./routers/reviewRouter");
const myPageRouter = require("./routers/myPageRouter");
const introRouter = require("./routers/introRouter");
const socialLoginRouter = require("./routers/socialLoginRouter");

const app = express();
// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 7팀의 팀프로젝트 API 입니다.");
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use(reviewRouter);
app.use(introRouter);
app.use(socialLoginRouter);
app.use(myPageRouter);
app.use(storesRouter);

// 정적파일 경로
app.use(express.static("uploads"));

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
// app.use(errorMiddleware);

// import error와 같이 export도 error발생
module.exports = app;
