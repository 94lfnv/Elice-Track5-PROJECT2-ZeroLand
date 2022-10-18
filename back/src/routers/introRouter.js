const express = require("express");
const { readFileSync } = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const introRouter = express.Router();

// GET: 소개 페이지의 쓰레기 배출량 증가 데이터, 연령대별 환경관심정도 데이터, 친환경적 태도 및 생활 습관 실천의 어려움 데이터
file_name = ["1996to2020_trashData_tonPerDay.csv", "국민환경의식조사원자료.csv", "친환경적습관실천어려움.csv"]
// GET: 
const introData = async (req, res, next) => {
  try {
    const intro = req.params.intro -1;
    const file = file_name[intro];
    const csvPath = path.join(__dirname, "..", "data", file);
    const csv = readFileSync(csvPath, "utf-8");
    // 문자열을 줄바꿈으로 구분 => 배열에 저장
    const rows = csv.split("\r\n");
    // 빈 배열 생성: CSV의 각 행을 담을 JSON 객체임
    const jsonArray = [];
    // 제목 행 추출 후, 콤마로 구분 => 배열에 저장
    const header = rows[0].split(",");
    // 내용 행 전체를 객체로 만들어, jsonArray에 담기
    for (let i = 1; i < rows.length; i++) {
      // 빈 객체 생성: 각 내용 행을 객체로 만들어 담아둘 객체임
      let obj = {};
      // 각 내용 행을 콤마로 구분
      let row = rows[i].split(",");
      // 각 내용행을 {제목1:내용1, 제목2:내용2, ...} 형태의 객체로 생성
      for (let j = 0; j < header.length; j++) {
        obj[header[j]] = row[j];
      }
      // 각 내용 행의 객체를 jsonArray배열에 담기
      jsonArray.push(obj);
    }
    res.status(200).json(jsonArray);
  } catch (err) {
    next(err);
  }
};

introRouter.get("/intro/:intro", asyncHandler(introData));


module.exports = introRouter;
