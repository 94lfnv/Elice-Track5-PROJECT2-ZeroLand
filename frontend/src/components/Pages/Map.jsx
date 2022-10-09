import React, { useEfeect } from "react"
import Location from "../Map/Location";

function Map() {
  return (
    <article id="main">
      {/* <header>
        <h2>당신 주변의 제로웨이스트샵</h2>
      </header> */}
      <section class="wrapper style5">
        <div class="inner">
          <div>
            <h3>내 주변의 제로웨이스트샵</h3>
            <Location />
            {/* 새 컴포넌트 (스토어 목록 컴포넌트 자리)*/}
            <p>새 컴포넌트 (스토어 목록) 자리 (지도 오른쪽으로 붙게... 하기...)</p>
          </div>
        </div>
      </section>
    </article>
  );
}

export default Map;