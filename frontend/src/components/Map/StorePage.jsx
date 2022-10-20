import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import * as Api from "../../utils/Api";

import ClickedStoreCard from './ClickedStoreCard';
import StoreReviews from "./StoreReviews";
import StoreReviewAddForm from "./StoreReviewAddForm";
import { useLocation } from "react-router-dom";


function StorePage ({
}) {
  const [currentUser, setCurrentUser] = useState(""); // 리뷰 수정 여부 체크 위한 현재 로그인 중인 유저 닉네임
  const [reviews, setReviews] = useState([]); // 해당 가게 전체 리뷰
  const [isAddable, setIsAddable] = useState(false); // 로그인 상태에서만 작성 가능해야 함
  const [isAdding, setIsAdding] = useState(false);
  
  const clickedStore = useLocation();
  const clickedStoreId = clickedStore.state.data.store_id; // 선택한 가게 store_id

  const getNickname = async () => {
    const resultNickname = await Api.get('user');
    setCurrentUser(resultNickname.data.nickname);
  };
  useEffect(() => {
    getNickname();
  }, []); // 현재 로그인 중인 유저 닉네임 받아오기

  function checkLogin () {
    if (currentUser != "")
      setIsAddable(true);
  };
  useEffect(() => {
    checkLogin();
  }, [currentUser]); // 로그인한 상태인지 아닌지 체크

  const getReviews = async () => {
    const resultReviews = await Api.get(`stores/${clickedStoreId}/reviews`);
    setReviews(resultReviews.data);
  };
  useEffect(() => {
    getReviews();
  }, []) // 해당 가게 전체 리뷰 불러오기

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>가게 정보</Card.Title>
        <ClickedStoreCard
          clickedStoreId={clickedStoreId}
        />
        <StoreReviews
          clickedStoreId={clickedStoreId}
          currentUser={currentUser}
          reviews={reviews}
          setReviews={setReviews}
        />
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
            clickedStoreId={clickedStoreId}
            setReviews={setReviews}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default StorePage;