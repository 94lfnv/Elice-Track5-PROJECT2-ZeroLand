import React from "react"
import StarRate from "../Common/StarRate";
import { Link } from "react-router-dom";
import StoreLike from "./StoreLike";
import * as MSC from "../StyledComponents/MapCardStyled"

function MapStoreCard({
    store_id,
    name,
    address_detail,
    description,
    star,
}) {

  return(
    <MSC.CardBox>
        <MSC.InnerBox>
                <MSC.StoreName>
                    <Link state={{ data: {store_id}}} to={"/storepage"}>{name}</Link>
                </MSC.StoreName>
                <MSC.StoreAdress>{address_detail}</MSC.StoreAdress>
                <MSC.StarBox>🌟: {star}</MSC.StarBox>
                <MSC.LikeIcon className="like"><StoreLike store_id={store_id} /></MSC.LikeIcon>
                    <MSC.StoreInfoBox>{description}</MSC.StoreInfoBox> 
        </MSC.InnerBox> 
    </MSC.CardBox>
  )
}

export default MapStoreCard;
