import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from "react-bootstrap";

import * as Api from "../../utils/Api";

import ClickedStoreCard from './ClickedStoreCard';
import StoreReviewList from './StoreReviewList';
import StoreReviewAddForm from './StoreReviewAddForm';

function StorePage ({ store_id }) {
    const [reviewOwner, setReviewOwner] = useState(null); // 리뷰 수정 여부 파악하기 위한 리뷰 오너 아이디
    const [reviews, setReviews] = useState([]);
    const [isAddable, setIsAddable] = useState(true); // 로그인 상태에서만 작성 가능 (원래 기본은 false / 지금은 테스트용)
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
      Api.get(`stores/{store_id}/reviews`).then((res) => 
        setReviews(res.data)
      );
    }, [store_id]);

    return (
      <Card className="mb-4">
      <Card.Body>
        <Card.Title>가게 정보</Card.Title>
        <ClickedStoreCard />
        <StoreReviewList /> {/* 임시 */}
        {/* {reviews.map((review) => (
          <StoreReviewList
            review={review}
            setReviews={setReviews}
            reviewOwner={reviewOwner}
          />
        ))} */}
        {isAddable && (
          <Row className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <button onClick={() => setIsAdding(true)}>
                리뷰 작성하기
              </button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <StoreReviewAddForm
            reviewOwner={reviewOwner}
            setReviews={setReviews}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default StorePage;