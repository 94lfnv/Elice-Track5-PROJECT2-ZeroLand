import React, {useState} from "react"
import StarRate from "./StarRate.jsx"

function StoreCard() {

  return(
    <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-4">
                {/* <img src="..." class="img-fluid rounded-start" alt="..."> */}
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <div className="row">
                        <h4 className="col card-title text-dark">매장 명</h4>
                        <h5 className="col text-secondary">매장 주소</h5>
                        <div className="col text-secondary">🧡x6</div>
                        <div className="col"><StarRate /></div>
                    </div>
                    <p className="card-text text-secondary">매장 정보 This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StoreCard;
