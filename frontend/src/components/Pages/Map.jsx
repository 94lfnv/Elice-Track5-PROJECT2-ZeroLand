import React, { useState, useContext, useEffect } from "react"

import Location from "../Map/Location";
import StoreList from "../Map/StoreList";

function Map() {
  return (
    <article id="main">
      <section className="wrapper style5">
        <div className="inner">
          <div>
          <h3>내 주변의 제로웨이스트샵</h3>
            <Location /> {/* 카카오맵 api */}
            <StoreList /> {/* 가게 리스트 */}
          </div>
        </div>
      </section>
    </article>
  );
}

export default Map;