import React, {useState} from "react"
import StarRate from "./StarRate.jsx"

const testStoreData = {
    "store_id": 1,
    "name": "ㅇㅇ샵",
    "address_detail":"서울시 강남구 아차산로17길 48",
    "description": "서울시 ~",
    "star_avg": 3.75
};

function StoreCard({
    currentReview,
    isEditable,
    setIsEditing,
    setReview,
    store_Id,
}) {
  return(
    <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-4">
                {/* <img src="..." class="img-fluid rounded-start" alt="..."> */}
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <div className="row">
                        <h4 className="col card-title text-dark"><a href="/storepage">{testStoreData.name}</a></h4>
                        <h5 className="col text-secondary">{testStoreData.address_detail}</h5>
                        <div className="col"><StarRate /></div>
                    </div>
                    <p className="card-text text-secondary">{testStoreData.description}</p>
                </div>
            </div>
            {isEditable}
        </div>
    </div>
  )
}

export default StoreCard;
