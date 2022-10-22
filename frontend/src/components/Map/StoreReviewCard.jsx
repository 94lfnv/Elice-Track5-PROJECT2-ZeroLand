// 지도 페이지 - 스토어 리뷰 카드
import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import * as Api from "../../utils/Api";
import ReviewLike from "./ReviewLike";

import swal from "sweetalert";

function StoreReviewCard({
  currentReview,
  clickedStoreId,
  currentUser,
  isEditable,
  setIsEditing,
  setReviews,
  onClickEditButton,
}) {

  const handleDelete = async (e) => { // 삭제함수
    e.preventDefault();
    e.stopPropagation();

    try {
      swal({
        title: "리뷰를 삭제하시겠습니까?",
        text: "한 번 삭제된 리뷰는 복구할 수 없습니다.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await Api.delete(`stores/${clickedStoreId}/${currentReview.review_id}`);
          const res = await Api.get(`stores/${clickedStoreId}/reviews`);
          setReviews(res.data);
          swal("삭제 완료", "리뷰가 삭제되었습니다.", "success");
        } else {
          swal("삭제 취소", "리뷰가 삭제되지 않았습니다.", "info");
        }
      });
    } catch (err) {
      alert("오류가 발생했습니다.", err);
    }
  };
    
  return (
    <Row className="mb-4">
      <Col>
        <Card.Text>
          <span className="text-muted">{currentReview.nickname}</span>
          <br />
          <span className="text-muted">🌟: {currentReview.star}</span>
          <br />
          <span className="text-muted">{currentReview.description}</span>
        </Card.Text>
      </Col>
      <Col xs="auto">
        <ReviewLike 
          clickedStoreId={clickedStoreId}
          reviewId={currentReview.review_id}
        />
      </Col>
      {isEditable && (
        <>
          <Col xs="auto">
            <button onClick={() => onClickEditButton(currentReview.review_id)} size="sm">
              편집
            </button>
          </Col>
          <Col xs="auto">
            <button onClick={handleDelete} size="sm">
              삭제
            </button>
          </Col>
        </>
      )}
    </Row>
  );
}

export default StoreReviewCard;
