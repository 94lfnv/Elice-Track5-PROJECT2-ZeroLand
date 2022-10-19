const express = require("express");
const { pool } = require("../db/database");
const asyncHandler = require("express-async-handler");

const mapRouter = express.Router();

// GET: 제로웨이색트샵 구 단위 검색
const mapZerowaste = async (req, res, next) => {
  try {
    const [results, fields, error] = await pool.query("SELECT * FROM users");
    if (error) throw error;
    // console.log(results.length);
    for (let i = 0; i < results.length; i++) {
      delete results[i].password;
    }
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};

// GET: 리필샵 구 단위 검색
const mapRefill = async (req, res, next) => {
  try {
    const [results, fields, error] = await pool.query("SELECT * FROM users");
    if (error) throw error;
    // console.log(results.length);
    for (let i = 0; i < results.length; i++) {
      delete results[i].password;
    }
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};

mapRouter.post("/map/zerowaste/:{gu}", asyncHandler(mapZerowaste));
mapRouter.post("/map/refill/:{gu}", asyncHandler(mapRefill));
module.exports = mapRouter;
