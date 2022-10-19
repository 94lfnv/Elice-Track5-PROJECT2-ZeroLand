import React from "react"
import StarRate from "./StarRate.jsx"
import { Link } from "react-router-dom";

function StoreCard({
    store_id,
    name,
    address_detail,
    description, // StoreList에서 넘겨준 거 다 들고 와야 함
    star_avg
}) {

  return(
    <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-8">
                <div className="card-body">
                    <div className="row">
                        <Link state={{ data: {store_id}}} to={"/storepage"}>{name}</Link>
                        <h5 className="col text-secondary">{address_detail}</h5>
                        {/* <div className="col"><StarRate star={star} /></div> */}
                    </div>
                    <p className="card-text text-secondary">{description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StoreCard;
