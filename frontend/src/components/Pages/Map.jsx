import React, { useState, useCallback } from "react"

import Location from "../Map/Location";
import StoreList from "../Map/StoreList";

function Map() {
  return (
    <article id="main">
      <section class="wrapper style5">
        <div class="inner">
          <div>
          <h3>내 주변의 제로웨이스트샵</h3>
            <Location /> {/* 카카오맵 api */}
            <StoreList /> {/* 지도 상에 표시된 가게들 카드 리스트 */}
          </div>
        </div>
      </section>
    </article>
  );
}

export default Map;