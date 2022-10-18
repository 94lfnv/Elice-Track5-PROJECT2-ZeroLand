import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Api from "../../utils/Api";

import StoreCard from "../Common/StoreCard";

function StoreList() {
  const [stores, setStores] = useState([]);

  const getStores = async () => {
    const resultStores = await Api.get('store');
    setStores(resultStores.data);
  };

  useEffect(() => {
    getStores();
  }, []); // 전체 가게 리스트 불러오기

  return (
    <div className="inner">
      {stores.map((stores) => (
        <StoreCard
          store_id={stores.store_id}
          name={stores.name}
          address_detail={stores.address_detail}
          description={stores.description}
        />
      ))}
    </div>
  );
}

export default StoreList;