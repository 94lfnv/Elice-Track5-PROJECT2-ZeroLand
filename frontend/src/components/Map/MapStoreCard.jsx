import React from "react"
import StarRate from "../Common/StarRate";
import { Link } from "react-router-dom";
import StoreLike from "./StoreLike";

function MapStoreCard({
    store_id,
    name,
    address_detail,
    description,
    star,
}) {

  return(
    <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-8">
                <div className="card-body">
                    <div className="row">
                        <Link state={{ data: {store_id}}} to={"/storepage"}>{name}</Link>
                        <h5 className="col text-secondary">{address_detail}</h5>
                        <div className="col"><StarRate star={star} /></div>
                        <StoreLike store_id={store_id} />
                    </div>
                    <p className="card-text text-secondary">{description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MapStoreCard;
