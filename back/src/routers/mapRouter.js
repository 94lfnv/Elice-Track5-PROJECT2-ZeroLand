const express = require("express");
const { pool } = require("../db/database");
const asyncHandler = require("express-async-handler");

const mapRouter = express.Router();
/////////////////////////////////////
//  y| A (x1, y1)               B (x2, y1')
//   | *------------------------*
//   | |                        |
//   | |                        |
//   | |                        |
//   | |                        |
//   | |                        |
//   | | D (x1', y2)            | C (x2', y2')
//   | *------------------------*
//   |______________________________
//                                x
// 가정 1. 위도(y축), 경도(x축)가 지도프레임의 축과 일치하지 않는다.
// 해결책 1. kakao map api 기능중 표시영역(모서리 4곳) 정보를 위도경도로 알려주는 '영역 변경 이벤트 등록하기'를 활용하여 sql 쿼리문을 작성한다.
// kakao maps api: https://apis.map.kakao.com/web/sample/addMapBoundsChangedEvent/
// 해결책 1. 수도코드
// 알고리즘 => 상점의 좌표 S를 각 선과 비교하여 사각형 안에 있는지 확인한다.
function checkStore(A, B, C, D, S, res) {
  // 2차 커널: 1차는 러프한 필터링이었다면, 2차는 정밀
  const A = req.body.A위도경도json; // 위도 = y, 경도 = x
  const B = req.body.B위도경도json;
  const C = req.body.C위도경도json;
  const D = req.body.D위도경도json;
  const S = req.body.S위도경도json;
  ///// if (x축 기준, A좌표가 D좌표와 같을 때) //// .  ! == no need to compare
  // 1) S(x) ! LineAB(x), S(y) < LineAB
  // 2) S(x) > LineAD(x), S(y) ! LineAD
  // 3) S(x) < LineBC(x), S(y) ! LineBC
  // 4) S(x) ! LineCD(x), S(y) > LineCD
  // 계산식 (기울기 = y의 증가량/x의 증가량)
  if (A.경도 == D.경도) {
    try {
      A.경도 <= S.경도 <= B.경도; // x
      C.위도 <= S.위도 <= A.위도; // y
      res.json({
        result: true,
        resultMessage: "상점이 지도에 표시됩니다.",
      });
    } catch (err) {
      res.json({
        result: false,
        resultMessage: "상점이 지도 프레임 밖에 위해하여 표시되지 않습니다.",
      });
    }
    ///// else if (x축 기준, A좌표가 D좌표보다 작을 때) //// (일 때도 동일)
    // 1) S(x) > LineAB(x), S(y) < LineAB
    // 2) S(x) > LineAD(x), S(y) > LineAD
    // 3) S(x) < LineBC(x), S(y) < LineBC
    // 4) S(x) < LineCD(x), S(y) > LineCD
    // 계산식 (기울기 = y의 증가량/x의 증가량)
  } else {
    try {
      const lineAB = function () {
        // 1)
        const a = (B.위도 - A.위도) / (B.경도 - A.경도); // 기울기
        const x = S.경도 >= S.위도 / a; // x
        const y = S.위도 <= S.경도 * a; // y
        if (x == true && y == true) {
          return true;
        } else {
          return false;
        }
      };
      const lineAD = function () {
        // 1)
        const a = (D.위도 - A.위도) / (D.경도 - A.경도); // 기울기
        const x = S.경도 >= S.위도 / a; // x
        const y = S.위도 >= S.경도 * a; // y
        if (x == true && y == true) {
          return true;
        } else {
          return false;
        }
      };
      const lineBC = function () {
        // 1)
        const a = (C.위도 - B.위도) / (C.경도 - B.경도); // 기울기
        const x = S.경도 <= S.위도 / a; // x
        const y = S.위도 <= S.경도 * a; // y
        if (x == true && y == true) {
          return true;
        } else {
          return false;
        }
      };
      const lineCD = function () {
        // 1)
        const a = (C.위도 - D.위도) / (C.경도 - D.경도); // 기울기
        const x = S.경도 <= S.위도 / a; // x
        const y = S.위도 >= S.경도 * a; // y
        if (x == true && y == true) {
          return true;
        } else {
          return false;
        }
      };
      // promis all 적용이 효율적
      Promise.all([lineAB, lineAD, lineBC, lineCD]).then((value) => {
        if (
          value[0] == true &&
          value[1] == true &&
          value[2] == true &&
          value[3] == true
        ) {
          res.json({
            result: true,
            resultMessage: "상점이 지도에 표시됩니다.",
          });
        } else {
          res.json({
            result: false,
            resultMessage:
              "상점이 지도 프레임 밖에 위해하여 표시되지 않습니다.",
          });
        }
      });
    } catch (err) {
      res.json({
        result: false,
        resultMessage: "상점이 지도 프레임 밖에 위해하여 표시되지 않습니다.",
      });
    }

    //     ///// else (x축 기준, A좌표가 D좌표보다 클 때) ///// (작을 때도 동일)
    //     // 1) S(x) < LineAB(x), S(y) < LineAB
    //     // 2) S(x) > LineAD(x), S(y) < LineAD
    //     // 3) S(x) < LineBC(x), S(y) > LineB클
    //     // 4) S(x) > LineCD(x), S(y) > LineCD
    //     // 계산식 (기울기 = y의 증가량/x의 증가량)
    //   } else if (A.경도 > D.경도) {
    //     try {
    //       const lineAB = function () {
    //         // 1)
    //         const a = (B.위도 - A.위도) / (B.경도 - A.경도); // 기울기
    //         const x = S.경도 <= S.위도 / a; // x
    //         const y = S.위도 <= S.경도 * a; // y
    //         if (x == true && y == true) {
    //           return true;
    //         } else {
    //           return false;
    //         }
    //       };
    //       const lineAD = function () {
    //         // 1)
    //         const a = (A.위도 - D.위도) / (A.경도 - D.경도); // 기울기
    //         const x = S.경도 >= S.위도 / a; // x
    //         const y = S.위도 <= S.경도 * a; // y
    //         if (x == true && y == true) {
    //           return true;
    //         } else {
    //           return false;
    //         }
    //       };
    //       const lineBC = function () {
    //         // 1)
    //         const a = (B.위도 - C.위도) / (B.경도 - C.경도); // 기울기
    //         const x = S.경도 <= S.위도 / a; // x
    //         const y = S.위도 >= S.경도 * a; // y
    //         if (x == true && y == true) {
    //           return true;
    //         } else {
    //           return false;
    //         }
    //       };
    //       const lineCD = function () {
    //         // 1)
    //         const a = (C.위도 - D.위도) / (C.경도 - D.경도); // 기울기
    //         const x = S.경도 >= S.위도 / a; // x
    //         const y = S.위도 >= S.경도 * a; // y
    //         if (x == true && y == true) {
    //           return true;
    //         } else {
    //           return false;
    //         }
    //       };
    //       // promis all 적용이 효율적
    //       Promise.all([lineAB, lineAD, lineBC, lineCD]).then((value) => {
    //         if (
    //           value[0] == true &&
    //           value[1] == true &&
    //           value[2] == true &&
    //           value[3] == true
    //         ) {
    //           res.json({
    //             result: true,
    //             resultMessage: "상점이 지도에 표시됩니다.",
    //           });
    //         } else {
    //           res.json({
    //             result: false,
    //             resultMessage:
    //               "상점이 지도 프레임 밖에 위해하여 표시되지 않습니다.",
    //           });
    // }
    //   });
    // } catch (err) {
    //   res.json({
    //     result: false,
    //     resultMessage: err,
    //   });
    // }
    //   } else {
    //     res.json({
    //       result: false,
    //       resultMessage: err,
    //     });
  }
}

