// 지도 페이지 - 스토어 리뷰 카드
import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

function StoreReviewCard({
    currentReview, // 현재 리뷰 카드 (review_id...?)
    isEditable,
    setIsEditing,
}) {
    
  return (
    <Card>
        리뷰 작성자 {/* {review_id} */}
        <br />
        <span>별점 currentReview.star (잘 모르겠음...)</span>
        <br />
        <span>리뷰 내용 (currentReview.description?)</span>
            <button>
                편집 
            </button>
            <button>
                삭제
            </button>
    </Card>
  );
}

export default StoreReviewCard;
