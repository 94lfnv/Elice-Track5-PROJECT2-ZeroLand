// 지도 페이지 - 스토어 리뷰 카드
import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import StarRate from "../Common/StarRate";
import * as Api from "../../utils/Api";

const testReviewData = {
    "review_id": 11,
    "star": "3",
    "description": "이거 샀는데 짱임"
};

function StoreReviewCard({
    currentReview, // 현재 리뷰 카드 (review_id...?)
    isEditable,
    setIsEditing,
}) {
  {/* const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  } */} // 삭제함수 만들기
    
  return (
    <Row className="mb-4">
      <Col>
        <Card.Text>
          <span className="text-muted">작성자 (닉네임) 스키마에 닉네임 들어가야 하나?</span>
          <br />
          <span className="text-muted">별점 testReviewData.star 이 값을 StarRate에 넣어줘야 함 <StarRate /></span>
          <br />
          <span className="text-muted">{testReviewData.description}</span> {/* 리뷰내용 */}
        </Card.Text>
      </Col>
      {isEditable && (
        <>
          <Col xs="auto">
            <button onClick={() => setIsEditing(true)} size="sm">
              편집
            </button>
          </Col>
          <Col xs="auto">
            <button size="sm">
              삭제
            </button>
          </Col>
        </>
      )}
    </Row>
  );
}

export default StoreReviewCard;
