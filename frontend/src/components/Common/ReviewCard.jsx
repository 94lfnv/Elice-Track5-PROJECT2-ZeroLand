import React from "react"
import StarRate from "./StarRate.jsx"

function ReviewCard({...props}) {
    const {review}= props  //
    console.log(review.star)
  return(
    <div className="card mb-3">
        <div className="row g-0">
            <div className="col-md-4">
                {/* <img src="..." class="img-fluid rounded-start" alt="..."> */}
                {"photo" in review ? review.photo : "사진"}
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <img className="ratio ratio-1x1" />
                    <div className="row">
                        <div className="row">
                            <h4 className="col card-title text-secondary">
                                {"store_name" in review ? review.store_name : "매장이름"}
                            </h4>
                            <div className="col text-dark">
                                🌟: {"star" in review ? review.star : 0}
                            </div>
                            <div className="col text-dark">🧡x
                            {"like_reviews" in review ? review.like_reviews.length : 0}
                            </div>
                        </div>
                        <p className="card-text col"><small className="text-muted text-secondary">
                        {"created_time" in review ? review.created_time : ""}</small></p>
                    </div>
                    <div className="row">
                        <p className="col card-text text-secondary">
                        {"description" in review ? review.description : ""}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReviewCard;
