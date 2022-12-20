const express = require("express");
const { pool } = require("../db/database");
const login_required = require("../middlewares/login_required");
// const asyncHandler = require("../util/asyncHandler");
const asyncHandler = require("express-async-handler");
const myPageRouter = express.Router();

//해당 유저 전체 댓글 불러오기
myPageRouter.get("/mypage/reviews", login_required, async (req, res, next) => {
    try {
      const user_id = req.user_id;
      // const user_id = 1
  
    let [results, fields, error] = await pool.query(
      `SELECT R.review_id, R.star, R.description, R.photo, R.photo2, R.created_time, R.updated_time, S.name as store_name 
      FROM reviews R
      INNER JOIN stores S
      ON R.store_id = S.store_id
      WHERE R.user_id = ${user_id}`
    );

    for (var i = 0; i < results.length; i++) {
      let k = results[i].review_id;
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
    console.log(results);

    if (error) throw error;

    res.status(201).json(results);
  } catch (err) {
    next(err);
  }
});

// GET: 현재 로그인된 유저의 마이페이지 info 정보
const mypageInfo = async function (req, res, next) {
  try {
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const user_id = req.user_id;
    const [res_currentUser, fld_currentUser, err_currentUser] =
      await pool.query({
        sql: "SELECT * FROM users WHERE `user_id` = ? ",
        values: [user_id],
      });
    if (err_currentUser) throw err_currentUser;
    // 관심상점 수
    const [res_favStore, fld_favStore, err_favStore] = await pool.query({
      sql: "SELECT count(store_id) AS myFavStores FROM like_store WHERE `user_id` = ? ",
      values: [user_id],
    });
    if (err_favStore) throw err_favStore;
    // 리뷰 수
    const [res_myReview, fld_myReview, err_myReview] = await pool.query({
      sql: "SELECT count(review_id) AS myReviews FROM reviews WHERE `user_id` = ? ",
      values: [user_id],
    });
    if (err_myReview) throw err_myReview;
    // 리워드 수
    const cntReviews = res_myReview[0].myReviews;
    const myReward = Math.floor(cntReviews / 5);

    const mypageInfo_result = Object.assign(
      res_currentUser[0],
      res_favStore[0],
      res_myReview[0],
      { myReward: myReward }
    );
    delete mypageInfo_result.user_id;
    delete mypageInfo_result.password;
    const resultWMessage = Object.assign(
      {
        result: true,
        resultMessage: "로그인이 성공적으로 이뤄졌습니다.",
      },
      mypageInfo_result
    );
    res.status(200).json(resultWMessage);
  } catch (error) {
    next(error);
  }
};

//좋아요 상점 목록 불러오기
myPageRouter.get("/mypage/stores", login_required, async (req, res, next) => {
  try {
    const user_id = req.user_id;

  let [results, fields, error] = await pool.query(
    `select LS.like_store_id, S.* from like_store LS 
    inner join stores S
    on S.store_id = LS.store_id 
    where user_id = ${user_id}`
  );
  
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

  console.log(results);

  if (error) throw error;

  res.status(201).json(results);
} catch (err) {
  next(err);
}
});

// myPageRouter.get(
//   "/user/reviewList",
//   asyncHandler(login_required),
//   asyncHandler(mypageReviewList)
// );
myPageRouter.get(
  "/mypage/info",
  asyncHandler(login_required),
  asyncHandler(mypageInfo)
);

module.exports = myPageRouter;

