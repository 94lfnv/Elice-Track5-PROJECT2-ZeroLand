// 특정 스토어 전체 리뷰
import React, { useState } from 'react';
import { Card, Button, Row, Col } from "react-bootstrap";

import StoreReviewCard from './StoreReviewCard';
import StoreReviewEditForm from './StoreReviewEditForm';

function StoreReviewList ({
    store_id,
}) {
    const [isEditing, setIsEditing] = useState(false); // 리뷰 편집 중인지 아닌지 체크
    const [isEditable, setIsEditable] = useState(true); // 임시
    return (
        <>
            {isEditing ? (
                <StoreReviewEditForm
                    setIsEditing={setIsEditing}
                />
            ) : (
                <Card className="mb-4">
                <Card.Body>
                    <Card.Title>리뷰 목록</Card.Title>
                    {/* 
                    <StoreReviewCard
                        currentReview={review}
                        isEditable={reviewOwnerId === 현재 로그인 중인 유저id}
                    />
                     리뷰 카드 쪽 연결 안 해서 임시 */}
                    <StoreReviewCard
                        // currentReview={review}
                        isEditable={setIsEditable}
                        setIsEditing={setIsEditing}
                    /> {/* 자리 배치, 편집폼 연결 보려고 임시 */}
                </Card.Body>
                </Card>
            )}
        </>
        );

}

export default StoreReviewList;
