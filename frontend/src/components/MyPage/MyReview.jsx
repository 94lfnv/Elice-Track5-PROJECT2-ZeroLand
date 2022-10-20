import React, { useEffect, useState, useContext } from "react";
import ReviewCard from "../Common/ReviewCard.jsx";
import * as Api from "../../utils/Api";
import { MyPageContext } from "../Pages/Mypage.jsx";
import Pagination from "./Pagination.jsx"


function MyReview( ) {

  // 이거 뭐지...
  // const { setReviews, reviews } = useContext(MyPageContext);
  const { reviews, setReviews } = useContext(MyPageContext);
  // 페이지네이션 코드
  const limit= 4;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
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
    console.log(response)
    setReviews(response.data);
  };  // GET 요청 함수화

  useEffect(()=>{  //무한루프 실행을 피하기 위해 useEffect를 이용. server의 값을 받아옴.
    fetchData(); // <- 위에서 작성한 fetchData 사용
  }, []); 

  return(
    <>
      <h2 className="text-dark">My Review</h2>
      <br />
      {reviews?.slice(offset, offset + limit).map((review) =>( // map 할 값이 없을 때 에러를  피하기 위해 .map 앞에 '?'를 추가
        <ReviewCard
          review={review}

        />
      ))}
      <footer>
          <Pagination
            total={reviews.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </footer>
    </>
  )}

export default MyReview;