// reference:
// 1차 프로젝트 파일
function errorMiddleware(error, req, res, next) {
  console.log("\x1b[33m%s\x1b[0m", error); // 정규식은 한번 해석해봐야함
  res.status(400).send(error.message);
}

// export { errorMiddleware };
module.exports = errorMiddleware;
