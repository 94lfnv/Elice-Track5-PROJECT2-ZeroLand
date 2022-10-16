// 지도 상에 표시된 전체 가게 리스트 불러와야 함 < 이것도... get 요청으로?
import React from "react";

import StoreCard from "../Common/StoreCard";

function StoreList() {
  return (
    <div className="inner">
        <StoreCard /> {/* 가게 카드에서 특정 부분 (가게 이름?) 클릭하면 해당 가게 상세 페이지 (StorePage) 로 */}
        <a href="/storepage">엘리스 스테이션</a>
    </div>
  );
}

export default StoreList;