import React, { useState } from 'react';
import { Card, Row, Col } from "react-bootstrap";

import StoreCard from '../Common/StoreCard';
import StoreReviewAddForm from './StoreReviewAddForm';
import StoreReviewList from './StoreReviewList';

function StorePage ({ store_Id }) {
    const [isAddable, setIsAddable] = useState(true); // 로그인 상태에 따라 true/false (지금은 테스트한다고 true)
    const [isAdding, setIsAdding] = useState(false); // 로그인한 상태에만 true

    return (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>가게 정보</Card.Title>
              <StoreCard />
              <StoreReviewList /> {/* 스토어 아이디로 작성된 전체 리뷰 불러오기 */}
            {isAddable && (
              <Row className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <button onClick={() => setIsAdding(true)}>
                    리뷰 작성
                  </button>
                </Col>
              </Row>
            )}
            {isAdding && (
              <StoreReviewAddForm // 리뷰 작성 폼
                setIsAdding={setIsAdding}
              />
            )}
          </Card.Body>
        </Card>
      );
    
}

export default StorePage;