const showInMap = async (req, res, err) => {
  const A = req.body.A위도경도json; // 위도 = y, 경도 = x
  const B = req.body.B위도경도json;
  const C = req.body.C위도경도json;
  const D = req.body.D위도경도json;
  const maxX = Math.ma도(A.경도, B.경도, C.경도, D.경도); // 잘나오는지 확인 필요
  const minX = Math.min(A.경도, B.경도, C.경도, D.경도);
  const maxY = Math.max(A.위도, B.위도, C.위도, D.위도);
  const minY = Math.max(A.위도, B.위도, C.위도, D.위도);

  try {
    // 1차 커널: 요도경도 최대 최소값으로 1차 필터링
    const [results, fields, error] = await pool.query({
      sql: "SELECT * FROM stores WHERE 경도 BETWEEN ? AND ? AND 위도 BETWEEN ? AND ?",
      values: [minX, maxX, minY, maxY],
    });
    if (error) throw error;
    // console.log(results.length);
    let j = 0;
    let resultJson = {};
    for (let i = 0; i < results.length; i++) {
      let S = { 위도: results[i].위도, 경도: results[i].경도 };
      const { res } = checkStore(A, B, C, D, S);
      if (res.result == true) {
        resultJson[j] = results[i];
        j = j + 1;
      }
    }
    res.status(200).json({
      result: true,
      resultMessage: "지도에 표시되는 상점 리스트입니다.",
    });
  } catch (err) {
    next(err);
  }
};

mapRouter.post("/map/showInMap", asyncHandler(showInMap));
module.exports = mapRouter;
