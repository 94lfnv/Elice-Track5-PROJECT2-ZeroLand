// 지도 상에 표시된 전체 가게 리스트 불러와야 함 < 이것도... get 요청으로?
import React, { useState, useEffect } from "react";
import * as Api from "../../utils/Api";
import StoreCard from "../Common/StoreCard";

import { testStoreData1 } from "./testData";

function StoreList({

}) {
  const [stores, setStores] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  
  const getStores = async () => {
    const resultStores = await Api.get(`store`);
    setStores(resultStores.data);
  };

  useEffect(() => {
    getStores();
  }, []); // 전체 가게 리스트

  // const loginUser = async () => {
  //   const userNickname = await Api.get(`user`, "nickname");
  //   setCurrentUser(userNickname.data);
  // };

  // useEffect(() => {
  //   loginUser();
  // }, []);
    

  return (
    <div className="inner">
      {/* {stores.map((store) => (
        <StoreCard
          key={store.storeId}
          store={store}
          setStores={setStores}
        />
      ))

      } */}
      <StoreCard
        name={testStoreData1.name}
        address_detail={testStoreData1.address_detail}
        star={testStoreData1.star_avg}
        description={testStoreData1.description}
      /> {/* 임시 */}
    </div>
  );
}

export default StoreList;