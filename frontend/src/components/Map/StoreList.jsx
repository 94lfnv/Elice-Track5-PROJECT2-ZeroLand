import React from "react";

import MapStoreCard from "./MapStoreCard";

function StoreList({
  store_id,
  name,
  address_detail,
  description,
}) {

  return (
    <div className="inner">
        <MapStoreCard
          store_id={store_id}
          name={name}
          address_detail={address_detail}
          description={description}
        />
    </div>
  );
}

export default StoreList;