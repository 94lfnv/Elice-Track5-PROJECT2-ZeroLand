import React, { useState } from 'react';
import { Card, Row, Col } from "react-bootstrap";

import StoreCard from '../Common/StoreCard';
import ReviewCard from '../Common/ReviewCard';
import ReviewAddForm from './ReviewAddForm';

function StorePage ({}) {
    const [isEditable, setIsEditable] = useState(true); // 로그인 상태에 따라 true/false (지금은 체크한다고 true)
    const [isAdding, setIsAdding] = useState(false);

    return (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>가게 정보</Card.Title>
              <StoreCard
                isEditable={isEditable}
              />
              <ReviewCard /> {/* 스토어 아이디로 작성된 전체 리뷰 불러오기 */}
            {isEditable && (
              <Row className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <button onClick={() => setIsAdding(true)}>
                    리뷰 작성
                  </button>
                </Col>
              </Row>
            )}
            {isAdding && (
              <ReviewAddForm // 폼으로 리뷰 작성하는 거
                setIsAdding={setIsAdding}
              />
            )}
          </Card.Body>
        </Card>
      );
    
}

export default StorePage;