import React, { useState } from "react"
import StarRate from "./StarRate.jsx"

function StoreCard({
    name,
    address_detail,
    star,
    description, // StoreList에서 넘겨준 거 다 들고 와야 함
}) {
  return(
    <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-8">
                <div className="card-body">
                    <div className="row">
                        <h4 className="col card-title text-dark"><a href="/storepage">{name}</a></h4>
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

export default StoreCard;
