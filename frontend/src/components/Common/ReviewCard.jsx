import React, {useState} from "react"
import StarRate from "./StarRate.jsx"

function ReviewCard( review_id, star, description, photo, created_time, updated_time, user_id, store_id, like_reviews) {

  return(
    <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-4">
                {/* <img src="..." class="img-fluid rounded-start" alt="..."> */}
                {photo}
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <div className="row">
                        <h4 className="col card-title text-secondary">매장 명</h4>
                        <div className="col" star={star}><StarRate /></div>
                        <p className="card-text col"><small className="text-muted text-secondary">{created_time}</small></p>
                    </div>
                    <div className="row">
                        <p className="col card-text text-secondary">내용{description}</p>
                        <div className="col text-secondary">🧡x{like_reviews}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReviewCard;
