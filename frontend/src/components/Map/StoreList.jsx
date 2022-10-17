// 지도 상에 표시된 전체 가게 리스트 불러와야 함 < 이것도... get 요청으로?
import React, { useState, useEffect } from "react";
import * as Api from "../../utils/Api";
import StoreCard from "../Common/StoreCard";

function StoreList({
  store_id,
}) {
  const [reviews, setReviews] = useState([]);

  {/* useEffect(() => {
    Api.get(`stores/{store_id}/reviews`).then((res) => { // store_id 필요함
      setReviews(res.data)
    });
  }, []); */}

  return (
    <div className="inner">
      {/* {reviews.map((review) => (
        <StoreCard
        // store_id = {store_id}
        // 가게 카드에서 특정 부분 (가게 이름?) 클릭하면 해당 가게 상세 페이지 (StorePage) 로  이동
        />
      ))} */}
      <StoreCard /> {/* 임시 */}
    </div>
  );
}

export default StoreList;