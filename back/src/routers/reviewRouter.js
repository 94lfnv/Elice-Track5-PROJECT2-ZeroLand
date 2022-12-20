const express = require("express");
const { pool } = require("../db/database");
// const { reviewService } = require("../services/reviewService");
const login_required = require("../middlewares/login_required")
const upload = require("../middlewares/image_upload");
const fs = require("fs");
const reviewRouter = express.Router();


//스토어 리뷰 달기
reviewRouter.post("/stores/:store_id/review", login_required, upload.array("photo"), async (req, res, next) => {
  try {
    //로그인된 유저를 토큰 값으로 확인한후 user_id를 받아오기
    const user_id = req.user_id;

    // const user_id = 3;
    const { star, description } = req.body;
    const store_id = req.params.store_id;
    
    let photo1;
    let photo2;
    //사진 저장. 사진이름 뽑기.
    if (req.files) {
      photo1 = req.files[0]||""
      photo2 = req.files[1]||""
      if (req.files[0] != undefined){
        photo1 = req.files[0].filename}
      if (req.files[1] != undefined){
        photo2 = req.files[0].filename}
    } else {
      photo1 = "";
      photo2= "";
    };
    
    // db에 저장
    const [results, fields, error] = await pool.query({
      sql: "INSERT INTO reviews (user_id, star, description, photo, photo2, store_id) VALUES (?, ?, ?, ?, ?, ?)",
      values: [user_id, star, description, photo1, photo2, store_id],
    });
    if (error) throw error;

    const review_id = results.insertId;
    const saveData = { review_id, star, description, photo1, photo2 };
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
      `SELECT R.review_id, R.star, R.description, R.photo, R.photo2, R.created_time, R.updated_time, U.nickname 
      FROM reviews R 
      INNER JOIN users U 
      ON R.user_id = U.user_id 
      WHERE store_id = ${store_id}`
    );
    
    if (error) throw error;

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
      results[i].disLike_reviews = reviewDislikeList
    }

    console.log(results);

    res.status(201).json(results);
  } catch (err) {
    next(err);
  }
});

//리뷰 수정하기
reviewRouter.put("/review/:review_id", login_required, upload.array("photo"), async (req, res, next) => {
  try {
    const review_id = req.params.review_id;
    const { star, description} = req.body;

    const [reviewPhoto, filed, err] = await pool.query(
      `SELECT photo, photo2 FROM reviews WHERE review_id=${review_id};`
    );
    if (err) throw err;

    //사진 삭제하기.
    let file_name = [reviewPhoto[0].photo, reviewPhoto[0].photo2]

    for (let i=0; i<=2; i++) {
      if (fs.existsSync("uploads/" + file_name[i])) {
        try {
          fs.unlinkSync("uploads/" + file_name[i]);
          console.log("image delete");
        } catch (deleteError) {
          console.log(deleteError);
        }
      }
    }

    //사진 저장. 사진이름 뽑기.
    if (req.files) {
      photo1 = req.files[0]||""
      photo2 = req.files[1]||""
      if (req.files[0] != undefined){
        photo1 = req.files[0].filename}
      if (req.files[1] != undefined){
        photo2 = req.files[0].filename}
    } else {
      photo1 = "";
      photo2= "";
    };

    const [results, fields, error] = await pool.query(
      `UPDATE reviews SET star=${star}, description="${description}", photo="${photo1}", photo2 ="${photo2}" WHERE review_id = ${review_id}`
    );
    const putData = { review_id, star, description, photo1, photo2};

    if (error) throw error;
    res.status(201).send(putData);
  } catch (err) {
    next(err);
  }
});

//리뷰 지우기
reviewRouter.delete("/stores/:store_id/:review_id", login_required, async (req, res, next) => {
  try {
    const review_id = req.params.review_id;

    const [reviewPhoto, filed, error] = await pool.query(
      `SELECT photo, photo2 FROM reviews WHERE review_id=${review_id};`
    );
    if (error) throw error;

    const [results, fields, err] = await pool.query(
      `DELETE FROM reviews WHERE review_id=${review_id};`
    );
    if (err) throw err;
    
    //사진 삭제하기.
    let file_name = [reviewPhoto[0].photo, reviewPhoto[0].photo2]

    for (let i=0; i<=2; i++) {
      if (fs.existsSync("uploads/" + file_name[i])) {
        try {
          fs.unlinkSync("uploads/" + file_name[i]);
          console.log("image delete");
        } catch (deleteError) {
          console.log(deleteError);
        }
      }
    }
    
    res.status(201).json({
      message: "리뷰가 삭제되었습니다.",
    });
  } catch (err) {
    next(err);
  }
});

//리뷰 좋아요
reviewRouter.post(
  "/stores/:store_id/:review_id/like",
  login_required, 
  async (req, res, next) => {
    try {
      //로그인된 유저를 토큰 값으로 확인한후 user_id를 받아오기
      const user_id = req.user_id;
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
  login_required, 
  async (req, res, next) => {
    try {
      //로그인된 유저를 토큰 값으로 확인한후 user_id를 받아오기
      const user_id = req.user_id;
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