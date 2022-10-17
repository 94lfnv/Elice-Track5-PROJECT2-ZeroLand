import React, {useState} from "react"
import StarRate from "./StarRate.jsx"

function StoreCard(name, description, star_avg) {

  return(
    <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-4">
                {/* <img src="..." class="img-fluid rounded-start" alt="..."> */}
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <div className="row">
                        <h4 className="col card-title text-dark">{name}</h4>
                        {/* <h5 className="col text-secondary">{address_detail}</h5> */}
                        <div className="col text-secondary">🧡x6</div>
                        <div className="col"><StarRate star={star_avg} /></div>
                    </div>
                    <h5 className="col text-secondary">{description}</h5>
                    {/* <p className="card-text text-secondary">
                    url:{url}
                    </p>
                    <p className="card-text text-secondary">
                    phone:{phone}
                    </p> */}
                    {/* <p className="card-text text-secondary">
                    operating time: {open_time} - {close_time}
                    </p> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default StoreCard;
