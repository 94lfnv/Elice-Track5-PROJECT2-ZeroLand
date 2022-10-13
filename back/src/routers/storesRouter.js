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
storesRouter.put("/stores/:storeId", async (req, res, next) => {
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
storesRouter.delete("/stores/:storeId", async (req, res, next) => {
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

module.exports = storesRouter;
