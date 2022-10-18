import React, {useState} from "react"
import StarRate from "../Common/StarRate";

function ClickedStoreCard({
    name,
    address_detail,
    star,
    description, // 클릭된 가게 id로 정보 get
}) {
  return(
    <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-8">
                <div className="card-body">
                    <div className="row">
                        <h4 className="col card-title text-dark">{name}</h4>
                        <h5 className="col text-secondary">{address_detail}</h5>
                        <div className="col"><StarRate star={star} /></div>
                    </div>
                    <p className="card-text text-secondary">{description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ClickedStoreCard;
