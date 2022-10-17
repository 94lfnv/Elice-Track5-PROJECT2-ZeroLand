import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from "react-bootstrap";

import * as Api from "../../utils/Api";

import StoreCard from '../Common/StoreCard';
import StoreReviewList from './StoreReviewList';
import StoreReviewAddForm from './StoreReviewAddForm';

function StorePage ({ store_id }) {
    const [reviewOwner, setReviewOwner] = useState(null); // 리뷰 수정 여부 파악하려고 리뷰 오너 아이디
    const [reviews, setReviews] = useState([]);
    const [isAddable, setIsAddable] = useState(true); // 로그인 상태에서만 작성 가능 (그때만 true / 지금은 테스트용)
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
        <StoreCard />
        <StoreReviewList /> {/* 임시 */}
        {/* {reviews.map((review) => (
          <StoreReviewList
            review={review}
            setReviews={setReviews}
            reviewOwner={reviewOwner}
            isEditable={isEditable}
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

//      <>
//        <StoreReviewList
//          currentStore={store_Id}
//          isEditable={isEditable} // 
//          isAddable={true} // 원래 기본 상태 isAddable={isAddable} 인데 테스트용으로 보이게 함
//          setReview={setReview}
//          store_Id={store_Id}
//        />
//      </>
  );
}

export default StorePage;