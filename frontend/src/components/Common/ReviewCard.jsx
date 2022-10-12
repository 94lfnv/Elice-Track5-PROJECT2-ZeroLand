import React, {useState} from "react"
import StarRate from "./StarRate.jsx"

function ReviewCard() {

  return(
    <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-4">
                {/* <img src="..." class="img-fluid rounded-start" alt="..."> */}
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <div className="row">
                        <h4 className="col card-title text-secondary">매장 명</h4>
                        <div className="col"><StarRate /></div>
                        <p className="card-text col"><small className="text-muted text-secondary">2022. 10. 22.</small></p>
                    </div>
                    <p className="card-text text-secondary">리뷰 내용 This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReviewCard;
