const express = require("express");
const { pool, connection } = require("../db/database");

const storesRouter = express.Router();

//get요청 /stores/:storeId  (storeId는 1부터 순차적으로 자동 부여됨) 입력시 요청한 한개의 가게를 보여줌
storesRouter.get("/stores/:storeId", async (req, res, next) => {
  try {
    const storeId = req.params.storeId;
    const [results, fields, error] = await pool.query(
      `select * from stores where store_id=${storeId};`
    );
    if (error) throw error;
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

// 회원가입 기능
storesRouter.post("/stores/:storeId", async (req, res, next) => {
  try {
    // if (is.emptyObject(req.body)) {
    //   throw new Error(
    //     "headers의 Content-Type을 application/json으로 설정해주세요"
    //   );
    // }
    // // 이메일 중복 확인
    // const [results, fields, error] = await pool.query(
    //   `SELECT email FROM users WHERE 'email = ${req.body.email}'`
    // );
    // if (error) throw error;
    // else if (results) {
    //   // const errorMessage =
    //   // "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
    //   console.log(results);
    //   // return { errorMessage };
    // }
    // // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;

    // // 위 데이터를 유저 db에 추가하기

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);
    // db에 저장
    const [res_save, fld_save, err_save] = await pool.query({
      sql: "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)",
      // timeout: 4000, // 40s
      values: [email, hashedPassword, nickname],
    });
    // function (error, results, fields) {
    if (err_save) throw err_save;
    const newUser = JSON.stringify(res_save, ["insertId"]);
    console.log(newUser);
    // }

    res.status(200).send(newUser);
  } catch (err) {
    next(err);
  }
});
module.exports = storesRouter;
