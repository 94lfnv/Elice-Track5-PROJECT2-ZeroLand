import React, { useState } from "react"
import StarRate from "./StarRate.jsx"

// useState로 h4 태그에서 나오는 이름이 다르게

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
                        <h4 className="col card-title text-secondary">유저 닉네임(지도 탭에서)/가게 이름(마이페이지에서)</h4>
                        <div className="col"><StarRate /></div>
                        <p className="card-text col"><small className="text-muted text-secondary">작성 날짜</small></p>
                    </div>
                    <p className="card-text text-secondary">리뷰 내용</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReviewCard;
