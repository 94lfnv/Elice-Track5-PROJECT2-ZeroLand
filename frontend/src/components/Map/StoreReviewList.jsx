// 특정 스토어 전체 리뷰
import React, { useState } from 'react';
import { Card, Button, Row, Col } from "react-bootstrap";

import StoreReviewAddForm from './StoreReviewAddForm';
import StoreReviewCard from './StoreReviewCard';

function StoreReviewList ({
    store_id,
    isEditable, // 로그인 상태일 때 & 본인이 작성한 리뷰 카드에서만 isEditable = true이여야 함 < 이 로직 짜야 함
    isAddable, // 로그인 한 상태일 때만 리뷰 작성 가능
}) {
    const [star, setStar] = useState([]);
    const [description, setDescription] = useState([]);
    const [isAdding, setIsAdding] = useState(false); // 기본 상태는 false인데 테스트 용으로 보려고 true로 설정해둠

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>리뷰 목록</Card.Title>
                {/* {reviews.map((review) => (
                <StoreReviewCard
                    review={review}
                    setStar={setStar}
                    setDescription={setDescription}
                    user_id={user_id}
                    isEditable={isEditable}
                />
                ))} 리뷰 카드 쪽 연결 안 해서 임시 */}
                <Card>
                    <span style={{color: "black"}}>리뷰 작성자 {/* {review_id} */}</span>
                    <br />
                    <span style={{color: "black"}}>별점 currentReview.star (잘 모르겠음...)</span>
                    <br />
                    <span style={{color: "black"}}>리뷰 내용 (currentReview.description?)</span>
                </Card> {/* 자리 배치 보려고 임시로 카드 내용만 */}
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
                    setStar={setStar}
                    setDescription={setDescription}
                    setIsAdding={setIsAdding}
                />
                )}
            </Card.Body>
            </Card>
        );

}

export default StoreReviewList;
