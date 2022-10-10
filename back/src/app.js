// //------1st option-------//
// // 공식문서 내용이나 1차 프로젝트시 여러 파일로 분리되어 작성된 것으로 보임
// // reference:
// // https://nodejs.org/en/docs/guides/getting-started-guide/

// const http = require("http");

// const hostname = "127.0.0.1";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

//------2nd option-------//
// import cors from "cors";
// import express from "express";
// import { userAuthRouter } from "./routers/userRouter";
// import { errorMiddleware } from "./middlewares/errorMiddleware";

// import는 error가 나서 형식 변경
// const cors = require("cors");
const express = require("express");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const { userAuthRouter } = require("./routers/userRouter");
// router를 만들면 추가하기

const app = express();

// CORS 에러 방지
// app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", userAuthRouter);

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 7팀의 팀프로젝트 API 입니다.");
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
// app.use(userAuthRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

// import error와 같이 export도 error발생
// export { app };
module.exports = app;
