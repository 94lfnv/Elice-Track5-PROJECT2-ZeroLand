// //---------1nd option-------//
// const express = require("express");
// const app = express();
// // const router = express.Router();

// // example /api/concerts.js
// // https://www.youtube.com/watch?v=W5xFbiAl4bo
// // const concertsRouter = require("./api/concerts");

// const port = process.env.SERVER_PORT || 5000;

// // Parse URL - encorded bodies (as sent by HTML forms)
// app.use(express.urlencoded({ extended: ture }));

// // Parse JSON bodies (as sent API clients)
// // app.use("/concerts",concertsRouter);
// // app.use("/api", router);
// app.listen(port, () => console.log(`Server listening on port ${port}!`));

//---------**2nd option-------//
// import express from "express"; // app.js에서 중복 사용되어 불필요할 것으로 판단
// import { app } from "./src/app";  // import로 작성시 오류발생
const app = require("./src/app");

// import "dotenv/config";  // import로 작성시 오류발생
// 위의 코드는 한 줄, 아래 코드는 두 줄
// import { config } from "dotenv";
// config();
require("dotenv").config();

// const app = express(); // app.js에서 중복 사용되어 불필요할 것으로 판단
const PORT = process.env.SERVER_PORT || 5000;

// app.get은 app.js에 양보:)
// app.get("/", (req, res) => {
//   res.send(`<h1 style='text-align: center; color:blue;'> Hello, World!</h1>`);
// });

app
  .listen(PORT, () => console.log(` 🚀Server started on port ${PORT}!`))
  .on("error", (err) => console.log(err));

// 본 파일 실행시 app.js 내 import로 시작하는 코드에서 오류 발생
