import React, { useState, useEffect } from "react";
import * as Api from "../../utils/Api";

import Location from "../Map/Location";
import StoreList from "../Map/StoreList";

function Map() {
  const [stores, setStores] = useState([]);

  const getStores = async () => {
    const resultStores = await Api.get('store');
    setStores(resultStores.data);
  };

  useEffect(() => {
    getStores();
  }, []); // 전체 가게 리스트 불러오기
  const countstore = stores.length

  return (
    <article id="main">
      <section className="wrapper style5" style={{backgroundColor: "#e7e8db"}}>
        <div className="inner">
          <div>
          <h3>내 주변의 제로웨이스트샵</h3>
          <Location
                stores={stores}
                counts={countstore}
              />
            {stores.map((stores) => (
              <StoreList
                store_id={stores.store_id}
                name={stores.name}
                address_detail={stores.address_detail}
                description={stores.description}
                star={stores.avg_star}
              />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

export default Map;