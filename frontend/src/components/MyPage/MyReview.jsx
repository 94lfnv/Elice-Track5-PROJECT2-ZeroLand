import React, { useEffect, useState } from "react";
import ReviewCard from "../Common/ReviewCard.jsx";


function MyReview( ) {

  // 실험 코드
  // const review=[{
  //   review_id: 1,
  //   star: 4.8,
  //   description: "대구시 달서구",
  //   photo: null,
  //   created_time:'2022.10.15',
  //   updated_time:'2022.10.16',
  //   user_id: 'kyuzii',
  //   store_id: '두남자찜닭',
  //   like_reviews: 6
  // }]


  const [review,setReview] = useState(null);

  const fetchData = async () =>{  
    const response = await axios.get('/user/reviewList');
    setReview(response.data);
  };  // GET 요청 함수화

  useEffect(()=>{  //무한루프 실행을 피하기 위해 useEffect를 이용. server의 값을 받아옴.
    fetchData(); // <- 위에서 작성한 fetchData 사용
  }, []); 

  return(
    <>
      {review?.map((review) =>( // map 할 값이 없을 때 에러를  피하기 위해 .map 앞에 '?'를 추가
        <ReviewCard
          review_id={review.review_id}
          star={review.star}
          description={review.description}
          photo={review.photo}
          created_time={review.created_time}
          updated_time={review.updated_time}
          user_id={review.user_id}
          store_id={review.store_id}
          like_reviews={review.like_reviews}
        />
      ))}
    </>
  )}

export default MyReview;