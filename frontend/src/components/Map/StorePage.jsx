import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Card, Row, Col } from "react-bootstrap";

import * as Api from "../../utils/Api";

import ClickedStoreCard from './ClickedStoreCard';
import StoreReviews from "./StoreReviews";
import StoreReviewAddForm from './StoreReviewAddForm';
import StoreCard from "../Common/StoreCard";

import { testStoreData1 } from "./testData";


function StorePage ({
  store_id,
  name,
  address_detail,
  star,
  description,
}) {
  const [reviewOwner, setReviewOwner] = useState(null); // 리뷰 수정 여부 파악하기 위한 리뷰 오너 아이디
  const [reviews, setReviews] = useState([]);
  const [isAddable, setIsAddable] = useState(true); // 로그인 상태에서만 작성 가능 (원래 기본은 false / 지금은 테스트용)
  const [isAdding, setIsAdding] = useState(false);

  const getReviews = async () => {
    const resultReviews = await Api.get(`stores/{store_id}/reviews`);
    setReviews(resultReviews.data);
  };

  useEffect(() => {
    getReviews();
  }, [store_id]);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>가게 정보</Card.Title>
        <StoreReviews 
        /> {/* 임시 */}
        {reviews.map((review) => (
          <StoreReviewCard
            review={review}
            setReviews={setReviews}
            reviewOwner={reviewOwner}
            // isEditable={reviewOwner === currentUser} 리뷰오너(닉네임) === 현재 접속 유저(닉네임) 동일하면 true
          />
        ))}
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