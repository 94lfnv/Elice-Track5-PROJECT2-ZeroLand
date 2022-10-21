import React from "react"
import * as SC from "../StyledComponents/StoreCardStyled";

function StoreCard({...props}) {
    const {favStore}= props
    console.log(favStore.avg_star)

  return(
    <>
        <SC.CardBox>
            <SC.InnerBox>
                    <SC.StoreName>
                        {"name" in favStore ? favStore.name : "매장 명"}
                        </SC.StoreName>
                        <SC.StoreAdress>
                        {"address_detail" in favStore ? favStore.address_detail : "상세 주소"}
                        </SC.StoreAdress>
                        <SC.StarBox>
                            🌟: {favStore.avg_star}
                        </SC.StarBox>
                    <SC.StoreInfoBox>
                    {"description" in favStore ? favStore.description : "설명"}
                    </SC.StoreInfoBox>
                </SC.InnerBox>
        </SC.CardBox>
    </>
  )
}

export default StoreCard;
