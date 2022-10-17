const express = require("express");
const { pool } = require("../db/database");
const login_required = require("../middlewares/login_required")

const myPageRouter = express.Router();


//해당 유저 전체 댓글 불러오기
myPageRouter.get("/mypage/myReview", login_required, async (req, res, next) => {
    try {
      const user_id = req.user_id;
      // const user_id = 1
  
    let [results, fields, error] = await pool.query(
      `SELECT R.review_id, R.star, R.description, R.photo, R.created_time, R.updated_time, S.name as store_name 
      FROM reviews R
      INNER JOIN stores S
      ON R.store_id = S.store_id
      WHERE R.user_id = ${user_id}`
    );
  
    for (var i = 0; i < results.length; i++) {
      let k = results[i].review_id
      //그 리뷰를 좋아하는 사람 목록
      let [reviewLikeList] = await pool.query(
        `SELECT LR.like_review_id, LR.created_time, U.nickname 
        FROM like_reviews LR 
        INNER JOIN users U 
        ON LR.user_id = U.user_id
        WHERE LR.review_id = ${k} and tag="like"`)
      //그 리뷰를 싫어하는 사람 목록
      let [reviewDislikeList] = await pool.query(
        `SELECT LR.like_review_id, LR.created_time, U.nickname 
        FROM like_reviews LR INNER 
        JOIN users U 
        ON LR.user_id = U.user_id 
        WHERE LR.review_id = ${k} and tag="dislike"`)
      results[i].like_reviews = reviewLikeList
      results[i].dike_reviews = reviewDislikeList
    }
    console.log(results)
  
    if (error) throw error;
   
    res.status(201).json(results);
    } catch (err) {
    next(err);
    }
  });

//마이페이지 

module.exports = myPageRouter;