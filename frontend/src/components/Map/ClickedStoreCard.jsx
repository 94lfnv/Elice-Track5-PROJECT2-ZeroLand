import React, {useState} from "react"
import StarRate from "../Common/StarRate";

const testStoreData = {
    "store_id": 1,
    "name": "ㅇㅇ샵",
    "address_detail":"서울시 강남구 아차산로17길 48",
    "description": "서울시 ~",
    "star_avg": 3.75
};

function ClickedStoreCard({
    store_id, // 클릭된 가게 id로 정보 get
}) {
  return(
    <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-8">
                <div className="card-body">
                    <div className="row">
                        <h4 className="col card-title text-dark">{testStoreData.name}</h4>
                        <h5 className="col text-secondary">{testStoreData.address_detail}</h5>
                        <div className="col"><StarRate /></div>
                    </div>
                    <p className="card-text text-secondary">{testStoreData.description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ClickedStoreCard;
