import React, { useEffect, useState, useContext } from "react";
import ReviewCard from "../Common/ReviewCard.jsx";
import * as Api from "../../utils/Api";
import { MyPageContext } from "../Pages/Mypage.jsx";

function MyReview( ) {

  const { setReviews, reviews } = useContext(MyPageContext);
  // const [reviews,setReviews] = useState([{
  //   review_id: 0,
  //   star: 0,
  //   description: "",
  //   // photo: null,
  //   created_time:"",
  //   updated_time:"",
  //   user_id: "",
  //   store_id: "",
  //   like_reviews: 0
  // }]);

  const fetchData = async () =>{  
    const response = await Api.get('mypage/reviews');
    setReviews(response.data);
  };  // GET 요청 함수화

  useEffect(()=>{  //무한루프 실행을 피하기 위해 useEffect를 이용. server의 값을 받아옴.
    fetchData(); // <- 위에서 작성한 fetchData 사용
  }, []); 

  return(
    <>
      {reviews?.map((review) =>( // map 할 값이 없을 때 에러를  피하기 위해 .map 앞에 '?'를 추가
        <ReviewCard
          review={review}
          // review_id={review.review_id}
          // star={review.star}
          // description={review.description}
          // photo={review.photo}
          // photo2={review.photo2}
          // created_time={review.created_time}
          // updated_time={review.updated_time}
          // user_id={review.user_id}
          // store_name={review.store_name}
          // like_reviews={review.like_reviews}
          // dike_reviews={review.dike_reviews}
        />
      ))}
    </>
  )}

export default MyReview;