// 특정 스토어 전체 리뷰
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../utils/Api";
import StoreReviewCard from './StoreReviewCard';
import StoreReviewEditForm from './StoreReviewEditForm';

function StoreReviews ({
    clickedStoreId,
    currentUser,
    reviews,
    setReviews,
}) {
    const [isEditing, setIsEditing] = useState(false); // 리뷰 편집 중인지 아닌지 체크
    const [editReviewId, setEditReviewId] = useState(-1);

    const handleClickEditButton = (reviewId) => {
        setIsEditing(true);
        setEditReviewId(reviewId);
    }
    
    return (
        <>
            {isEditing ? (
                <StoreReviewEditForm
                    setIsEditing={setIsEditing}
                    reviewId={editReviewId}
                    clickedStoreId={clickedStoreId}
                    setReviews={setReviews}
                    currentUser={currentUser}
                    reviews={reviews}
                />
            ) : (
                <Card className="mb-4">
                <Card.Body>
                    <Card.Title>리뷰 목록</Card.Title>
                    {reviews.map((reviews) => (
                        <StoreReviewCard 
                            currentReview={reviews}    
                            clickedStoreId={clickedStoreId}
                            currentUser={currentUser}
                            isEditable={currentUser===reviews.nickname}
                            setIsEditing={setIsEditing}
                            onClickEditButton={handleClickEditButton}
                            setReviews={setReviews}
                        />
                    ))}
                </Card.Body>
                </Card>
            )}
        </>
        );

}

export default StoreReviews;
