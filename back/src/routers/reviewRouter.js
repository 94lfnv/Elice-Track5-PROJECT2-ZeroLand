const express = require("express");
const { pool } = require("../db/database");
const { reviewService } = require("../services/reviewService");

const reviewRouter = express.Router();

reviewRouter.post("/stores/:store_id/review", async (req, res, next) => {
try {//로그인 돼있나 확인하는 코드 나중에 추가예정
    //로그인된 유저를 토큰 값으로 확인한후 user_id를 받아오기
    // const user_id = req.currentUserId;
    const user_id = req.body.user_id;
    const star = req.body.star;
    const description = req.body.description;
    const photo = req.body.photo;
    const store_id = req.params.store_id
    
    // db에 저장
    const [results, fields, error] = await pool.query(
        {
          sql: "INSERT INTO reviews (user_id, star, description, photo, store_id) VALUES (?, ?, ?, ?, ?)",
          values: [user_id,
            star,
            description,
            photo,
            store_id,
           ]
        });
    if (error) throw error;
    // console.log(results);
    // const newReview = JSON.stringify(results, ["insertId"]);
    // console.log(newReview);

    console.log(results)
    const review_id = results.insertId;
    const saveData = { review_id, star, description, photo }
    
    res.status(201).send(saveData);
    } catch (err) {
    next(err);
    }
});

module.exports = reviewRouter;



 // const newReview = await reviewService.addReview({
    //     user_id, 
    //     star, 
    //     description, 
    //     photo,
    // });