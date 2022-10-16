const express = require("express");
const { pool } = require("../db/database");

const myPageRouter = express.Router();


//해당 유저 전체 댓글 불러오기
myPageRouter.get("/user/reviewList", async (req, res, next) => {
    try {
      // const user_id = req.currentUserId;
      const user_id = 1
  
    let [results, fields, error] = await pool.query(
      `SELECT () FROM reviews WHERE reviews.user_id = ${user_id}`
    );
  
    for (var i = 0; i < results.length; i++) {
      let k = results[i].review_id
      //그 리뷰를 좋아하는 사람 목록
      let [reviewLikeList] = await pool.query(
        `SELECT * FROM like_reviews WHERE like_reviews.review_id = ${k} and tag=1`)
      //그 리뷰를 싫어하는 사람 목록
      let [reviewDislikeList] = await pool.query(
        `SELECT * FROM like_reviews WHERE like_reviews.review_id = ${k} and tag=2`)
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

module.exports = myPageRouter;