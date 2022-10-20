// 리뷰 수정 창
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styled from 'styled-components';

import Rating from "./Rating";

import * as Api from "../../utils/Api";

function StoreReviewEditForm({
    setIsEditing,
    reviewId,
    clickedStoreId,
    setReviews,
    currentUser,
}) {
    const [star, setStar] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await Api.put(`review/${reviewId}`, {
            star,
            description,
            photo,
        });

        const res = await Api.get(`stores/${clickedStoreId}/reviews`);
        const UpdateReview = res.data;
        setReviews(UpdateReview);
        setIsEditing(false);
    };

    const handleChangeScore = (score) => {
        setStar(score);
    };

    return (
        <>
        <EditformTitle>리뷰 수정하기</EditformTitle>
        <Form onSubmit={handleSubmit}>
            <Rating
                onChangeScore={handleChangeScore}
            />
            <Form.Group controlId="reviewEditDescription">
                <Form.Control
                    type="text"
                    placeholder="내용을 작성해주세요."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
                <button
                    type="submit"
                    size="sm"
                >
                    수정하기
                </button>
                <button
                    size="sm"
                    onClick={() => setIsEditing(false)}
                >
                    취소
                </button>
            </Form.Group>
        </Form>
        </>
    );
}

export default StoreReviewEditForm;

const EditformTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  color: black;
`;