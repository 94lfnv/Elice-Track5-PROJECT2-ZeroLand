import React, { useEffect, useState, useContext } from "react";
import ReviewCard from "../Common/ReviewCard.jsx";
import * as Api from "../../utils/Api";
import { MyPageContext } from "../Pages/Mypage.jsx";
import Pagination from "./Pagination.jsx"
import * as SC from "../StyledComponents/StoreCardStyled"


function MyReview( ) {

  const [reviews, setReviews] = useState([]);
  // 페이지네이션 코드
  const limit= 3;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;


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
    <SC.FavCardBox>
      <h2>MY REVIEW</h2>
      <br />
      {reviews?.slice(offset, offset + limit).map((review, index) =>( // map 할 값이 없을 때 에러를  피하기 위해 .map 앞에 '?'를 추가
        <ReviewCard
          key={index.toString()}
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
      </SC.FavCardBox>
    </>
  )}

export default MyReview;