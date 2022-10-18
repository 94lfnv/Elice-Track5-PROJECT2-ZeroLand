// 특정 스토어 전체 리뷰
import React, { useState } from 'react';
import { Card, Button, Row, Col } from "react-bootstrap";

import StoreReviewCard from './StoreReviewCard';
import StoreReviewEditForm from './StoreReviewEditForm';

import { testReviewData } from "./testData";

function StoreReviews ({
    store_id,
}) {
    const [isEditing, setIsEditing] = useState(false); // 리뷰 편집 중인지 아닌지 체크
    const [isEditable, setIsEditable] = useState(true); // 임시
    const [reviews, setReviews] = useState([]);
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
                    {reviews.map((review) => (
                        <StoreReviewCard
                        review_id={testReviewData.review_id}
                        star={testReviewData.star}
                        description={testReviewData.description}
                        // currentReview={review}
                        isEditable={setIsEditable}
                        setIsEditing={setIsEditing}
                    /> 이런 식으로
                    ))} */}
                    <StoreReviewCard
                        review_id={testReviewData.review_id}
                        star={testReviewData.star}
                        description={testReviewData.description}
                        // currentReview={review}
                        isEditable={setIsEditable}
                        setIsEditing={setIsEditing}
                    /> {/* 임시 */}
                </Card.Body>
                </Card>
            )}
        </>
        );

}

export default StoreReviews;
