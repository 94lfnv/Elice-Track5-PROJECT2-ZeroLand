const express = require("express");
const { pool, connection } = require("../db/database");
const login_required = require("../middlewares/login_required");
const storesRouter = express.Router();
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

//get요청 /store/:storeId  (storeId는 1부터 순차적으로 자동 부여됨) 입력시 요청한 한개의 가게를 보여줌
storesRouter.get("/store/:storeId", async (req, res, next) => {
  try {
    const storeId = req.params.storeId;
    const [results, fields, error] = await pool.query(
      `select * from stores S where store_id=${storeId};`
    );
    if (error) throw error;

    const [avg_star] = await pool.query(
      `select avg(star) as avg_star from reviews where store_id = ${storeId}`
    )
    if (avg_star[0].avg_star == null){
      results[0].avg_star = 0
    }else{
      results[0].avg_star = avg_star[0].avg_star
    }
    console.log(results)

    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

//get요청 /store 전체 가게 리스트를 보여줌
storesRouter.get("/store", async (req, res, next) => {
  try {
    const [results, fields, error] = await pool.query(
      `select * from stores where store_id ;`
    );
    if (error) throw error;

    for (var i = 0; i < results.length; i++) {
      let k = results[i].store_id;
      const [avg_star] = await pool.query(
        `select avg(star) as avg_star from reviews where store_id = ${k}`
      )
      if (avg_star[0].avg_star == null){
        results[i].avg_star = 0
      }else{
        results[i].avg_star = avg_star[0].avg_star
      }
    }
    
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

// 새로운 가게 정보 등록 post
storesRouter.post("/stores/add", async (req, res, next) => {
  try {
    const {
      name,
      description,
      tag,
      url,
      phone,
      open_time,
      close_time,
      latitude,
      longitude,
      address_detail,
    } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const [res_save, fld_save, err_save] = await pool.query({
      sql: "INSERT INTO stores (name, description, tag, url, phone, open_time, close_time, latitude, longitude, address_detail) VALUES (?,?,?,?,?,?,?,?,?,?)",
      values: [
        name,
        description,
        tag,
        url,
        phone,
        open_time,
        close_time,
        latitude,
        longitude,
        address_detail,
      ],
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

//가게정보 수정 put
storesRouter.put("/store/:storeId", async (req, res, next) => {
  try {
    const storeId = req.params.storeId;
    const {
      name,
      description,
      tag,
      url,
      phone,
      open_time,
      close_time,
      latitude,
      longitude,
      address_detail,
    } = req.body;

    const [results, fields, error] = await pool.query({
      sql: `update stores SET name="${name}", description="${description}", tag="${tag}", url="${url}", phone="${phone}", 
      open_time="${open_time}", close_time="${close_time}", latitude="${latitude}", longitude="${longitude}",
      address_detail="${address_detail}" WHERE store_id="${storeId}"`,
    });

    if (error) throw error;
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

//가게정보 삭제
storesRouter.delete("/store/:storeId", async (req, res, next) => {
  try {
    const storeId = req.params.storeId;
    const [results, fields, error] = await pool.query(
      `delete from stores where store_id=${storeId};`
    );
    if (error) throw error;
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

//get요청 서울시 ㅇㅇ구 ㅇㅇ동에 있는 가게정보 가져오기
storesRouter.get("/store/address/:addressId", async (req, res, next) => {
  try {
    const addressId = req.params.addressId;
    const [results, fields, error] = await pool.query(
      `select * from stores inner join address on stores.address_id = address.address_id where address.address_id =${addressId};`
    );
    if (error) throw error;
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
});

//스토어 찜하기
storesRouter.post(
  "/stores/:store_id/like",
  login_required,
  async (req, res, next) => {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.user_id;
      const store_id = req.params.store_id;
      
      // // 위 데이터를 유저 db에 추가하기
      // const [res_save, fld_save, error] = await pool.query(
      //   `DELETE FROM like_store(user_id,store_id) WHERE review_id=${user_id} and user_id=${store_id} `
      // );
      // if (error) throw error;

      const [results, fields, error] = await pool.query(
        `delete from like_store where store_id="${store_id}" and user_id="${user_id}" ;`
      );

      // db에 저장
      const [saveStoreLike, err] = await pool.query(
        `INSERT INTO like_store(user_id, store_id) VALUES ("${user_id}", '${store_id}');`
      );
      if (err) throw err;

      //저장된 데이터
      const [saveData, , getDataErr] = await pool.query(
        `SELECT store_id, like_store_id, time FROM like_store WHERE user_id="${user_id}" and store_id="${store_id}"`
      );
      if (getDataErr) throw getDataErr;

      console.log(saveData);
      res.status(201).json(saveData);
    } catch (err) {
      next(err);
    }
  }
);

//가게찜 삭제
storesRouter.delete(
  "/store/:store_id/like",
  login_required,
  async (req, res, next) => {
    try {
      const user_id = req.user_id;
      // const store_id = req.params.store_id;
      // const user_id = 2;
      const store_id = req.params.store_id;
      const [results, fields, error] = await pool.query(
        `delete from like_store where store_id="${store_id}" and user_id="${user_id}" ;`
      );
      if (error) throw error;
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = storesRouter;

//https://data.seoul.go.kr/dataList/OA-21234/S/1/datasetView.do 데이터정보
