import React, { useEffect, useState } from "react";
import MyReviewCard from "./MyReviewCard.jsx";


function MyReview( ) {


//   useEffect(() => {
//     // "awardlist/유저id"로 GET 요청하고, response의 data로 awards를 세팅함.
//     Api.get("award/readAll", ownerId).then((res) => setAwards(res.data));
//   }, [ownerId]);

  return(
    <>
        <h3 className="text-secondary">My Review</h3>
        <MyReviewCard />
        <MyReviewCard />
        <MyReviewCard />
        <MyReviewCard />
    </>
  )
}

export default MyReview;