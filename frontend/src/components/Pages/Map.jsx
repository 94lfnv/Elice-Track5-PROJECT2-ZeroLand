import React, { useState, useContext, useEffect } from "react"

import Location from "../Map/Location";
import StoreList from "../Map/StoreList";

function Map() {
  // useState 훅을 사용해서 reviewOwner 상태를 생성해야 함
  const [reviewOwner, setReviewOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  // const userState = useContext(UserStateContext); 전역변수
  // userState.유저id < 지금 로그인 중인 유저id (이걸 변수로 만들어두는 게 편한가??)

  return (
    <article id="main">
      <section className="wrapper style5">
        <div className="inner">
          <div>
          <h3>내 주변의 제로웨이스트샵</h3>
            <Location /> {/* 카카오맵 api */}
            <StoreList 
              // userState.유저id < 현재 로그인 중인 유저 아이디, 이걸 넘겨줘야 리뷰 카드에서 수정가능 여부 확인할 수 있음
              // 지도 상에 표시된 가게들 store_id 넘겨줘야 함
            /> {/* 지도 상에 표시된 가게들 카드 리스트 */}
          </div>
        </div>
      </section>
    </article>
  );
}

export default Map;