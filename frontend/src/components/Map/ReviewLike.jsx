import React, { useState } from "react";
import { Col } from "react-bootstrap";
import * as Api from "../../utils/Api";

function ReviewLike ({
    clickedStoreId,
    reviewId,
}) {
    const [reviewLike, setReviewLike] = useState(false);
    const [reviewDislike, setReviewDislike] = useState(false);

    const handleReviewLike = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await Api.post(`stores/${clickedStoreId}/${reviewId}/like`);
        setReviewLike(true);
    };

    const handleReviewDislike = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await Api.post(`stores/${clickedStoreId}/${reviewId}/dislike`);
        setReviewDislike(true);
    };

    return (
        <Col>
            <button
                onClick={handleReviewLike}
            >
                👍
            </button>
            <button
                onClick={handleReviewDislike}
            >
                👎
            </button>
        </Col>
    );
}

export default ReviewLike;