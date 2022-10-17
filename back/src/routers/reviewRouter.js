const express = require("express");
const { pool } = require("../db/database");
// const { reviewService } = require("../services/reviewService");
const login_required = require("../middlewares/login_required")

const reviewRouter = express.Router();

//스토어 댓글 달기
reviewRouter.post("/stores/:store_id/review", async (req, res, next) => {
  try {
    //로그인된 유저를 토큰 값으로 확인한후 user_id를 받아오기
    // const user_id = req.currentUserId;
    const user_id = 3;
    const { star, description, photo } = req.body;
    const store_id = req.params.store_id;
    
    // db에 저장
    const [results, fields, error] = await pool.query({
      sql: "INSERT INTO reviews (user_id, star, description, photo, store_id) VALUES (?, ?, ?, ?, ?)",
      values: [user_id, star, description, photo, store_id],
    });
    if (error) throw error;

    console.log(results);
    const review_id = results.insertId;
    const saveData = { review_id, star, description, photo };
    
    res.status(201).send(saveData);
  } catch (err) {
    next(err);
  }
});

//해당 스토어 전체 댓글 불러오기
reviewRouter.get("/stores/:store_id/reviews", async (req, res, next) => {
  try {
    const store_id = req.params.store_id;

    const [results, fields, error] = await pool.query(
      `SELECT review_id, user_id, star, description, photo, created_time, updated_time FROM reviews WHERE store_id = ${store_id}`
    );
    
    if (error) throw error;

    for (var i = 0; i < results.length; i++) {
      let k = results[i].review_id
      //그 리뷰를 좋아하는 사람 목록
      let [reviewLikeList] = await pool.query(
        `SELECT like_review_id, created_time, user_id FROM like_reviews WHERE like_reviews.review_id = ${k} and tag="like"`)
      //그 리뷰를 싫어하는 사람 목록
      let [reviewDislikeList] = await pool.query(
        `SELECT like_review_id, created_time, user_id FROM like_reviews WHERE like_reviews.review_id = ${k} and tag="dislike"`)
      results[i].like_reviews = reviewLikeList
      results[i].disLike_reviews = reviewDislikeList
    }

    console.log(results);

    res.status(201).json(results);
  } catch (err) {
    next(err);
  }
});

//리뷰 수정하기
reviewRouter.put("/review/:review_id", async (req, res, next) => {
  try {
    const review_id = req.params.review_id;
    const { star, description, photo } = req.body;

    const [results, fields, error] = await pool.query(
      `UPDATE reviews SET star=${star}, description="${description}", photo="${photo}" WHERE review_id = ${review_id}`
    );
    const putData = { review_id, star, description, photo };

    if (error) throw error;
    res.status(201).send(putData);
  } catch (err) {
    next(err);
  }
});

//리뷰 지우기
reviewRouter.delete("/stores/:store_id/:review_id", async (req, res, next) => {
  try {
    const review_id = req.params.review_id;
    const [results, fields, error] = await pool.query(
      `DELETE FROM reviews WHERE review_id=${review_id};`
    );
    if (error) throw error;

    res.status(201).json({
      message: "리뷰가 삭제되었습니다.",
    });
  } catch (err) {
    next(err);
  }
});
//예외처리 - 요청한 리뷰가 없을때도 잘삭제됐다고 나옴.

//리뷰 좋아요
reviewRouter.post(
  "/stores/:store_id/:review_id/like",
  async (req, res, next) => {
    try {
      //로그인된 유저를 토큰 값으로 확인한후 user_id를 받아오기
      // const user_id = req.currentUserId;
      const user_id = 2;
      const review_id = req.params.review_id;
      const tag = 1;

      //db에 존재하는 것 삭제
      const [deleteReviewLike, error] = await pool.query(
        // `select count(user_id) from like_reviews group by review_id, having count(review_id)>1`
        `DELETE FROM like_reviews WHERE review_id=${review_id} and user_id=${user_id}`
      );
      if (error) throw error;

      // db에 저장
      const [saveReviewLike, err] = await pool.query(
        `INSERT INTO like_reviews(user_id, review_id, tag) VALUES (${user_id}, ${review_id}, ${tag})`
      );
      if (err) throw err;
      
      //저장된 데이터
      const [saveData, , getDataErr] = await pool.query(
        `SELECT like_review_id, created_time, tag FROM like_reviews WHERE review_id=${review_id} and user_id=${user_id}`
      )
      if (getDataErr) throw getDataErr

      console.log(saveData);

      res.status(201).json(saveData);
    } catch (err) {
      next(err);
    }
  }
);

//리뷰 싫어요
reviewRouter.post(
  "/stores/:store_id/:review_id/dislike",
  async (req, res, next) => {
    try {
      //로그인된 유저를 토큰 값으로 확인한후 user_id를 받아오기
      // const user_id = req.currentUserId;
      const user_id = 2;
      const review_id = req.params.review_id;
      const tag = 2;

      //db에 존재하는 것 삭제
      const [deleteReviewLike, error] = await pool.query(
        // `select count(user_id) from like_reviews group by review_id, having count(review_id)>1`
        `DELETE FROM like_reviews WHERE review_id=${review_id} and user_id=${user_id}`
      );
      if (error) throw error;

      // db에 저장
      const [saveReviewLike, err] = await pool.query(
        `INSERT INTO like_reviews(user_id, review_id, tag) VALUES (${user_id}, ${review_id}, ${tag})`
      );
      if (err) throw err;
      
      //저장된 데이터 //field없으면 object로 나오는ㄷ.. 뭔지잘모르겠음
      const [saveData, field , getDataErr] = await pool.query(
        `SELECT like_review_id, created_time, tag FROM like_reviews WHERE review_id=${review_id} and user_id=${user_id}`
      )
      if (getDataErr) throw getDataErr

      console.log(saveData);

      res.status(201).json(saveData);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = reviewRouter;

//api index
// reviewRouter.post("/stores/:store_id/review", addReview);
// reviewRouter.get("/stores/:store_id/reviews", storeReviews);
// reviewRouter.get("/user/reviewList", userReviews);
// reviewRouter.put("/review/:review_id", putReview);
// reviewRouter.delete("/stores/:store_id/:review_id", deleteReview) ;

// const newReview = await reviewService.addReview({
//     user_id,
//     star,
//     description,
//     photo,
// });