// 특정 스토어 전체 리뷰
import React, { useState } from 'react';
import { Card, Button, Row, Col } from "react-bootstrap";

import StoreReviewCard from './StoreReviewCard';
import StoreReviewEditForm from './StoreReviewEditForm';

function StoreReviewList ({
    store_id,
    // isEditable, 로그인 상태일 때 & 본인이 작성한 리뷰 카드에서만 isEditable = true이여야 함 < 이 로직 짜야 함
}) {
    const [isEditing, setIsEditing] = useState(false);
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
                        review={review}
                        setStar={setStar}
                        setDescription={setDescription}
                        user_id={user_id}
                        isEditable={isEditable}
                    />
                     리뷰 카드 쪽 연결 안 해서 임시 */}
                    <StoreReviewCard
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
