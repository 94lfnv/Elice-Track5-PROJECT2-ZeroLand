import React from "react"

import Location from "../Map/Location";
import StoreInfo from "../Map/StoreInfo";

function Map() {
  return (
    <article id="main">
      <section class="wrapper style5">
        <div class="inner">
          <div>
          <h3>내 주변의 제로웨이스트샵</h3>
            <Location />
            <StoreInfo />
          </div>
        </div>
      </section>
    </article>
  );
}

export default Map;