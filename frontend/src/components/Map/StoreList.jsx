import React from "react";

import StoreCard from "../Common/StoreCard";

function StoreList() {
  return (
    <div class="inner">
        <StoreCard /> {/* 가게 카드에서 특정 부분 (가게 이름?) 클릭하면 해당 가게 상세 페이지 (StorePage) 로 */}
    </div>
  );
}

export default StoreList;